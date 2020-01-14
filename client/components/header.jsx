import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="p-3 row">
          <i className=" fas fa-dollar-sign text-white pt-2 pl-5">
            <div className="d-inline ml-1"> Wicked Sales </div>
          </i>
        </div>
      </div>

    );
  }
}

export default Header;
