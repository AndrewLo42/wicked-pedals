import React from 'react';

function IntroModal(props) {
  return (
    <div className={`position-fixed h-100 w-100 overlay ${props.introModalStatus.displayNone ? 'd-none' : 'd-flex'} ${props.introModalStatus.show ? 'fade-in' : 'fade-out'}`}>
      <div className="m-auto p-3 intro-modal">
        <div className={`bg-white rounded p-3 modal-message ${props.introModalStatus.show ? 'slide-in' : 'slide-out'}`}>
          <h5 className="text-center">Welcome to Wicked Pedals</h5>
          <div className="d-flex">
          </div>
          <p className="text-center">Wicked Pedals is fullstack content management app utilizing React, Express, and PostgreSQL. By accepting and using this site, you are fully aware NOT to put personal information and that this website is for demonstration purposes only.</p>
          <div className="text-center w-20">
            <button className="btn btn-danger accept-button w-20"
              onClick={() => props.toggleIntroModal()}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroModal;
