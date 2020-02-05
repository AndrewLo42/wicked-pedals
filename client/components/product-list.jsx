import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ products: data });
      });
  }

  render() {
    const productList = this.state.products.map(product =>
      <ProductListItem key={product.productId} product={product} setView={this.props.setView} addToCart={this.props.addToCart}/>);
    return (
      <div className="row justify-content-center mt-5">
        {productList}
      </div>

    );
  }

}

export default ProductList;
