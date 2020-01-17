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
    const shouldShow = this.state.visible;
    if (!shouldShow) {
      return (<></>);
    } else {
      return (
        <div>Added</div>
      );
    }
  }

}

export default CartNotification;
