import React from "react";

// Import the MongoDB Realm Web SDK
import * as Realm from "realm-web";
const REALM_APP_ID = "application-0-hxfdv"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });
const id = "g_id_onload";
const callback="handleCredentialsResponse";
const client_id="1062848673840-fkvbt2r11ogg073p8g1t848pp4069ga2.apps.googleusercontent.com";


export default function Testing1() {
  // Connect to your MongoDB Realm app
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState("");

  // Create a component that displays the given user's details
  function UserDetail({ user }) {
    return (
      <div>
        <h1>Logged in with anonymous id: {user.id}</h1>
      </div>
    );
  }

  async function logout() {
    setUser("");
  }

  async function GuestLogin(e) {
    e.preventDefault();
    const credentials = Realm.Credentials.anonymous();
    // Authenticate the user
    const user = await app.logIn(credentials);
    setUser(user);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
    window.location.href = '/'+user.id;
    return user;
  }

  async function handleCredentialsResponse(response) {
    const credentials = Realm.Credentials.google({ id_token: response.credential });
    const user = await app.logIn(credentials);
    setUser(user);
    console.assert(user.id === app.currentUser.id);
    return user;
  }

  async function face(){
    const redirectUri = "http://localhost:3000/test";
    const credentials = Realm.Credentials.facebook(redirectUri);
    const user = await app.logIn(credentials);
    setUser(user);
    console.assert(user.id === app.currentUser.id);
    return user;
  }

  return (
    <div className="container">
      <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" onClick={face}>Log In</button>
      <button
        className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
        type="submit"
        onClick={logout}
      >
        Logout
      </button>
      <div className="App-header">
        <UserDetail user={user} />
      </div>
    </div>
  );
};
