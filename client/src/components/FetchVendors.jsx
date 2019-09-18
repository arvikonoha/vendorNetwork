import React from "react";
import { useStoreState } from "easy-peasy";
import ProfileTest from "./ProfileTest";

function FetchVendors({ location }) {
  let servers = useStoreState(state => state.vendors.servers);
  let serv = servers.find(item => item._id === location.state.id);
  return <ProfileTest server={serv} />;
}

export default FetchVendors;
