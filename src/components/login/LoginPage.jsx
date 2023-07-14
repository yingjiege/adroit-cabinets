import React, { Fragment, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import * as Realm from "realm-web";
import NavbarBeforeLogin from "../navbar/NavbarBeforeLogin";

import "../../App.css";

const REALM_APP_ID = "application-0-hxfdv"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  async function emailLogin(e) {
    e.preventDefault();
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      // Authenticate the user
      const userinfo = await app.logIn(credentials);
      setUser(userinfo);
      // `App.currentUser` updates to match the logged in user
          const data = {
            email: email,
            password: password,
            user_id: userinfo.id,
          };
          await axios
            .post(
              "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/login",
              data
            )
            .then((response) => {
              if (response.data[0].allow_login) {
                localStorage.setItem('user', response.data[0].user_id);
                navigate('/shop');
              } else {
                navigate('/home');
              }
            })
            .catch((e) => {
              console.log(e);
              setErrorMessage(e.error.toString());
            });
    } catch (error) {
      //console.error('Failed to register user:', error);
      console.log(error.error.toString());
      setErrorMessage(error.error.toString());
    }
  }

  return (
    <Fragment>
      <NavbarBeforeLogin/>
      <div
        className="modal modal-sheet position-static d-block p-4 py-md-5"
        tabIndex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Sign in to us</h1>
            </div>

            <div className="modal-body p-5 pt-0">
              <form className="">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={onChangeEmail}
                  />
                  <label>email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  <label>Password</label>
                  <Link to="/forget-password">
                    <label className="right-label">Forget password?</label>
                  </Link>
                </div>
                <div style={{ color: "red" }}>{errorMessage}</div>
                <button
                  className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                  type="submit"
                  onClick={emailLogin}
                >
                  Sign in
                </button>
              </form>
              <footer>
                <p>
                  First time? <Link to={"/register"}>Create an account</Link>.
                </p>
                <p>
                  <Link to="/">Back to Homepage</Link>.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}