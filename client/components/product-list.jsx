import React from 'react';
import ProductListItem from './product-list-item';
import CartNotification from './cart-notification';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showNotification: false

    };
    this.showPopUp = this.showPopUp.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  showPopUp() {
    this.setState({ showNotification: true });
  }

  hidePopUp() {
    this.setState({ showNotification: false });
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
      <ProductListItem key={product.productId} product={product} setView={this.props.setView} addToCart={this.props.addToCart} showPopUp={this.showPopUp} hidePopUp={this.hidePopUp}/>);
    return (
      <div className="row justify-content-center mt-5">
        {productList}
        <CartNotification modalStatus={this.state.showNotification} hidePopUp={this.hidePopUp} setView={this.props.setView}/>
      </div>

    );
  }

}

export default ProductList;
