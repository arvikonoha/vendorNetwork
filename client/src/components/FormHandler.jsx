import React from "react";
import { Route } from "react-router-dom";
import RegTest from "./RegTest";
import LogTest from "./LogTest";

function FormHandler(props) {
  return (
    <section id="logreg-pop" className="gone">
      <img src="./images/close.svg" alt="" width="30px" />
      <div className="form-container">
        <Route path="/login" component={LogTest} />
        <Route path="/register" component={RegTest} />
      </div>
    </section>
  );
}

export default FormHandler;
