import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import axios from "axios";

function Login(props) {
  let { setRegister } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let setToken = useStoreActions(action => action.auth.setToken);
  let setUser = useStoreActions(action => action.auth.setUser);
  let setAuth = useStoreActions(action => action.auth.setAuth);
  let setProfile = useStoreActions(action => action.auth.setProfile);

  function onSubmit(e) {
    e.preventDefault();

    let formBody = {
      email: email,
      password: password
    };

    setEmail("");
    setPassword("");

    axios
      .post("/login", formBody, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        let { token, user } = res.data;
        setUser(user);
        setToken(token);
        setAuth(true);
        localStorage.setItem("token", token);

        axios
          .get(`/profile/${user._id}`)
          .then(profile => setProfile(profile.data))
          .catch(error => console.error(error));

        console.log(token, user);
      })
      .catch(err => {
        if (err.response.data.email !== undefined) {
          let elem = document.querySelector(".email");
          elem.classList.remove("hide");
          setInterval(() => elem.classList.add("hide"), 3000);
          return;
        } else if (err.response.data.password !== undefined) {
          let elem = document.querySelector(".password");
          elem.classList.remove("hide");
          setInterval(() => elem.classList.add("hide"), 3000);
          return;
        } else {
          console.error(err);
        }
      });
  }

  return (
    <>
      <br />
      <br />
      <form
        className="col offset-m1 m10 l3 card-panel"
        style={{ padding: "10px 30px", borderRadius: "10px" }}
        onSubmit={onSubmit}
      >
        <p
          style={{
            fontSize: "23px",
            paddingBottom: "10px",
            borderBottom: "2px solid #333"
          }}
        >
          Login with your account
        </p>
        <div class="input-field col s12">
          <input
            id="email"
            type="email"
            class="validate"
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <label for="email">Email</label>
          <p className="red-text hide email">Invalid credentials</p>
        </div>
        <div class="input-field col s12">
          <input
            id="password"
            type="password"
            class="validate"
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
          <label for="password">Password</label>
          <p className="red-text hide password">Invalid credentials</p>
        </div>
        <br />
        <br />
        <button class="btn waves-effect waves-light" type="submit">
          Submit
          <i class="material-icons right">send</i>
        </button>
        <br />
        <br />
        <small>
          You will be redirected to your profile page on pressing{" "}
          <strong style={{ fontWeight: "bold" }}> Submit</strong>{" "}
        </small>
        <p>
          Dont't have an account ? Create one by
          <a
            href=""
            onClick={e => {
              e.preventDefault();
              setRegister(true);
            }}
          >
            {" "}
            Pressing this
          </a>
        </p>
      </form>
    </>
  );
}

export default Login;
