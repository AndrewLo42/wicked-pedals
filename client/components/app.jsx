import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ cart: data });
      });
  }

  addToCart(productId) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(data);
        this.setState({ cart: cartCopy });
      });
  }

  placeOrder(orderInfo) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfo)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setView('catalog', {});
        this.setState({ cart: [] });
      });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container-fluid">
          <ProductList setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <CartSummary cartItems={this.state.cart} setView={this.setView} />
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <CheckoutForm setView={this.setView} cartItems={this.state.cart} onSubmit={this.placeOrder}/>
      );
    } else {
      return (
        <ProductDetails setView={this.setView} view={this.state.view} addToCart={this.addToCart}/>
      );
    }
  }

  render() {
    return (
      <>
        <div className="container-fluid bg-dark">
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
        </div>
        {this.renderView()}
      </>
    );
  }
}
