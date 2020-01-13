import React from 'react';

class ProductListItem extends React.Component {

  renderPrice() {
    const convertedPrice = (this.props.product.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  render() {
    return (
      <div className="card col-lg-3 col-md-5 col-sm-6 col-xs-12  m-2 ">
        <img className="card-img-top card-img" src={this.props.product.image} alt={this.props.product.name}></img>
        <div className="card-body">
          <h1 className="card-title">{this.props.product.name}</h1>
          <div className="card-price text-muted">{this.renderPrice()}</div>
          <p className="mt-3 card-text">{this.props.product.shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
