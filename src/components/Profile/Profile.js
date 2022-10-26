import { useState } from "react";
import DefaultProfileImage from "../../images/profile.png";

import ProfileInformation from "./ProfileInformation";
import ProfileEdit from "./ProfileEdit";

function Profile()
{
  const [editForm, setEditForm] = useState(false);

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
            <input className="mt-2" type="button" value="Edit Profile" onClick={() => setEditForm(editForm ? false:true)}/><br/>
            <input className="mt-1" type="button" value="Change Picture"/>
          </div>
          {editForm
            ? <ProfileEdit setEditForm={setEditForm}/>
            : <ProfileInformation/>
          }
        </div>
      </div>
    </div>
  );
}
export default Profile;