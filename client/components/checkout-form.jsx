import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.setCatalogView = this.setCatalogView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setCatalogView() {
    this.props.setView('catalog', {});
  }

  renderTotal() {
    const cartItems = this.props.cartItems;
    const sum = cartItems.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0);
    return (sum / 100).toFixed(2);
  }

  handleNameChange() {
    this.setState({ name: event.target.value });
  }

  handleAddressChange() {
    this.setState({ shippingAddress: event.target.value });
  }

  handleCardChange() {
    if (isNaN(parseInt(event.target.value))) {
      this.setState({ creditCard: '' });
    } else {
      this.setState({ creditCard: parseInt(event.target.value) });
    }
  }

  handleSubmit() {
    event.preventDefault();
    const customerInfo = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.onSubmit(customerInfo);
  }

  render() {
    return (
      <div className="form-container mt-2">
        <div className="container">
          <h1 className="text-center">Cart Checkout</h1>
          <div>
            <h4 className="text-warning m-2">
            Order Total: ${this.renderTotal()}
            </h4>
          </div>
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h5>Name</h5>
            <div className="name-input form-group input-group">
              <input
                required
                value={this.state.name}
                type="text"
                name="customer-name"
                id="customer-name"
                placeholder="Customer Name"
                onChange={this.handleNameChange}
                autoComplete="off"
                className="form-rounded form-control">
              </input>
            </div>
            <h5>Credit Card</h5>
            <div className="card-input form-group input-group">
              <input
                required
                value={this.state.creditCard}
                type="text"
                name="customer-card"
                id="customer-card"
                placeholder="Credit Card Info"
                onChange={this.handleCardChange}
                autoComplete="off"
                className="form-rounded form-control">
              </input>
            </div>
            <h5>Shipping Address</h5>
            <div className="address-input form-group input-group">
              <textarea
                required
                value={this.state.shippingAddress}
                type="text"
                name="customer-address"
                id="customer-address"
                placeholder="Shipping Address"
                onChange={this.handleAddressChange}
                autoComplete="off"
                className="form-rounded form-control"
                rows="4">
              </textarea>
            </div>
            <div className="row justify-content-between">
              <div className="m-2 catalog-return ">
                <i className="d-inline fas fa-chevron-circle-left" onClick={this.setCatalogView}></i>
                <div className="d-inline ml-1" onClick={this.setCatalogView}>Continue Shopping</div>
              </div>
              <div className="order-btn-container">
                <button type="submit" className="btn btn-success">Submit Order</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default CheckoutForm;
