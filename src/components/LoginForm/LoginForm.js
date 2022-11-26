function LoginForm(params)
{
  return (
    <div className="loginForm">
      <div className="loginPrompt">
        <label>Username</label>
        <input type="text" id="username"/>

        <label>Password</label>
        <input type="password" id="password"/>

        <input type="button" value="Login" onClick={() => params.HandleLogin(
          document.getElementById("username").value,
          document.getElementById("password").value,
        )} className="buttons"/>
        <div id="response"/>
      </div>
      
      <div className="noAccount">
        <label>No Account?</label><br/>
        <input type="button" value="Register" onClick={() => params.setForm(false)}/>
      </div>
    </div>
  );
}
export default LoginForm;