function Profile()
{
  return (
    <div className="container">
      <div className="border">
        <div className="navbar">
          <input type="text" placeholder="Search Network"/>
          <a href="/profile">My Profile</a>
          <a href="/profile">Direct Messages</a>
          <hr/>
        </div>
      </div>
    </div>
  );
}
export default Profile;