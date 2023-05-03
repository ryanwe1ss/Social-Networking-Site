import { useEffect } from "react";
import { FetchSession, PerformLogin } from "../../utilities/utilities";
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
            window.location.href = `/profile?id=${session.id}`;
            break;
        }
      }
    });
  }, []);

  function HandleLogin(username, password) {
    PerformLogin(username, password).then((response) => {
      if (response.status == 401) {
        document.getElementById("response").style.color = "red";
        document.getElementById("response").innerHTML = "Login failed, try again";
      
      } else if (response.status == 200) {
        if (response.type == "admin") window.location.href = "/statistics";
        else window.location.href = `/profile?id=${response.id}`;
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
            <input type="text" id="username" className="form-control" autoFocus={true}/>
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