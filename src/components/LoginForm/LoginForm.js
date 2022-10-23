function LoginForm(props)
{
  return (
    <div className="loginForm">
      <div className="loginPrompt">
        <label>Username</label>
        <input type="text" id="username"/>

        <label>Password</label>
        <input type="text" id="password"/>

        <input type="button" value="Login" style={{marginTop: "10px"}}/>
      </div>
      
      <div className="noAccount">
        <label>No Account?</label><br/>
        <input type="button" value="Register" onClick={() => props.setForm(false)}/>
      </div>
    </div>
  );
}
export default LoginForm;