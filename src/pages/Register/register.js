import { useState } from "react";
import { PerformRegister } from "../../utilities/utilities";
import "./register.scss";

function Register() {

  function HandleRegister(username, password) {
    PerformRegister(username, password).then((response) => {
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
    <center>
      <div className="register-form">
        <h1>Register</h1>
        <div className="row">
          <div className="form-group">
            <label>Username</label>
            <input type="text" id="username" className="form-control"/>
          </div>
        </div><br/>

        <div className="row">
          <div className="form-group">
            <label>Password</label>
            <input type="password" id="password" className="form-control"/>
          </div>
        </div><br/>

        <div className="row">
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" id="confirm" className="form-control"/>
          </div>
        </div>
        <input type="button" onClick={() => HandleRegister(
          document.getElementById("username").value,
          document.getElementById("password").value,
          document.getElementById("confirm").value
          
          )} className="btn btn-primary" value="Register Account"/>
        <div id="response"/>

        <div className="footer">
          Already registered?<br/><a href="/">Click here</a>
        </div>
      </div>
    </center>

    // <div className="block">
    //   <div className="area">
    //     <div className="head">
    //       <h1 id="header">NetConnect - Social Network</h1>
    //     </div>
    //     <div className="body">
    //       {currentForm
    //         ? <LoginForm setForm={setForm} HandleLogin={HandleLogin}/>
    //         : <RegisterForm setForm={setForm} HandleRegister={HandleRegister}/>
    //       }
    //       <div className="description">
    //         <h3>Welcome to NetConnect</h3>
    //         NetConnect is a standalone social networking site that allow people to register
    //         their own accounts and use a variety of different features to communicate with 
    //         other users.<br/><br/>

    //         You can use NetConnect to:
    //         <li>Create Profile</li>
    //         <li>Search for people</li>
    //         <li>View other profiles</li>
    //         <li>Direct Messaging</li>
    //         <li>See a visualization of your social network</li>

    //         <br/><br/>To get started, click register. If you have already registered, you can log in.
    //       </div>
    //     </div>
    //     <div className="footer-border">
    //       <Footer/>
    //     </div>
    //   </div>
    // </div>
  );
}
export default Register;