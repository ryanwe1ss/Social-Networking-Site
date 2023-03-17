function UsernameChange(params) {
  return (
    <div className="username-change">
      <input type="text" placeholder="New Username" id="newUsername"/>
      <input type="button" className="btn btn-secondary" onClick={params.UpdateAccountUsername} value="Update"/>
      <div id="result"/>
    </div>
  );
}
export default UsernameChange;