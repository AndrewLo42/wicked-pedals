import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.setCatalogView = this.setCatalogView.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
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

  setCatalogView() {
    this.props.setView('catalog', {});
  }

  renderPrice() {
    const convertedPrice = (this.state.product.price / 100).toFixed(2);
    return `$ ${convertedPrice}`;
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      return (
        <div className="container container-fluid mt-3">
          <div className="border border-info pt-2 bg-white">
            <div className="m-2 catalog-return">
              <i className="d-inline fas fa-chevron-circle-left"></i>
              <div className="d-inline ml-1" onClick={this.setCatalogView}>Back to Catalog</div>
            </div>
            <div className="row p-2">
              <img className="col-md-6 col-sm-6 m-2 details-img" src={this.state.product.image} alt={this.state.product.name}></img>
              <div className="col-md-4 col-xs-12">
                <h1 className="">{this.state.product.name}</h1>
                <div className=" text-muted">{this.renderPrice()}</div>
                <p className="mt-3 ">{this.state.product.shortDescription}</p>
              </div>
            </div>
            <p className="p-2">{this.state.product.longDescription}</p>
          </div>
        </div>
      );

    }
  }
}

export default ProductDetails;
