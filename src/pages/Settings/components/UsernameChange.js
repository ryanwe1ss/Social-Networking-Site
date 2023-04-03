function UsernameChange(args) {
  return (
    <div className="change-username-container">

      <div className="left-elements">
        <h5>Current Username:</h5><br/>
        <h5>New Username:</h5>
      </div>

      <div className="right-elements">
        <input type="text" disabled={true} value={args.account.username}/><br/><br/>
        <input type="text" placeholder="Enter Here" id="newUsername"/>
      </div>

      <button className="btn btn-primary" onClick={() => {args.UpdateCredential('Username')}}>Update Username</button>
      <div id="result"/>
    </div>
  );
}
export default UsernameChange;