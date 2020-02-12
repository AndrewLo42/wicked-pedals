import React from 'react';
import CartSummaryItem from './cart-summary-item';
import RemoveModal from './remove-modal';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      itemToRemove: {}
    };
    this.setCatalogView = this.setCatalogView.bind(this);
    this.setCheckout = this.setCheckout.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(item) {

    this.setState({
      modalStatus: true,
      itemToRemove: item
    });
  }

  closeModal() {
    this.setState({ modalStatus: false });
  }

  setCatalogView() {
    this.props.setView('catalog', {});
  }

  setCheckout() {
    this.props.setView('checkout', {});
  }

  renderCart() {
    const duplicateProducts = {};
    const productsToShow = [];
    this.props.cartItems.map(product => {
      if (duplicateProducts[product.productId] !== undefined) {
        duplicateProducts[product.productId] += 1;
      } else {
        duplicateProducts[product.productId] = 1;
        productsToShow.push(product);
      }
    });

    if (!this.props.cartItems.length) {
      return (<h3 className="text-center border">Cart is Empty!</h3>);
    } else {
      const cartList = productsToShow.map(item =>
        <CartSummaryItem key={ item.productId} closeModal={this.closeModal} openModal={this.openModal} quantity={duplicateProducts[item.productId]}item={ item } deleteFromCart={ this.props.deleteFromCart } addToCart={ this.props.addToCart } />);
      return cartList;
    }
  }

  renderTotal() {
    const cartItems = this.props.cartItems;
    const sum = cartItems.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0);
    return (sum / 100).toFixed(2);
  }

  renderCheckoutButton() {
    if (this.props.cartItems.length) {
      return <button className="btn btn-warning mt-1 mb-1" onClick={this.setCheckout}>Checkout</button>;
    }
  }

  render() {
    return (
      <div className="container cart-container">
        <div className="m-2 catalog-return ">
          <i className="d-inline fas fa-chevron-circle-left" onClick={this.setCatalogView}></i>
          <div className="d-inline ml-1" onClick={this.setCatalogView}>Back to Catalog</div>
        </div>
        <h1 className="m-2 cart-title">My Cart</h1>
        <div className="item-container">
          {this.renderCart()}
        </div>
        <div className="row justify-content-between m-1">
          <div className="cart-total badge badge-dark mt-1 mb-1">
            <h4 className="pt-1">
          Total: ${this.renderTotal()}
            </h4>
          </div>
          {this.renderCheckoutButton()}
        </div>
        <RemoveModal modalStatus={this.state.modalStatus} item={this.state.itemToRemove} closeModal={this.closeModal} deleteFromCart={this.props.deleteFromCart} />
      </div>
    );
  }
}

export default CartSummary;
