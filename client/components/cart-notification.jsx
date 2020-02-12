import React from 'react';

class CartNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openNotification() {
    setTimeout(() => {
      this.props.hidePopUp();
    }, 2000);
  }

  setCartView() {
    this.props.setView('cart', {});
  }

  render() {
    if (this.props.modalStatus) this.openNotification();
    return (
      <div className={`position-fixed h-100 w-100 overlay ${!this.props.modalStatus ? 'd-none' : 'd-flex'} ${!this.props.modalStatus ? 'fade-in' : 'fade-out'}`}>
        <div className="m-auto p-3 add-modal">
          <div className={`bg-white rounded p-3 modal-message ${!this.props.modalStatus ? 'fade-in' : 'fade-out'}`}>
            <div className="">
            </div>
            <div className="d-flex">
            </div>
            <p className="text-center">Added To Cart!</p>
            <div className="text-center w-20">
              <button className="mr-1 btn btn-primary accept-button w-20 col-md-5 col-4"
                onClick={() => this.props.hidePopUp()}>Continue Shopping</button>
              <button className="btn btn-warning accept-button w-20 col-md-5 col-4"
                onClick={() => this.setCartView()}>Go to Cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default CartNotification;
