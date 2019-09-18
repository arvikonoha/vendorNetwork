import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import UserReviews from "./UserReviews";
import queryString from "query-string";
import Pricing from "./Pricing";

function Profile(props) {
  let results = useStoreState(state => state.vendors.results);
  let reqObj = queryString.parse(props.location.search);
  let curProf = results.find(item => item.uuid === reqObj.id);
  let toggleAdded = useStoreActions(actions => actions.vendors.toggleAdded);

  return (
    <>
      <div className="row">
        <div className="col s12 m6">
          <div className="card large">
            <div className="card-image">
              <img src={curProf.source} />
              <span className="card-title">{curProf.title}</span>
            </div>
            <div className="card-content">
              <a className="btn-floating waves-effect waves-light right">
                <i
                  className="material-icons"
                  onClick={e => {
                    e.preventDefault();
                    toggleAdded(curProf.uuid);
                    e.target.classList.toggle("red");
                  }}
                >
                  {!curProf.added ? "add" : "close"}
                </i>
              </a>
              <h2 style={{ fontSize: "28px" }}>About us</h2>
              <p>{curProf.description}</p>
            </div>
          </div>
        </div>
        <div className="div col s12 m6" style={{ overflow: "auto" }}>
          <h2
            className="card-panel"
            style={{ display: "inline-block", fontSize: "30px" }}
          >
            User reviews
          </h2>
          <UserReviews />
          <div className="clearfix" />
        </div>
      </div>
      <Pricing />
    </>
  );
}

export default Profile;
