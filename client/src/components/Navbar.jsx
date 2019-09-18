import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function Navbar() {
  let setAuth = useStoreActions(action => action.auth.setAuth);
  let setToken = useStoreActions(action => action.auth.setToken);
  let setUser = useStoreActions(action => action.auth.setUser);
  let isAuth = useStoreState(state => state.auth.isAuth);
  let setProfile = useStoreActions(action => action.auth.setProfile);

  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    var instances = window.M.Sidenav.init(elems);
  });

  return (
    <>
      <nav className="blue-grey text-white darken-4">
        <div class="nav-wrapper container">
          <Link to="/" class="brand-logo">
            Logo
          </Link>
          <Link to="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </Link>
          <ul class="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={{ pathname: "/services", state: { category: "none" } }}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/Cart">Cart</Link>
            </li>
            {isAuth ? (
              <li>
                <a
                  onClick={e => {
                    e.preventDefault();
                    setAuth(false);
                    setToken("");
                    setUser({});
                    setProfile(null);
                    localStorage.removeItem("token");
                  }}
                >
                  {" "}
                  Logout{" "}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
      <ul class="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={{ pathname: "/services", state: { category: "none" } }}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/Cart">Cart</Link>
        </li>
        {isAuth ? (
          <li>
            <a
              onClick={e => {
                e.preventDefault();
                setAuth(false);
                setToken("");
                setUser({});
                setProfile(null);
                localStorage.removeItem("token");
              }}
            >
              Logout
            </a>
          </li>
        ) : null}
      </ul>
      {/* <header id="main-header">
        <div className="container">
          <h1>
            Kairos
            <img
              className="hamberger"
              src="./images/hamberger.svg"
              alt=""
              width="30px"
              height="30px"
            />
          </h1>
          <nav className="hide">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "/services", state: { category: "none" } }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/Cart">Cart</Link>
              </li>
              {isAuth ? (
                <li>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      setAuth(false);
                      setToken("");
                      setUser({});
                      setProfile(null);
                      localStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li>
                  <Link to="/form/register">Login | Register </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header> */}
    </>
  );
}

export default Navbar;
