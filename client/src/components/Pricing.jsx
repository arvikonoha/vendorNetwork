import React from "react";

function Pricing() {
  return (
    <div className="row">
      <h2
        className="card-panel container"
        style={{ padding: "10px", display: "inline-block", fontSize: "30px" }}
      >
        Pricing
      </h2>
      <div class="col s12 m4">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Photography only</span>
            <p>35,000</p>
          </div>
          <div class="card-action">
            <a href="#">Add to the cart</a>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Videography</span>
            <p>42,000</p>
          </div>
          <div class="card-action">
            <a href="#">Add to the cart</a>
          </div>
        </div>
      </div>
      <div class="col s12 m4">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Photography and Videography</span>
            <p>60,000</p>
          </div>
          <div class="card-action">
            <a href="#">Add to thr cart</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
