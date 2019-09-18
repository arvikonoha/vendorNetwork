import React from "react";
import Services from "./Services";

function MapService({ location }) {
  return <Services category={location.state.category} />;
}

export default MapService;
