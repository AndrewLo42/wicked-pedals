import React from 'react';

class cartSummaryItem extends React.Component {

  renderPrice() {
    const convertedPrice = (this.props.item.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  render() {
    return (
      <div className="item-container bg-white mb-2">
        <div className="border">
          <div className="row pl-5 pt-3 pb-5">
            <img className="cart-img" src={this.props.item.image} alt={this.props.item.name}></img>
            <div className="col">
              <div>{this.props.item.name}</div>
              <div>{this.renderPrice()}</div>
              <div>{this.props.item.shortDescription}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default cartSummaryItem;
