import React, { useEffect } from "react";
import { homeStyle } from "./styles.js";
import RegTest from "./components/RegTest";
import LogTest from "./components/LogTest";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./models/model.js";
import ProfileTest from "./components/ProfileTest";
import ProfileCreate from "./components/ProfileCreate";
import FetchVendors from "./components/FetchVendors";
import MapServices from "./components/MapServices";
import FormHandler from "./components/FormHandler";

function App() {
  const store = createStore(model);
  useEffect(() => {
    store.getActions().auth.getUser();
  });

  return (
    <StoreProvider store={store}>
      <div className=" blue-grey lighten-4">
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/Cart" component={Cart} />
          <Route path="/Profile/myProfile" component={ProfileCreate} />
          <Route path="/Profile/vendorProfile" component={ProfileTest} />
          <Route path="/Profile/vendor" component={FetchVendors} />
          <Route path="/services" component={MapServices} />
          {/* <Route path="/form/register" component={RegTest} />
          <Route path="/form/login" component={LogTest} /> */}
        </Router>
      </div>
    </StoreProvider>
  );
}

export default App;
