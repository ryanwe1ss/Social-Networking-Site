function PasswordChange(args) {

  function HandleShowPassword() {
    const password = document.getElementById("password");
    const button = document.getElementsByClassName("show")[0];
    password.type = password.type === "password" ? "text" : "password";
    button.innerHTML = button.innerHTML === "Show" ? "Hide" : "Show";
  }

  return (
    <div className="change-password-container">

      <div className="left-elements">
        <h5>Current Password:</h5><br/>
        <h5>New Password:</h5>
      </div>

      <div className="right-elements">
        <input type="password" id="password" disabled={true} value={args.account.password}/>
        <button className="show" onClick={HandleShowPassword}>Show</button>
        <br/><br/>

        <input type="text" placeholder="Enter Here" id="newPassword"/>
      </div>

      <button className="btn btn-primary" onClick={() => args.UpdateCredential("Password")}>Update Password</button>
      <div id="result"/>
    </div>
  );
}
export default PasswordChange;