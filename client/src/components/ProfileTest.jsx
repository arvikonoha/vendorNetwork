import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

function ProfileTest({ server }) {
  let sprofile = useStoreState(state => state.auth.profile);
  let profile;
  if (server !== undefined) profile = server;
  else profile = sprofile;
  let user = useStoreState(state => state.auth.user);
  let setProfile = useStoreActions(action => action.auth.setProfile);
  let addToCart = useStoreActions(action => action.vendors.addToCart);

  function verifyForProfileUser() {
    if (profile.user === user._id) {
      return (
        <div
          className="col s12 card-panel center-align"
          style={{
            marginTop: "-10px"
          }}
        >
          <p>
            {" "}
            To edit your profile
            <Link
              to="/Profile/myProfile"
              className="btn waves-effect waves-light btn-small"
            >
              Press this
            </Link>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="row">
        {verifyForProfileUser()}
        <br />
        <div className="col offset-m1 m11">
          <div
            className="profile-pic row col s12 m8"
            style={{
              background: `url(${
                profile.picsource
              }) center center/cover no-repeat`,
              height: "300px",
              borderRadius: "10px"
            }}
          >
            <h2
              className="card-panel col offset-m10 m5 s10 center-align"
              style={{
                display: "inline-block",
                borderRadius: "10px",
                padding: "15px",
                fontWeight: "bold",
                fontSize: "30px"
              }}
            >
              {profile.title}
            </h2>
          </div>
          <div
            className="col offset-m1 s12 m10 card-panel"
            style={{
              marginTop: "-30px",
              minHeight: "450px",
              borderRadius: "10px"
            }}
          >
            <span
              class="secondary-content card-panel green accent-3 white-text"
              style={{
                fontSize: "30px",
                padding: "10px",
                borderRadius: "10px",
                margin: "10px"
              }}
            >
              4.5
              <i
                class="material-icons"
                style={{
                  fontSize: "25px"
                }}
              >
                {" "}
                grade{" "}
              </i>
            </span>
            <div
              className="col offset-s1 s10 m6"
              style={{
                padding: "15px"
              }}
            >
              <h3
                style={{
                  paddingBottom: "10px",
                  borderBottom: "2px solid #333",
                  fontSize: "25px"
                }}
              >
                {" "}
                About Us{" "}
              </h3>
              <p
                style={{
                  padding: "10px"
                }}
              >
                {profile.description}
              </p>
              <br />
              <h3
                style={{
                  paddingBottom: "10px",
                  borderBottom: "2px solid #333",
                  fontSize: "25px"
                }}
              >
                {" "}
                Categories of service{" "}
              </h3>
              <ul class="collection">
                {profile.category.map(item => (
                  <li class="collection-item">{item}</li>
                ))}
              </ul>
            </div>
            <div
              className="col s12 m4"
              style={{ marginTop: "40px", paddingLeft: "50px" }}
            >
              <p style={{ fontWeight: "bold" }}>Address</p>
              <address>{profile.address}</address>
              <p style={{ fontWeight: "bold" }}>Location</p>
              <p>{profile.location}</p>
              <p style={{ fontWeight: "bold" }}>Email</p>
              <p>{profile.email}</p>
              <p style={{ fontWeight: "bold" }}>Phone</p>
              <p>{profile.telephone}</p>
            </div>
            <div className="col s12" style={{ marginTop: "20px" }}>
              <ul class="collection with-header">
                <li class="collection-header">
                  <h3 style={{ fontSize: "25px" }}>Services provided</h3>
                </li>
                {profile.subcategories.map(item => (
                  <li key={item._id} class="collection-item avatar">
                    <i class="material-icons circle red">forward</i>
                    <h3
                      class="title"
                      style={{ margin: "5px 0", fontWeight: "bold" }}
                    >
                      {item.subcategory}
                    </h3>
                    <p style={{ marginBottom: "10px" }}>
                      Price : &#8377;{item.price}
                    </p>
                    {profile.user !== user._id && !item.added ? (
                      <button
                        onClick={e => {
                          addToCart({ profile, id: item._id });
                        }}
                        className="btn waves-effect right halfway blue-grey darken-4 btn-small waves-light"
                      >
                        <i className="material-icons">local_grocery_store</i>
                      </button>
                    ) : profile.user !== user._id ? (
                      <button className="btn waves-effect right halfway blue-grey darken-4 btn-small waves-light">
                        <i className="material-icons">close</i>
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card-panel"
        style={{ padding: "20px", borderRadius: "10px" }}
      >
        <h3
          style={{
            paddingBottom: "10px",
            borderBottom: "2px solid #333",
            fontSize: "25px"
          }}
        >
          Gallery
        </h3>
        <div className="row" style={{ margin: "auto", width: "90%" }}>
          {profile.gallery.map(pic => (
            <div className="gallery-items col s12 m4 l3">
              <img
                src={pic.url}
                alt=""
                srcset=""
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              />
            </div>
          ))}
          {profile.user === user._id ? (
            <div
              className="gallery-items center-align col s12 m4 l3 grey lighten-3"
              style={{
                height: "300px",
                paddingTop: "80px",
                borderRadius: "10px"
              }}
            >
              <i
                className="material-icons small white-text  blue-grey darken-4"
                style={{ borderRadius: "5px", display: "inline-block" }}
              >
                add
              </i>
              <br />
              <form
                onSubmit={e => {
                  e.preventDefault();
                  let file = new FormData(document.forms[0]);
                  axios
                    .post(`/profile/gallery/${profile._id}`, file)
                    .then(res => console.log(res.data))
                    .catch(error => console.error(error.response.data));
                }}
              >
                <input
                  type="file"
                  name="dick"
                  id="gallery"
                  style={{
                    position: "relative",
                    opacity: "0",
                    top: "-30px",
                    zIndex: "2000",
                    width: "30px",
                    padding: "10px",
                    cursor: "pointer"
                  }}
                />
                <p className="flow-text" style={{ margin: "-30px" }}>
                  Add to gallery
                </p>
                <br />
                <br />
                <button type="submit">Yeet</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      <div className="card-panel container" style={{ margin: "auto" }}>
        <h3
          style={{
            paddingBottom: "10px",
            borderBottom: "2px solid #333",
            fontSize: "25px"
          }}
        >
          Vendor Schedule
        </h3>
        <ul class="collection">
          {profile.user === user._id ? (
            <li class="collection-item row">
              <span style={{ fontSize: "30px" }}>Enter an event</span>
              <br />
              <form
                id="myForm"
                onSubmit={e => {
                  e.preventDefault();
                  let from = document.getElementById("from").value;
                  let to = document.getElementById("to").value;
                  let description = document.getElementById("description")
                    .value;
                  let formBody = { from, to, description };
                  console.log(formBody);
                  axios
                    .post(`/profile/event/${profile._id}`, formBody)
                    .then(res => {
                      if (res.data) setProfile(res.data);
                      console.log(res.data);
                      document.forms[1].reset();
                    })
                    .catch(error => console.error(error));
                }}
              >
                <div class="input-field col s12">
                  <input
                    id="description"
                    type="text"
                    class="validate"
                    name="description"
                  />
                  <label for="description">What is the event</label>
                </div>
                <div class="col s12 m5">
                  <input id="from" type="date" class="validate" name="from" />
                  <label for="from">Event start</label>
                </div>
                <div class="col s12 m5">
                  <input id="to" type="date" class="validate" name="to" />
                  <label for="to">Event end</label>
                </div>
                <button
                  className="btn waves-effect waves-light col m2"
                  type="submit"
                  style={{ marginTop: "25px" }}
                >
                  Submit
                </button>
              </form>
            </li>
          ) : null}

          {profile.schedule.map(item => (
            <li className="collection-item">
              <span style={{ fontSize: "30px" }}>{item.description}</span>
              <br />
              <span
                style={{ display: "inline-block", margin: "10px 20px 10px 0" }}
              >
                From : {new Date(item.from).getDate()}/
                {new Date(item.from).getMonth()}/
                {new Date(item.from).getFullYear()}
              </span>
              -
              <span
                style={{ display: "inline-block", margin: "10px 20px 10px" }}
              >
                To : {new Date(item.to).getDate()}/
                {new Date(item.to).getMonth()}/{new Date(item.to).getFullYear()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileTest;
