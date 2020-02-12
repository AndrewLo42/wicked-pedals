import React from 'react';
import FormInputs from './form-inputs.jsx';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      secondAddressLine: '',
      usState: '',
      zipcode: '',
      phoneNumber: '',
      email: '',
      consent: false,
      formValidation: {
        name: true,
        creditCard: true,
        shippingAddress: true,
        secondAddressLine: true,
        usState: true,
        zipcode: true,
        phoneNumber: true,
        email: true,
        consent: true
      }

    };
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
            <h4 className="text-secondary m-2">
            Order Total: ${this.renderTotal()}
            </h4>
          </div>
          <div className="m-2 catalog-return ">
            <i className="d-inline fas fa-chevron-circle-left" onClick={this.setCatalogView}></i>
            <div className="d-inline ml-1" onClick={this.setCatalogView}>Continue Shopping</div>
          </div>
        </div>

        <div className="">
          <FormInputs onSubmit={this.props.onSubmit}/>
        </div>
      </div>
    );
  }

}

export default CheckoutForm;
