import React from 'react';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.setCatalogView = this.setCatalogView.bind(this);
    this.setCartView = this.setCartView.bind(this);
  }

  setCatalogView() {
    this.props.toggleAddModal();
    this.props.setView('catalog', {});
  }

  setCartView() {
    this.props.setView('cart', {});
  }

  render() {
    return (
      <div className={`position-fixed h-100 w-100 overlay ${!this.props.modalStatus ? 'd-none' : 'd-flex'} ${!this.props.modalStatus ? 'fade-in' : 'fade-out'}`}>
        <div className="m-auto p-3 add-modal">
          <div className={`bg-white rounded p-3 modal-message ${!this.props.modalStatus ? 'fade-in' : 'fade-out'}`}>
            <div className="">
              <div className="text-center exit-modal" onClick={() => this.props.toggleAddModal()}>x</div>
            </div>
            <h5 className="text-center">{`You added ${this.props.product.name} to your cart!`}</h5>
            <div className="d-flex">
            </div>
            <p className="text-center"></p>
            <div className="text-center w-20">
              <button className="mr-1 btn btn-primary accept-button w-20 col-md-5 col-12"
                onClick={() => this.setCatalogView()}>Continue Shopping</button>
              <button className="btn btn-warning accept-button w-20 col-md-5 col-12"
                onClick={() => this.setCartView()}>Go to Cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddModal;
