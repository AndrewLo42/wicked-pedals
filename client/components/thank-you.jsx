import React from 'react';

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <div className={'position-fixed h-100 w-100 overlay d-flex fade-in'}>
        <div className="m-auto p-3 intro-modal">
          <div className={'bg-white rounded p-3 modal-message fade-in'}>
            <h5 className="text-center pt-2">Thanks for your purchase!</h5>
            <div className="d-flex">
            </div>
            <p className="text-center">We appreciate your support! Your items will be shipped shortly!</p>
            <p className="text-center">Rock on!</p>
            <div className="text-center w-20">
              <button className="btn btn-success accept-button w-20"
                onClick={() => this.goHome()}>Home Page</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThankYou;
