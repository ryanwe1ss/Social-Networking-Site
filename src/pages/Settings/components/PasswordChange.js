function PasswordChange(args) {
  return (
    <div className="settings-change-password-container">
      <div className="left-elements">
        <h5>New Password:</h5>
      </div>

      <div className="right-elements">
        <input type="password" placeholder="Enter Here" id="newPassword"/>
      </div>

      <button className="btn btn-primary" onClick={() => args.HandleUpdateCredential("Password")}>Update Password</button>
      <div id="result"/>
    </div>
  );
}
export default PasswordChange;