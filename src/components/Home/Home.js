import { useState } from "react";
import { ReactSession } from "react-client-session";

import LoginForm from "../LoginForm/LoginForm.js";
import RegisterForm from "../RegisterForm/RegisterForm.js";

function Home()
{
  ReactSession.setStoreType("localStorage");
  const [currentForm, setForm] = useState(true);

  function Login(username, password) {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "username": username,
        "password": password,
      }),
    })
    .then((result) => {
      if (result.ok) {
        return result.text();
      }
    })
    .then((response) => {
      if (response !== "invalid") {
        ReactSession.set("accountId", response);
        window.location.href = `/profile?id=${response}`;
      
      } else {
        document.getElementById("response").style.color = "red";
        document.getElementById("response").innerHTML = "Login failed, try again";
      }
    });
  }

  function Register(username, password) {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "username": username,
        "password": password,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
    })
    .then((response) => {
      if (response == "exists") {
        document.getElementById("response").style.color = "red";
        document.getElementById("response").innerHTML = "Username already taken";

      } else if (response == "error") {
        document.getElementById("response").style.color = "red";
        document.getElementById("response").innerHTML = "Failed to register, try again";
      
      } else {
        document.getElementById("response").style.color = "green";
        document.getElementById("response").innerHTML = "Account Registered";
      }
    })
  }

  return (
    <div className="block">
      <div className="area">
        <div className="head">
          <h1 id="header">NetConnect - Social Network</h1>
        </div>
        <div className="body">
          {currentForm
            ? <LoginForm setForm={setForm} Login={Login}/>
            : <RegisterForm setForm={setForm} Register={Register}/>
          }
          <div className="description">
            <h3>Welcome to NetConnect</h3>
            NetConnect is a standalone social networking site that allow people to register
            their own accounts and use a variety of different features to communicate with 
            other users.<br/><br/>

            You can use NetConnect to:
            <li>Create Profile</li>
            <li>Search for people</li>
            <li>View other profiles</li>
            <li>Direct Messaging</li>
            <li>See a visualization of your social network</li>

            <br/><br/>To get started, click register. If you have already registered, you can log in.
          </div>
        </div>
        <div className="footer">
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">FAQ</a>
          <a href="/">Terms</a>
          <a href="/">Privacy</a>
          <br/><br/>a Ryan Weiss production
          <br/>NetConnect © 2022
        </div>
      </div>
    </div>
  );
}
export default Home;