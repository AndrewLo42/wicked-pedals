import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setCartView = this.setCartView.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.setView('catalog', {});
  }

  setCartView() {
    this.props.setView('cart', {});
  }

  render() {
    return (
      <div className="p-3 bg-dark header">
        <div className="container-fluid">
          <div className="d-flex p-3 row justify-content-md-between justify-content-center">
            <div className="header-title text-white">
              <i className=" d-inline col fas fa-guitar p-1"></i>
              <div className="d-inline home-tag" onClick={this.goHome}>Wicked Pedals </div>
            </div>
            <div className="cart-icon-container text-center " >
              <button className="btn btn-primary" onClick={this.setCartView}>
                <i className="mr-1 fas fa-shopping-cart" ></i>
                <div className="badge badge-pill badge-dark text-white mr-0" > {this.props.cartItemCount}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
