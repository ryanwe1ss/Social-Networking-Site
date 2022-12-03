import { useState } from "react";
import { Login, Register } from "../utilities/utilities";

import RegisterForm from "../components/RegisterForm/RegisterForm.js";
import LoginForm from "../components/LoginForm/LoginForm.js";
import Footer from "../components/Footer/Footer.js";

function Home() {
  const [currentForm, setForm] = useState(true);

  function HandleLogin(username, password) {
    Login(username, password).then((response) => {
      if (response !== "invalid") {
        response = JSON.parse(response);
  
        localStorage.setItem("accountId", response.id);
        window.location.href = `/profile?id=${response.id}`;
  
      } else {
        document.getElementById("response").style.color = "red";
        document.getElementById("response").innerHTML = "Login failed, try again";
      }
    });
  }

  function HandleRegister(username, password) {
    Register(username, password).then((response) => {
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
    });
  }

  return (
    <div className="block">
      <div className="area">
        <div className="head">
          <h1 id="header">NetConnect - Social Network</h1>
        </div>
        <div className="body">
          {currentForm
            ? <LoginForm setForm={setForm} HandleLogin={HandleLogin}/>
            : <RegisterForm setForm={setForm} HandleRegister={HandleRegister}/>
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
        <div className="footer-border">
          <Footer/>
        </div>
      </div>
    </div>
  );
}
export default Home;