import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { showcaseStyle } from "../styles.js";
import { darkStyle } from "../styles.js";
import { showcaseHeading } from "../styles.js";
import { useStoreState } from "easy-peasy";

function Showcase() {
  let [isRegister, setRegister] = useState(true);
  let isAuth = useStoreState(state => state.auth.isAuth);

  return (
    <div style={showcaseStyle} class="row">
      <div className="col offset-s2 offset-l1 s8 l6 center-align blue-grey-text text-darken-4">
        <h2 style={showcaseHeading}> Welcome </h2>
        <p className="flow-text" style={{ marginBottom: "30px" }}>
          {" "}
          One place for your event management needs{" "}
        </p>
        <Link
          to="/"
          className="btn waves-effect waves-lightbtn-medium hoverable "
          style={darkStyle}
        >
          Let's Go
        </Link>
      </div>
      {!isAuth ? (
        isRegister ? (
          <Register setRegister={setRegister} />
        ) : (
          <Login setRegister={setRegister} />
        )
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default Showcase;
