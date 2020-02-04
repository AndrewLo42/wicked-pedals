import React from 'react';

class CartNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openNotification() {
    this.setState({ visible: true }, () => {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 3000);
    });
  }

  render() {
    const shouldShow = this.props.appear;
    if (!shouldShow) {
      return (null);
    } else {
      return (
        <>
          {this.openNotification()}
          <div className="position-fixed h-100 w-100 d-flex overlay">
            <div className="m-auto p-3">
              <h5 className="text-center">Item Added To Cart</h5>
            </div>
          </div>
        </>
      );
    }
  }

}

export default CartNotification;
