import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="p-3 row">
          <i className=" col fas fa-dollar-sign text-white pt-2 pl-5">
            <div className="d-inline ml-1"> Wicked Sales </div>
          </i>
          <div className="text-white float-right mr-5"> {this.props.cartItemCount} items
            <i className="ml-2 fas fa-shopping-cart"></i>
          </div>

        </div>
      </div>

    );
  }
}

export default Header;
