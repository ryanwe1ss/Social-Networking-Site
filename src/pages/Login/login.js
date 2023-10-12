import { useEffect } from "react";
import { FetchSession, PerformLogin } from "../../utilities/routes";
import "./login.scss";

function Login()
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

    document.getElementById("password").addEventListener("keyup", (event) => {
      if (event.key == 'Enter') {
        document.getElementById("response").style.color = "red";
        HandleLogin(
          document.getElementById("username").value,
          document.getElementById("password").value,
        );
      }
    });
  }, []);

  function HandleLogin(username, password) {
    PerformLogin(username, password).then((response) => {
      localStorage.setItem('sessionToken', response.token);
      document.getElementById("response").style.color = "red";

      if (response.status == 200) {
        if (response.type == "admin") return window.location.href = "/statistics";
        window.location.href = `/profile/${response.username}`;

      } else if (response.status == 504) {
        document.getElementById("response").innerHTML = "Error connecting to server. Please contact an administrator.";
      
      } else {
        document.getElementById("response").innerHTML = "Login failed, try again";
        document.getElementById("password").value = null;
      }
    });
  }

  return (
    <center>
      <div className="login-form">
        <h1>Login</h1>
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
        </div>
        <input type="button" className="btn btn-primary" value="Login" onClick={() => HandleLogin(
          document.getElementById("username").value,
          document.getElementById("password").value,
        )}/>
        <div id="response"/>

        <div className="footer">
          Not registered?<br/><a href="/register">Click here</a>
        </div>
      </div>
    </center>
  );
}
export default Login;