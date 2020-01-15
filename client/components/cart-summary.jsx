import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.setCatalogView = this.setCatalogView.bind(this);
  }

  setCatalogView() {
    this.props.setView('catalog', {});
  }

  renderCart() {
    if (!this.props.cartItems.length) {
      return (<h3 className="text-center border">Cart is Empty!</h3>);
    } else {
      const cartList = this.props.cartItems.map(item =>
        <CartSummaryItem key={item.cartItemId} item={item} />);
      return cartList;
    }
  }

  renderTotal() {
    const cartItems = this.props.cartItems;
    const sum = cartItems.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0);
    return (sum / 100).toFixed(2);
  }

  render() {
    return (
      <div className="container cart-container">
        <div className="m-2 catalog-return ">
          <i className="d-inline fas fa-chevron-circle-left" onClick={this.setCatalogView}></i>
          <div className="d-inline ml-1" onClick={this.setCatalogView}>Back to Catalog</div>
        </div>
        <h1 className='m-2'>My Cart</h1>
        <div className="item-container">
          {this.renderCart()}
        </div>
        <div className="cart-total badge badge-dark mt-1 mb-1">
          <h4 className="">
          Total: ${this.renderTotal()}
          </h4>
        </div>
      </div>
    );
  }
}

export default CartSummary;
