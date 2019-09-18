import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";
import uuid from "uuid";

function ProfileCreate() {
  let { _id } = useStoreState(state => state.auth.user);
  let setProfile = useStoreActions(action => action.auth.setProfile);
  let profile = useStoreState(state => state.auth.profile);
  let [title, setTitle] = useState(profile ? profile.title : "");
  let [description, setDescription] = useState(
    profile ? profile.description : ""
  );
  let [location, setLocation] = useState(profile ? profile.location : "");
  let [address, setAddress] = useState(profile ? profile.address : "");
  let [telephone, setTelephone] = useState(profile ? profile.telephone : "");
  let [email, setEmail] = useState(profile ? profile.email : "");
  let [subcategories, setSubcategories] = useState(
    profile
      ? profile.subcategories
        ? profile.subcategories.map(item => {
            let { subcategory, price } = item;
            return { subcategory, price };
          })
        : []
      : []
  );

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    var instances = window.M.FormSelect.init(elems);
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <form
        className="row"
        name="profile-form"
        onSubmit={e => {
          e.preventDefault();
          let formBody = new FormData(document.forms[0]);
          let subc = JSON.stringify(subcategories);
          formBody.append("subcategories", subc);
          axios
            .post(`/profile/${_id}`, formBody, {
              headers: { "Content-type": "multipart/form-data" }
            })
            .then(res => {
              console.log(res.data);
              setProfile(res.data);
              setAddress("");
              setDescription("");
              setTelephone("");
              setTitle("");
              setLocation("");
              setEmail("");
              setSubcategories([]);
            })
            .catch(err => console.log(err.response));
        }}
      >
        <br />
        <div className="col offset-s1 s11">
          <div
            className="profile-pic row col m7 s11 center-align"
            style={{
              backgroundColor: "#f4f4f4",
              height: "300px",
              borderRadius: "10px"
            }}
          >
            <h2
              className="card-panel col offset-l10 offset-m10 l5 m8 s14"
              style={{
                display: "inline-block",
                fontSize: "50px",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "30px"
              }}
            >
              <div class="input-field col s12">
                <input
                  id="title"
                  type="text"
                  class="validate"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required={profile === null}
                />
                <label className={profile ? "active" : ""} for="title">
                  Enter your company's title
                </label>
              </div>
            </h2>
            <div
              className="center-align"
              style={{ position: "relative", top: "45%", height: "20%" }}
            >
              <input
                type="file"
                name="profile-pic"
                style={{
                  position: "absolute",
                  zIndex: "1000",
                  opacity: "0",
                  cursor: "pointer",
                  right: "37%",
                  top: "60%",
                  height: "50%",
                  fontSize: "24px",
                  width: "25%"
                }}
              />
              <i
                className="material-icons small white-text  blue-grey darken-4"
                style={{
                  borderRadius: "5px",
                  padding: "0",
                  marginBottom: "10px",
                  cursor: "pointer",
                  position: "absolute",
                  top: "45%",
                  right: "48%"
                }}
              >
                add
              </i>
              <br />
              <div
                className="grey-text text-darken-3 center-align flow-text"
                style={{ position: "absolute", width: "100%", top: "100%" }}
              >
                {profile
                  ? profile.picsource
                    ? "Change your profile pic"
                    : "Add a profile pic"
                  : "Add a profile pic"}
              </div>
            </div>
          </div>
          <div
            className="col offset-s1 s11 card-panel"
            style={{
              marginTop: "-30px",
              minHeight: "450px",
              borderRadius: "10px",
              padding: "20px"
            }}
          >
            <div className="col offset-s1 s10 m6" style={{ padding: "15px" }}>
              <div class="row">
                <h3 className="flow-text">Enter your Description</h3>
                <p
                  className=" grey-text text-darken-3 "
                  style={{ fontSize: "14px", color: "" }}
                >
                  This text will be displayed in your profile for your customers
                  to view. So please make sure that you enter suffient
                  information to convey your message
                </p>
                <div class="input-field col s12">
                  <textarea
                    id="textarea1"
                    class="materialize-textarea"
                    name="description"
                    required={profile === null}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <label className={profile ? "active" : ""} for="textarea1">
                    Description
                  </label>
                </div>
                <h3 className="flow-text">Enter your Services</h3>
                <p
                  className=" grey-text text-darken-3 "
                  style={{ fontSize: "14px", color: "" }}
                >
                  First select your category followed by basic services you are
                  willing to offer
                </p>
                <div className="row">
                  <div class="input-field col s12">
                    <select
                      name="category"
                      multiple
                      required={profile === null}
                    >
                      <option value="" disabled>
                        Choose your category
                      </option>
                      <option
                        value="Photographer"
                        selected={
                          profile
                            ? profile.category.includes("Photographer")
                            : false
                        }
                      >
                        Photographer
                      </option>
                      <option
                        value="Caterer"
                        selected={
                          profile ? profile.category.includes("Caterer") : false
                        }
                      >
                        Caterer
                      </option>
                      <option
                        value="Musical"
                        selected={
                          profile ? profile.category.includes("Musica;") : false
                        }
                      >
                        Musical
                      </option>
                      <option
                        value="Decorator"
                        selected={
                          profile
                            ? profile.category.includes("Decorators")
                            : false
                        }
                      >
                        Decorators
                      </option>
                    </select>
                    <label>Categories available</label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col s12 m6"
              style={{ marginTop: "40px", paddingLeft: "50px" }}
            >
              <h3 className="flow-text">
                Enter your Address and other details
              </h3>
              <div class="input-field col s12">
                <input
                  id="location"
                  type="text"
                  class="validate"
                  name="location"
                  required={profile === null}
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
                <label className={profile ? "active" : ""} for="location">
                  Location
                </label>
              </div>
              <div class="input-field col s12">
                <input
                  id="address"
                  type="text"
                  class="validate"
                  name="address"
                  required={profile === null}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                <label className={profile ? "active" : ""} for="address">
                  Address
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  id="icon_telephone"
                  type="tel"
                  class="validate"
                  name="telephone"
                  required={profile === null}
                  name="telephone"
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                />
                <label className={profile ? "active" : ""} for="icon_telephone">
                  Telephone
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  class="validate"
                  name="email"
                  required={profile === null}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label className={profile ? "active" : ""} for="email">
                  Email
                </label>
              </div>
            </div>
            <div className="col s10">
              <h3 className="flow-text">Enter your sub categories</h3>
              <p
                className=" grey-text text-darken-3 "
                style={{ fontSize: "14px", color: "" }}
              >
                {" "}
                Here enter the sub category along with price for each category.
                <br />
                For example subcategory may be Photo + Video and its price may
                be 20,000&#8377;
                <br />
                Press + button to submit the category
              </p>
              <div>
                {subcategories.map(item => (
                  <div className="chip" data-sub={item.subcategory}>
                    Subcategory: {item.subcategory} - Price: {item.price}{" "}
                    &#8377;
                    <i
                      className="material-icons tiny"
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        let subcategory = e.target.closest(".chip").dataset.sub;
                        setSubcategories(
                          subcategories.filter(
                            item => item.subcategory !== subcategory
                          )
                        );
                      }}
                    >
                      close
                    </i>
                  </div>
                ))}
              </div>

              <div class="input-field col s12 m5">
                <input id="sub_category" type="text" class="validate" />
                <label className={profile ? "active" : ""} for="sub_category">
                  Subcategory
                </label>
              </div>
              <div class="input-field col s12 m5">
                <input id="price" type="text" class="validate" />
                <label className={profile ? "active" : ""} for="price">
                  Price in &#8377;
                </label>
              </div>
              <a
                class="btn-floating btn-medium red"
                onClick={e => {
                  setSubcategories([
                    ...subcategories,
                    {
                      subcategory: document.getElementById("sub_category")
                        .value,
                      price: document.getElementById("price").value
                    }
                  ]);
                  console.log(subcategories);
                }}
              >
                <i class="large material-icons">add</i>
              </a>
              <div className="col s12">
                <button
                  class="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Submit
                  <i class="material-icons right">send</i>
                </button>
                <br />
                <br />
                {profile !== null ? (
                  <Link
                    to="/Profile/vendorProfile"
                    class="btn waves-effect waves-light"
                    name="action"
                  >
                    Go to my profile
                    <i class="material-icons right">send</i>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileCreate;
