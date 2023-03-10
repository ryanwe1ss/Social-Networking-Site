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
export default Login;