import { useState, useEffect } from "react";
import DefaultProfilePicture from "../../images/profile.png";
import ProfileInformation from "./ProfileInformation";
import ProfileEdit from "./ProfileEdit";

function Profile()
{
  const [editForm, setEditForm] = useState(false);
  const [picture, setProfilePicture] = useState([]);
  const profileId = location.search.split("id=")[1];

  const UploadProfilePicture = (event) => {
    let httpRequest = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("data", event.target.files[0]);
    httpRequest.open("post", `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/update?id=${profileId}`, false);
    httpRequest.send(formData);
  }

  function GetProfilePicture() {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/picture?id=${profileId}`)
    .then((result) => {
      if (result.ok) {
        return result.blob();
      }
    })
    .then((data) => {
      setProfilePicture(URL.createObjectURL(data));
    })
    .catch((error) => {
      error => null
    })
  }
  useEffect(GetProfilePicture, []);

  return (
    <div className="block">
      <div className="border-area">
        <div className="menu">
          <input type="text" placeholder="Search Network"/>
          <a href="/profile">My Profile</a>
          <a href="/profile">Direct Messages</a>
          <hr/>
        </div>
        
        <div className="wrapper">
          <div className="profile">
            <img
              src={picture}
              onError={(e) => (e.target.src = DefaultProfilePicture)}
              width="250"
              height="230"
              alt="profile"
            /><br/>
            <input className="mt-2" type="button" value="Edit Profile" onClick={() => setEditForm(editForm ? false:true)}/><br/>
            <input className="mt-1" type="file" onChange={UploadProfilePicture}/>
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