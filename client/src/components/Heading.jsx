import React from "react";

function Heading({title}) {
  return (
    <div className="container">
      <h2
        className="blue-grey-text text-darken-4"
        style={{
          borderBottom: "3px solid #263238",
          paddingBottom: "20px",
          marginBottom: "50px"
        }}
      >
      {title}
      </h2>
    </div>
  );
}

export default Heading;
