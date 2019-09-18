import React from "react";
import { Link } from "react-router-dom";

function SearchResult({
  source,
  title,
  category,
  id,
  location,
  subcategories
}) {
  return (
    <div className="col s12 m6 l4">
      <div className="card large">
        <div className="card-image">
          <img src={source} />
          <span className="card-title">{title}</span>
        </div>
        <div className="card-content">
          <p style={{ fontSize: "30px" }}>{[...category].join(",")}</p>
          <sub>{location}</sub>
          {subcategories.map(subcat => (
            <p
              style={{
                borderTop: "2px dashed darkgray",
                marginTop: "10px",
                paddingTop: "10px",
                fontSize: "17px",
                color: "brown"
              }}
              key={subcat._id}
            >
              {subcat.subcategory} -&#8377; {subcat.price}
            </p>
          ))}
        </div>
        <div className="card-action">
          <Link to={{ pathname: "/Profile/vendor", state: { id } }}>
            Go to profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
