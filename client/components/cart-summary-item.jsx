import React from 'react';

class cartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  renderPrice() {
    const convertedPrice = (this.props.item.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  removeItem() {
    this.props.deleteFromCart(this.props.item.cartItemId);
  }

  render() {
    return (
      <div className="item-container bg-white mb-2 cart-item-container">
        <div className="">
          <div className="row pl-5 pt-3 pb-5">
            <img className="cart-img" src={this.props.item.image} alt={this.props.item.name}></img>
            <div className="col">
              <h5>{this.props.item.name}</h5>
              <div className="text-muted">{this.renderPrice()}</div>
              <div className="pr-1">{this.props.item.shortDescription}</div>
              <button className="btn btn-danger mt-1 remove-btn" onClick={this.removeItem}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default cartSummaryItem;
