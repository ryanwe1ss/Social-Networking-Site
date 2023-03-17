import { PerformLogin } from "../../utilities/utilities";
import "./login.scss";

function Login() {

  function HandleLogin(username, password) {
    PerformLogin(username, password).then((response) => {
      if (response !== "invalid") {
        response = JSON.parse(response);

        localStorage.setItem("accountId", response.id);
        localStorage.setItem("username", response.username);
        window.location.href = `/profile?id=${response.id}`;
  
      } else {
        document.getElementById("response").style.color = "red";
        document.getElementById("response").innerHTML = "Login failed, try again";
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