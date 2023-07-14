import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarAfterLogin from "../navbar/NavbarAfterLogin";

import "../../App.css";
import UserList from "./UserList";

export default function PendingAccount() {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    retrieveUsers();
  }, [usersData]);

  async function retrieveUsers(){
    await axios
      .get(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_all_users"
      )
      .then((response) => {
        console.log(response.data);
        const newdata = [...response.data];
        setUsersData(newdata);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <NavbarAfterLogin/>
      <table className="table table-hover table-sm table-responsive-sm">
        <thead className="table-success">
          <tr>
            <th className="text-center">login</th>
            <th className="text-center">admin</th>
            <th className="text-center">user id</th>
            <th className="text-center">email</th>
            <th className="text-center">password</th>
            <th className="text-center">first name</th>
            <th className="text-center">last name</th>
            <th className="text-center">company name</th>
            <th className="text-center">phone number</th>
            <th className="text-center">address</th>
          </tr>
        </thead>
        <tbody>
          {usersData.length > 0
            ? usersData.map((user, index) => (
                <UserList key={index} user={user} />
              ))
            : null}
        </tbody>
      </table>
      <div>
        <h1>Print Object Example</h1>
        <pre>{JSON.stringify(usersData, null, 2)}</pre>
      </div>
    </Fragment>
  );
}

