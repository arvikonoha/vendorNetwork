import React, { useState } from "react";
import axios from "axios";
import { useStoreActions } from "easy-peasy";

function Register(props) {
  let { setRegister } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCpassord] = useState("");
  let setToken = useStoreActions(action => action.auth.setToken);
  let setUser = useStoreActions(action => action.auth.setUser);
  let setAuth = useStoreActions(action => action.auth.setAuth);

  function onSubmit(e) {
    e.preventDefault();

    if (cpassword !== password) {
      let elem = document.querySelector(".password");
      elem.classList.remove("hide");
      setTimeout(() => elem.classList.add("hide"), 5000);
      return;
    }

    let formBody = {
      email: email,
      password: password
    };

    setEmail("");
    setCpassord("");
    setPassword("");

    axios
      .post("/register", formBody, {
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
        console.log(token, user);
      })
      .catch(err => {
        if (err.response.data.email !== undefined) {
          let elem = document.querySelector(".email");
          elem.classList.remove("hide");
          setInterval(() => elem.classList.add("hide"), 4000);
          return;
        } else console.error(err);
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
          Register with us
        </p>
        <div class="input-field col s12">
          <input
            id="email"
            type="email"
            class="validate"
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label for="email">Email</label>
          <p className="red-text hide email">Email already exist</p>
        </div>
        <div class="input-field col s12">
          <input
            id="password"
            type="password"
            class="validate"
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label for="password">Password</label>
        </div>
        <div class="input-field col s12">
          <input
            id="confirm_password"
            type="password"
            class="validate"
            value={cpassword}
            name="cpassword"
            onChange={e => setCpassord(e.target.value)}
            required
          />
          <label for="confirm_password">Confirm Password</label>
          <p className="red-text hide password">Password don't match</p>
        </div>
        <br />
        <br />
        <button class="btn waves-effect waves-light" type="submit">
          Submit
          <i class="material-icons right">send</i>
        </button>
        <br />
        <br />
        <p>
          Already have an account ?
          <a
            href=""
            onClick={e => {
              e.preventDefault();
              setRegister(false);
            }}
          >
            {" "}
            Press this
          </a>
        </p>
      </form>
    </>
  );
}

export default Register;
