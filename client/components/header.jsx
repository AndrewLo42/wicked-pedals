import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="p-3 bg-dark header">
        <i className="d-inline fas fa-dollar-sign text-white pt-2 pl-5">
          <div className="d-inline"> Wicked Sales </div>
        </i>
      </div>
    );
  }
}

export default Header;
