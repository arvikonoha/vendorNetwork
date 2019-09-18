import React from "react";
import { titleStyle } from "../styles.js";

function UserReview(props) {
  return (
    <li className="collection-item avatar">
      <img src={props.source} alt="" className="circle" />
      <span className="title" style={titleStyle}>
        {" "}
        {props.title}{" "}
      </span>{" "}
      <br />
      <sub>By {props.author} </sub>
      <br />
      <br />
      <p>{props.review}</p>
      <span
        class="secondary-content card-panel green accent-3 white-text"
        style={{ fontSize: "15px", padding: "5px", borderRadius: "5px" }}
      >
        {" "}
        4.5
        <i class="material-icons" style={{ fontSize: "12px" }}>
          {" "}
          grade{" "}
        </i>
      </span>
    </li>
  );
}

export default UserReview;
