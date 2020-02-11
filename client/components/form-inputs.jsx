import React from 'react';

class FormInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      month: '',
      year: '',
      ccv: '',
      shippingAddress: '',
      city: '',
      usState: '',
      zipcode: '',
      phoneNumber: '',
      phoneNumberDisplay: '',
      email: '',
      consent: false,
      formValidation: {
        name: true,
        creditCard: true,
        month: true,
        year: true,
        ccv: true,
        shippingAddress: true,
        secondAddressLine: true,
        city: true,
        usState: true,
        zipcode: true,
        phoneNumber: true,
        email: true,
        consent: true
      },
      validOrder: false,
      secondAddressLine: ''
    };
    this.setCatalogView = this.setCatalogView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSecondAddressLineChange = this.handleSecondAddressLineChange.bind(this);
  }

  setCatalogView() {
    this.props.setView('catalog', {});
  }

  renderTotal() {
    const cartItems = this.props.cartItems;
    const sum = cartItems.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0);
    return (sum / 100).toFixed(2);
  }

  handleChange() {
    const validForm = { ...this.state.formValidation };
    if (event.target.name === 'customer-name') {
      this.setState({ name: event.target.value });
      validForm.name = true;
    }
    if (event.target.name === 'customer-email') {
      this.setState({ email: event.target.value });
      validForm.email = true;
    }
    if (event.target.name === 'customer-phone-number') {
      if (/^[0-9]*$/.test(event.target.value)) {
        this.setState({
          phoneNumber: event.target.value,
          phoneNumberDisplay: event.target.value
        });
        validForm.phoneNumber = true;
      }
      const matched = this.state.phoneNumber.match(/^(1|)?(\d{3})(\d{3})(\d{4})/);
      if (matched) {
        const number = ['(', matched[2], ') ', matched[3], '-', matched[4]].join('');
        this.setState({ phoneNumberDisplay: number });
      }
      validForm.phoneNumber = true;
    }
    if (event.target.name === 'customer-card') {
      if (/^[0-9]*$/.test(event.target.value)) {
        validForm.creditCard = true;
        this.setState({ creditCard: event.target.value });
      }
    }
    if (event.target.name === 'customer-card-ccv') {
      if (/^[0-9]*$/.test(event.target.value)) {
        validForm.ccv = true;
        this.setState({ ccv: event.target.value });
      }
    }
    if (event.target.name === 'month') {
      this.setState({ month: event.target.value });
      validForm.month = true;

    }
    if (event.target.name === 'year') {
      this.setState({ year: event.target.value });
      validForm.year = true;

    }
    if (event.target.name === 'usState') {
      this.setState({ usState: event.target.value });
      validForm.usState = true;
    }
    if (event.target.name === 'customer-zipcode') {
      if (/^[0-9]*$/.test(event.target.value)) {
        validForm.zipcode = true;
        this.setState({ zipcode: event.target.value });
      }
    }
    if (event.target.name === 'consent') {
      this.setState({ consent: !this.state.consent });
      validForm.consent = true;
    }
    if (event.target.name === 'customer-address') {
      this.setState({ shippingAddress: event.target.value });
      validForm.shippingAddress = true;

    }
    if (event.target.name === 'customer-city') {
      this.setState({ city: event.target.value });
      validForm.city = true;
    }
    this.setState({ formValidation: validForm });
  }

  handleSecondAddressLineChange() {
    this.setState({ secondAddressLine: event.target.value });
  }

  validation() {
    const validForm = { ...this.state.formValidation };
    const nameRegex = new RegExp(/^[a-zA-Z ]{5,36}$/);
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (event.target.name === 'customer-name') {
      if (!nameRegex.test(this.state.name)) {
        validForm.name = false;
      }
    }
    if (event.target.name === 'customer-email') {
      if (!emailRegex.test(this.state.email)) {
        validForm.email = false;
      }
    }
    if (event.target.name === 'customer-phone-number') {
      if (this.state.phoneNumber.length < 10) {
        validForm.phoneNumber = false;
      }
    }
    if (event.target.name === 'customer-card') {
      if (this.state.creditCard.length < 16) {
        validForm.creditCard = false;
      }
    }
    if (event.target.name === 'customer-card-ccv') {
      if (this.state.ccv.length < 3) {
        validForm.ccv = false;
      }
    }
    if (event.target.name === 'month') {
      if (this.state.month.length < 2) {
        validForm.month = false;
      }
    }
    if (event.target.name === 'year') {
      if (this.state.year.length < 4) {
        validForm.year = false;
      }
    }
    if (event.target.name === 'usState') {
      if (this.state.usState.length < 2) {
        validForm.usState = false;
      }
    }
    if (event.target.name === 'customer-zipcode') {
      if (this.state.zipcode.length < 5) {
        validForm.zipcode = false;
      }
    }
    if (event.target.name === 'consent') {
      if (!this.state.consent) {
        validForm.consent = false;
      }
    }
    if (event.target.name === 'customer-address') {
      if (this.state.shippingAddress.length < 6) {
        validForm.shippingAddress = false;
      }
    }
    if (event.target.name === 'customer-city') {
      if (this.state.city.length < 3) {
        validForm.city = false;
      }
    }
    if (Object.values(validForm).indexOf(false) === -1 && (Object.values(this.state).indexOf('') === -1 || Object.values(this.state).indexOf('') === 15)) {
      this.setState({
        formValidation: validForm,
        validOrder: true
      });
    } else {
      this.setState({
        formValidation: validForm,
        validOrder: false
      });
    }
  }

  renderButton() {
    if (this.state.validOrder) {
      return (<button type="submit" className="btn btn-success">Submit Order</button>);
    } else {
      return (<div className="btn btn-secondary">Submit Order</div>);
    }
  }

  handleSubmit() {
    event.preventDefault();
    const validForm = { ...this.state.formValidation };
    const nameRegex = new RegExp(/^[a-zA-Z ]+$/);
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!nameRegex.test(this.state.name)) {
      validForm.name = false;
    }
    if (!emailRegex.test(this.state.email)) {
      validForm.email = false;
    }
    if (this.state.phoneNumber.length < 10) {
      validForm.phoneNumber = false;
    }
    if (this.state.creditCard.length < 16) {
      validForm.creditCard = false;
    }
    if (this.state.ccv.length < 3) {
      validForm.ccv = false;
    }
    if (this.state.month.length < 2) {
      validForm.month = false;
    }
    if (this.state.year.length < 4) {
      validForm.year = false;
    }
    if (this.state.usState.length < 2) {
      validForm.usState = false;
    }
    if (this.state.zipcode.length < 5) {
      validForm.zipcode = false;
    }
    if (!this.state.consent) {
      validForm.consent = false;
    }
    if (this.state.shippingAddress.length < 3) {
      validForm.shippingAddress = false;
    }
    if (this.state.city.length < 3) {
      validForm.city = false;
    }
    if (Object.values(validForm).indexOf(false) === -1) {
      const customerInfo = {
        name: this.state.name.trim(),
        email: this.state.email,
        phone: this.state.phoneNumber,
        creditCard: this.state.creditCard,
        expirationDate: `${this.state.month}/${this.state.year}`,
        ccv: this.state.ccv,
        shippingAddress: `${this.state.shippingAddress} \n ${this.state.secondAddressLine} \n ${this.state.city.trim()}, ${this.state.usState} ${this.state.zipcode}`
      };
      this.props.onSubmit(customerInfo);
    } else {
      this.setState({
        formValidation: validForm
      });
    }
  }

  render() {
    return (
      <div className="container border rounded mb-3" id="input-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group pt-1">
            <h5>Billing & Shipping Info</h5>
          </div>
          <label>Name</label>
          <div className="name-input form-group input-group">
            <input
              value={this.state.name}
              type="text"
              name="customer-name"
              id="customer-name"
              placeholder="Customer Name"
              onChange={this.handleChange}
              onBlur={this.validation}
              autoComplete="off"
              className={`form-rounded form-control ${this.state.formValidation.name ? '' : 'is-invalid'}`}>
            </input>
            <div className="invalid-feedback">
              <small>Not a valid name input.</small>
            </div>
          </div>
          <div className="form-row">
            <div className="email-input form-group col-md-6">
              <label htmlFor="name">Email</label>
              <input
                value={this.state.email}
                type="text"
                name="customer-email"
                id="customer-email"
                placeholder="Email"
                onChange={this.handleChange}
                onBlur={this.validation}
                autoComplete="off"
                className={`form-rounded form-control ${this.state.formValidation.email ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Missing or invalid email address.</small>
              </div>
            </div>
            <div className="phone-number-input form-group col-md-6">
              <label>Phone Number </label>
              <input
                value={this.state.phoneNumber}
                type="text"
                name="customer-phone-number"
                id="customer-phone-number"
                placeholder="Phone Number "
                onChange={() => this.handleChange()}
                onBlur={this.validation}
                autoComplete="off"
                maxLength="10"
                className={`form-rounded form-control ${this.state.formValidation.phoneNumber ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Invalid Phone Number (requires no spaces, no dashes)</small>
              </div>
            </div>
          </div>

          <label>Shipping Address</label>
          <div className="form-row">
            <div className="address-input form-group col-6">
              <input
                value={this.state.shippingAddress}
                type="text"
                name="customer-address"
                id="customer-address"
                placeholder="Address Line 1"
                onChange={this.handleChange}
                onBlur={this.validation}
                autoComplete="off"
                maxLength="42"
                className={`form-rounded form-control ${this.state.formValidation.shippingAddress ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Not a valid shipping address</small>
              </div>
            </div>
            <div className="second-address-input form-group col-6">
              <input
                value={this.state.secondAddressLine}
                type="text"
                name="customer-second-address"
                id="customer-second-address"
                placeholder="Address Line 2 "
                onChange={this.handleSecondAddressLineChange}
                onBlur={this.validation}
                autoComplete="off"
                className="form-rounded form-control">
              </input>
            </div>
          </div>
          <div className="form-row">
            <div className="card-input form-group col-md-6">
              <label>City</label>
              <input
                value={this.state.city}
                type="text"
                name="customer-city"
                id="customer-city"
                placeholder="City"
                onChange={this.handleChange}
                onBlur={this.validation}
                autoComplete="off"
                className={`form-rounded form-control ${this.state.formValidation.city ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Invalid City name</small>
              </div>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputState">State</label>
              <select className={`form-control ${this.state.formValidation.usState ? '' : 'is-invalid'}`}
                name="usState"
                onChange={this.handleChange}
                onBlur={this.validation}>
                <option defaultValue hidden></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <div className="invalid-feedback">
                <small>Please choose a State</small>
              </div>
            </div>
            <div className="zip-input form-group col-md-3">
              <label>Zip</label>
              <input
                value={this.state.zipcode}
                type="text"
                name="customer-zipcode"
                id="customer-zipcode"
                placeholder="Zip Code"
                onChange={this.handleChange}
                onBlur={this.validation}
                autoComplete="off"
                minLength="5"
                maxLength="5"
                className={`form-control ${this.state.formValidation.zipcode ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Enter a 5 digit Zip Code</small>
              </div>
            </div>
          </div>
          <div className="form-group">
            <h5>Payment Info</h5>
          </div>
          <div className="form-row">
            <div className="card-input form-group col-md-6">
              <label>Credit Card</label>
              <input
                value={this.state.creditCard}
                type="text"
                name="customer-card"
                id="customer-card"
                placeholder="Credit Card Number"
                onChange={this.handleChange}
                onBlur={this.validation}
                autoComplete="off"
                minLength="16"
                maxLength="16"
                className={`form-control ${this.state.formValidation.creditCard ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Invalid Credit Card Number</small>
              </div>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputState">Month</label>
              <select className={`form-control ${this.state.formValidation.month ? '' : 'is-invalid'}`}
                name="month"
                onChange={this.handleChange}
                onBlur={this.validation}>
                <option defaultValue hidden></option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <div className="invalid-feedback">
                <small>Select a month.</small>
              </div>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputState">Year</label>
              <select className={`form-control ${this.state.formValidation.year ? '' : 'is-invalid'}`}
                name="year"
                onChange={this.handleChange}
                onBlur={this.validation}>
                <option defaultValue hidden></option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
              </select>
              <div className="invalid-feedback">
                <small>Select a year.</small>
              </div>
            </div>

            <div className="ccv-input form-group col-md-2">
              <label>CCV</label>
              <input
                value={this.state.ccv}
                type="text"
                name="customer-card-ccv"
                id="customer-card-ccv"
                placeholder="3-4 Digit Validation"
                onChange={this.handleChange}
                onBlur={this.validation}
                autoComplete="off"
                minLength="3"
                maxLength="4"
                className={`form-control ${this.state.formValidation.ccv ? '' : 'is-invalid'}`}>
              </input>
              <div className="invalid-feedback">
                <small>Invalid CCV <br/>(check the back of your credit card)</small>
              </div>
            </div>
          </div>

          <div className="d-flex consent-input form-group input-group pl-3">
            <input
              name="consent"
              type="checkbox"
              className={`form-check-input ${this.state.formValidation.consent ? '' : 'is-invalid'}`}
              onChange={this.handleChange}
              onBlur={this.validation}/>
            <label className="form-check-label" htmlFor="consent" >
              I understand that this website is for demonstration purposes only,
              and that none of the inputted information should be real information.
              Nothing &quot;purchased&quot; is actually being shipped.
              My checking this box, I give my consent.
            </label>
            <div className="invalid-feedback">
              <small>Please accept the terms</small>
            </div>
          </div>
          <div className="row d-flex justify-content-between pl-3 pb-2">
            <div className="order-btn-container">
              {this.renderButton()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormInputs;
