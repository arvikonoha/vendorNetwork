import React from 'react'
import Showcase from "./Showcase";
import Heading from "./Heading";
import ServiceCards from "./ServiceCards";
import UserReviews from "./UserReviews";

function Home() {
  return (
    <div>
      <div className="row">
        <Showcase />
      </div>
      <div className="row" style={{ minHeight: "100vh" }}>
        <Heading title={"Our Services"} />
        <ServiceCards />
      </div>
      <div className="row">
        <Heading title={"Customer reviews"} />
        <UserReviews />
      </div>
    </div>
  );
}

export default Home;
