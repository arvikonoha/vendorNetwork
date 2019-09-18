import React from "react";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";

function Dashboard() {
  let profile = useStoreState(state => state.auth.profile);

  return (
    <>
      <br />
      <br />
      <br />
      <div
        className="row col offset-m1 m10 l3 card-panel center-align"
        style={{ padding: "10px 30px", borderRadius: "10px" }}
      >
        {profile !== null ? (
          <>
            <p
              style={{
                fontSize: "23px",
                paddingBottom: "10px",
                borderBottom: "2px solid #333"
              }}
            >
              Check your profile
            </p>
            <div className="col s6 center-align">
              <p>Profile visits this month</p>
              <p style={{ fontSize: "50px", marginTop: "-25px" }}>32</p>
            </div>
            <div className="col s6 center-align">
              <p>Profile visits this year</p>
              <p style={{ fontSize: "50px", marginTop: "-25px" }}>60</p>
            </div>
            <p style={{ marginTop: "-15px" }}>
              Write detailed description and enter correct information to
              improve your reach
            </p>
            <br />
          </>
        ) : (
          <p>
            Write detailed description and enter correct information to improve
            your reach <br />
          </p>
        )}
        {profile === null ? (
          <Link
            to="/Profile/myProfile"
            class="btn waves-effect waves-light"
            type="submit"
          >
            Create your profile
            <i class="material-icons right">send</i>
          </Link>
        ) : (
          <>
            <Link
              to="/Profile/vendorProfile"
              class="btn waves-effect waves-light"
              type="submit"
            >
              View your profile
              <i class="material-icons right">send</i>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
