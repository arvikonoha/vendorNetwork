import React from "react";
import ServiceCard from "./ServiceCard";
import { useStoreState } from "easy-peasy";

function ServiceCards() {
  let services = useStoreState(state => state.general.services);

  return (
    <>
      {services.map(service => (
        <ServiceCard
          title={service.title}
          description={service.description}
          source={service.source}
          key={service.uuid}
        />
      ))}
    </>
  );
}

export default ServiceCards;
