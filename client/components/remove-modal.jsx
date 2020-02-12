import React from 'react';

class RemoveModal extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    this.props.deleteFromCart(this.props.item.cartItemId);
    this.props.closeModal();
  }

  render() {
    return (
      <div className={`position-fixed h-100 w-100 overlay ${!this.props.modalStatus ? 'd-none' : 'd-flex'} ${!this.props.modalStatus ? 'fade-in' : 'fade-out'}`}>
        <div className="m-auto p-3 remove-modal">
          <div className={`bg-white rounded p-3 modal-message ${!this.props.modalStatus ? 'fade-in' : 'fade-out'}`}>
            <h5 className="text-center">{`You're about to delete ${this.props.item.name} from your cart!`}</h5>
            <div className="d-flex">
            </div>
            <div className="text-center w-20">
              <button className="mr-1 btn btn-danger accept-button w-20 col-md-2 col-4"
                onClick={() => this.deleteItem()}>Confirm</button>
              <button className="btn btn-warning accept-button w-20 col-md-2 col-4"
                onClick={() => this.props.closeModal()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RemoveModal;
