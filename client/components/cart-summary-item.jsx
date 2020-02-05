import React from 'react';

class cartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.addAnother = this.addAnother.bind(this);
  }

  addAnother() {
    this.props.addToCart({ productId: this.props.item.productId });
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
              <div className="d-flex items-number-container">
                <i className="fas fa-minus-circle my-auto mr-2" onClick={this.removeItem}></i>
                <div className="quantity-container p-2 my-auto d-flex">
                  <div className="my-auto">
                    Quantity:
                  </div>
                  <div className="my-auto ml-2 badge badge-pill badge-dark">
                    {this.props.quantity}
                  </div>
                </div>
                <i className="fas fa-plus-circle my-auto ml-2" onClick={this.addAnother}></i>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default cartSummaryItem;
