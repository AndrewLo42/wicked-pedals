import React from 'react';
import AddModal from './add-modal';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      showModal: false
    };
    this.setCatalogView = this.setCatalogView.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
  }

  componentDidMount() {
    fetch(`./api/products/${this.props.view.params.productId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ product: data });
      });
  }

  addItemToCart() {
    this.toggleAddModal();
    this.props.addToCart({ productId: this.state.product.productId });
  }

  setCatalogView() {
    this.props.setView('catalog', {});
  }

  renderPrice() {
    const convertedPrice = (this.state.product.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  toggleAddModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      return (
        <div className="container container-fluid mt-3">
          <div className="border border-info pt-2 bg-white details-container">
            <div className="m-2 catalog-return ">
              <i className="d-inline fas fa-chevron-circle-left" onClick={this.setCatalogView}></i>
              <div className="d-inline ml-1" onClick={this.setCatalogView}>Back to Catalog</div>
            </div>
            <div className="row p-2">
              <img className="col-md-6  m-2 details-img" src={this.state.product.image} alt={this.state.product.name}></img>
              <div className="col-md-5 col-xs-12">
                <h1 className="text-md-left text-center">{this.state.product.name}</h1>
                <div className="text-md-left text-center text-muted">{this.renderPrice()}</div>
                <p className="mt-3 ">{this.state.product.shortDescription}</p>
                <div className=" text-md-left text-center">
                  <button className="btn btn-primary" onClick={this.addItemToCart}>Add to Cart</button>

                </div>
              </div>
            </div>
            <p className="p-2">{this.state.product.longDescription}</p>
          </div>
          <AddModal modalStatus={this.state.showModal} product={this.state.product} toggleAddModal={this.toggleAddModal} setView={this.props.setView}/>
        </div>
      );

    }
  }
}

export default ProductDetails;
