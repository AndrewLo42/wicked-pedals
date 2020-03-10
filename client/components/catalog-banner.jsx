import React from 'react';

function CatalogBanner() {
  return (
    <div id="carousel-captions" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carousel-captions" data-slide-to="0" className="active"></li>
        <li data-target="#carousel-captions" data-slide-to="1"></li>
        <li data-target="#carousel-captions" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner position-relative">
        <div className="carousel-item active" data-interval="5000">
          <div className="h-100 w-100 carousel-slide slide-1" />
          <div className="carousel-caption d-md-block center-caption">
            <h2>Top Notch Guitar Pedals</h2>
            <p>We have the coolest pedals to give you a WICKED tone</p>
          </div>
        </div>
        <div className="carousel-item" data-interval="5000">
          <div className="h-100 w-100 carousel-slide slide-2" >
            {/* <img src="./images/pedalBanner1.jpg" className="d-block w-100 carousel-image" /> */}
            <div className="carousel-caption d-md-block center-caption">
              <h2>We have a sweet curated list of pedals</h2>
              <p>Our store has the best hand picked, carefully selected pedals</p>
            </div>
          </div>
        </div>
        <div className="carousel-item" data-interval="5000">
          <div className="h-100 w-100 carousel-slide slide-3" />
          <div className="carousel-caption d-md-block center-caption">
            <h2>We will help you find your tone</h2>
            <p>In a world with so many pedal choices, we narrowed it down for you</p>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev carousel-controls" href="#carousel-captions" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next carousel-controls" href="#carousel-captions" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default CatalogBanner;
