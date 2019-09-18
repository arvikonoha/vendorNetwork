import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ title, description, source }) {
  return (
    <div className="col s12 m4">
      <div className="card medium hoverable">
        <div className="card-image">
          <img src={source} />
          <span className="card-title card-panel black-text">{title}</span>
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        <div className="card-action">
          <Link to={{ pathname: "/services", state: { category: title } }}>
            Press this to explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
