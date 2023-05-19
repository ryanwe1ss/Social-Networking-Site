import { useEffect } from "react";
import { FetchSession, PerformRegister } from "../../utilities/utilities";
import "./register.scss";

function Register()
{
  useEffect(() => {
    FetchSession(true).then((session) => {
      if (session) {
        switch (session.type) {
          case "admin":
            window.location.href = "/statistics";
            break;

          case "user":
            window.location.href = `/profile/${session.username}`;
            break;
        }
      }
    });
  }, []);

  function HandleRegister(username, password, confirm) {
    PerformRegister(username, password, confirm).then((response) => {
      document.getElementById("response").style.color = "red";

      switch (response.status) {
        case 200:
          document.getElementById("response").style.color = "green";
          document.getElementById("response").innerHTML = "Account Registered";
          break;

        case 409:
          document.getElementById("response").innerHTML = "Username already taken";
          break;

        case 500:
          document.getElementById("response").innerHTML = "Failed to register, try again";
          break;

        case 401:
          document.getElementById("response").innerHTML = "Passwords do not match";
          break;

        case 400:
          document.getElementById("response").innerHTML = "Username and Password must be 5-20 characters";
          break;

        case 429:
          document.getElementById("response").innerHTML = "Too many accounts registered";
          break;
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
  );
}
export default Register;