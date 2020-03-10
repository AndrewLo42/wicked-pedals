import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.setProductView = this.setProductView.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  addItemToCart() {
    this.props.showPopUp();
    this.props.addToCart({ productId: this.props.product.productId });
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
      <div className="card item-card col-lg-3 col-md-5 col-sm-6 col-xs-12  m-2 shadow-sm" >
        <div onClick={this.setProductView}>
          <img className="card-img-top card-img pt-1" src={this.props.product.image} alt={this.props.product.name} onClick={this.setProductView}></img>
          <div className="card-body">
            <h2 className="card-title">{this.props.product.name}</h2>
            <div className="card-price text-muted">{this.renderPrice()}</div>
            <div>{this.props.product.brand}</div>
          </div>
          <div className="overlay">
          </div>
        </div>

        <div className="card-text ">
          <p className="mt-1" onClick={this.setProductView}>{this.props.product.shortDescription}</p>
          <div className="row justify-content-around">
            <button className="mt-2 btn btn-primary" onClick={this.setProductView}>Details</button>
            <button className="mt-2 btn btn-secondary add-btn" onClick={this.addItemToCart}>Quick Add</button>
          </div>
        </div>

      </div>
    );
  }
}

export default ProductListItem;
