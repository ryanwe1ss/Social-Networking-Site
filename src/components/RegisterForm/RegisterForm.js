function RegisterForm(props)
{
  return (
    <div className="registerForm">
      <div className="registerPrompt">
        <label>New Username</label>
        <input type="text" id="username"/>

        <label>New Password</label>
        <input type="text" id="password"/>

        <label>Confirm Password</label>
        <input type="text" id="password"/>

        <input type="button" value="Register" style={{marginTop: "10px"}}/>
      </div>
      
      <div className="noAccount">
        <label>Already Registered?</label><br/>
        <input type="button" value="Login" onClick={() => props.setForm(true)}/>
      </div>
    </div>
  );
}
export default RegisterForm;