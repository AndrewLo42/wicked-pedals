import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="p-3 mt-4 bg-dark footer">
        <div className="footer-container container-fluid">
          <div className="d-flex row justify-content-center">
            <a
              className="footer-link row"
              href="https://andrewclo.com"
              target="_blank"
              rel="noopener noreferrer">
              <img className=" footer-logo" src="./images/Andrew-Lo-go.png"></img>
              <div className="pt-2 footer-creds"> Andrew Lo</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
