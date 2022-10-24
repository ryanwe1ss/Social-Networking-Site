import DefaultProfileImage from "../../images/profile.png";

function Profile()
{
  return (
    <div className="container">
      <div className="border-area">
        <div className="menu">
          <input type="text" placeholder="Search Network"/>
          <a href="/profile">My Profile</a>
          <a href="/profile">Direct Messages</a>
          <hr/>
        </div>
        
        <div className="wrapper">
          <div className="profile">
            <img src={DefaultProfileImage} width="250" height="250" alt="profile"/><br/>
            <input className="mt-2" type="button" value="Edit Profile"/><br/>
            <input className="mt-1" type="button" value="Change Picture"/>
          </div>
          <div className="information">
            <div className="account-info">
              <h6>Account Information</h6>
              Name: ?<br/>
              Member Since: ?<br/>
              Last Updated: ?<br/>
            </div>
            <div className="personal-info">
              <h6>Basic Information</h6>
              Sex: <br/>
              Status: ?<br/>
              Birthday: ?<br/>
              School: ?<br/>
              Concentration: ?<br/>
            </div>
            <div className="contact-info">
              <h6>Contact Information</h6>
              Email ?<br/>
              Phone Number: ?<br/>
            </div>
            <hr/>
            <div className="bio">
              This is your bio...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;