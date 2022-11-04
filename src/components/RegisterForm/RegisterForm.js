function RegisterForm(props)
{
  function PerformRegister(username, password, confirm) {
    if (username.length < 5 || password.length < 5 || confirm.length < 5) {
      document.getElementById("response").style.color = "red";
      document.getElementById("response").innerHTML = "Minimum of 5 characters";
    }
    else if (password != confirm) {
      document.getElementById("response").style.color = "red";
      document.getElementById("response").innerHTML = "Password's do not match";
    
    } else props.Register(username, password);
  }

  return (
    <div className="registerForm">
      <div className="registerPrompt">
        <label>New Username</label>
        <input type="text" id="username"/>

        <label>New Password</label>
        <input type="password" id="password"/>

        <label>Confirm Password</label>
        <input type="password" id="confirm"/>

        <input type="button" value="Register" onClick={() => PerformRegister(
          document.getElementById("username").value,
          document.getElementById("password").value,
          document.getElementById("confirm").value,
        )} style={{marginTop: "10px"}}/>
        <div id="response"/>
      </div>
      
      <div className="noAccount">
        <label>Already Registered?</label><br/>
        <input type="button" value="Login" onClick={() => props.setForm(true)}/>
      </div>
    </div>
  );
}
export default RegisterForm;