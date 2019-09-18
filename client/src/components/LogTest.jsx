import React from "react";
import { Link } from "react-router-dom";

function LogTest() {
  return (
    <section id="logreg-pop">
      <Link to="/">
        <img src="../images/close.svg" alt="" width="30px" />
      </Link>
      <div className="form-container">
        <form action className="login">
          <h2>Log in to your account</h2>
          <label htmlFor="email">Enter your email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Enter your password</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
          <p>
            Dont have an account
            <Link to="/form/register"> press this</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LogTest;
