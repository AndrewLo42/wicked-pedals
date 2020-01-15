import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setCartView = this.setCartView.bind(this);
  }

  setCartView() {
    this.props.setView('cart', {});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="p-3 row justify-content-between">
          <div className="text-white">
            <i className=" d-inline col fas fa-dollar-sign p-1"></i>
            <div className="d-inline">Wicked Sales </div>
          </div>
          <div className="cart-icon-container" >
            <div className="text-white mr-4" onClick={this.setCartView}> {this.props.cartItemCount} items
              <i className="ml-2 fas fa-shopping-cart" onClick={this.setCartView}></i>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default Header;
