require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId", "name", "price", "image", "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = req.params.productId;
  if (!parseInt(productId, 10)) {
    return next(new ClientError(`${productId} must be a positive integer`, 400));
  }
  const sql = `
    select *
      from "products"
      where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        return next(new ClientError(`Cannot find product with Id ${productId}`, 404));
      } else {
        res.json(product);
      }
    });
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
       where "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (productId === undefined) {
    return next(new ClientError('productId must be a positive integer'), 400);
  }
  const sql = `
    select "price"
      from "products"
      where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(price => {
      const productPrice = price.rows[0];
      if (!productPrice) {
        Promise.reject((new ClientError(`Cannot find product price with Id ${productId}`, 400)));
      }
      if (!req.session.cartId) {
        const sql = `
            insert into "carts" ("cartId", "createdAt")
              values (default, default)
              returning "cartId"
        `;
        return db.query(sql)
          .then(cartId => {
            return ({ cartId: cartId.rows[0].cartId, price: productPrice.price });
          });
      } else {
        return ({ cartId: req.session.cartId, price: productPrice.price });
      }
    })
    .then(cartBundle => {
      req.session.cartId = cartBundle.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const params = [cartBundle.cartId, productId, cartBundle.price];
      return db.query(sql, params);
    })
    .then(cartBundleId => {
      const cartItemId = cartBundleId.rows[0].cartItemId;
      const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
       where "c"."cartItemId" = $1
      `;
      const params = [cartItemId];
      return db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
