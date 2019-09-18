import React from "react";
import { Link } from "react-router-dom";

function RegTest() {
  return (
    <section id="logreg-pop">
      <Link to="/">
        <img src="../images/close.svg" alt="" width="30px" />
      </Link>
      <div className="form-container">
        <form action className="register">
          <h2>Register with us</h2>
          <label htmlFor="email">Enter your email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Enter your password</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="cpassword">Confirm your password</label>
          <input type="password" id="cpassword" />
          <button type="submit">Register</button>
          <p>
            If you already have an account
            <Link to="/form/login"> press this</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default RegTest;
