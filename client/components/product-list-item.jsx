import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.setProductView = this.setProductView.bind(this);
  }

  setProductView() {
    const paramToView = { productId: this.props.product.productId };
    this.props.setView('details', paramToView);
  }

  renderPrice() {
    const convertedPrice = (this.props.product.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  render() {
    return (
      <div className="card col-lg-3 col-md-5 col-sm-6 col-xs-12  m-2 shadow-sm" onClick={this.setProductView}>
        <img className="card-img-top card-img" src={this.props.product.image} alt={this.props.product.name}></img>
        <div className="card-body">
          <h2 className="card-title">{this.props.product.name}</h2>
          <div className="card-price text-muted">{this.renderPrice()}</div>
          <p className="mt-3 card-text">{this.props.product.shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
