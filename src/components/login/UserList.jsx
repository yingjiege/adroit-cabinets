import React, { Fragment, useState, useEffect } from "react";
//import panelFinishList from "../../../panelFinish.js";
import axios from "axios";
import * as Realm from "realm-web";


const REALM_APP_ID = "application-0-hxfdv"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });

function UserList({ user }) {
  async function editAdmin() {
    const admindata = {
      email: user.email,
      password: user.password,
      is_admin: !user.is_admin,
      allow_login: user.allow_login,
    };
    await axios
      .put(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/editAdmin",
        admindata
      )
      .then((response) => {
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function editLogin() {
    const admindata = {
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
      allow_login: !user.allow_login,
    };
    await axios
      .put(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/editAdmin",
        admindata
      )
      .then((response) => {
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Fragment>
      <tr>
        <td>
          <button onClick={editLogin}>
            {user.allow_login ? (
              <span className="btn btn-success">Yes</span>
            ) : (
              <span className="btn btn-danger">No</span>
            )}
          </button>
        </td>
        <td>
          <button onClick={editAdmin}>
            {user.is_admin ? (
              <span className="btn btn-success">Yes</span>
            ) : (
              <span className="btn btn-danger">No</span>
            )}
          </button>
        </td>
        <td>{user.user_id}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.companyName}</td>
        <td>{user.phoneNumber}</td>
        <td>
          {user.street}, {user.city}, {user.state}, {user.zipcode}
        </td>
      </tr>
    </Fragment>
  );
}

export default UserList;