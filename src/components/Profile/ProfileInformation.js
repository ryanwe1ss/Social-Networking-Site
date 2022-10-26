import { useEffect, useState } from "react";

function ProfileInformation()
{
  const [data, setData] = useState([]);
  const profileId = location.search.split("id=")[1];

  function GetProfile() {
    fetch(`http://localhost/api/getprofile?id=${profileId}`)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then((data) => {
      setData(data);
    })
  }
  useEffect(GetProfile, []);

  return (
    <div className="information">
      {data.map(profile => (
        <div key={"profile"}>
          <h6>Account Information</h6>
          <div className="left-labels">
            <span>Name:</span><br/>
            <span>Member Since:</span><br/>
            <span>Last Updated:</span><br/>
          </div>
          <div className="right-assertions">
            <span>{profile.username}</span><br/>
            <span>{new Date(profile.date_created).toLocaleDateString()}</span><br/>
            <span>{new Date(profile.last_updated).toLocaleDateString()}</span><br/>
          </div>
          <h6>Basic Information</h6>
          <div className="left-labels">
            <span>Gender:<br/></span>
            <span>Status:<br/></span>
            <span>Birthday:<br/></span>
            <span>School:<br/></span>
            <span>Concentration:<br/></span>
          </div>
          <div className="right-assertions">
            <span>{profile.gender}<br/></span>
            <span>{profile.status}<br/></span>
            <span>{new Date(profile.birthday).toLocaleDateString()}<br/></span>
            <span>{profile.school}<br/></span>
            <span>{profile.concentration}<br/></span>
          </div>
          <h6>Contact Information</h6>
          <div className="left-labels">
            <span>Email:</span><br/>
            <span>Phone Number:</span><br/>
          </div>
          <div className="right-assertions">
            <span>{profile.email}</span><br/>
            <span>{profile.phone_number}</span><br/>
          </div>
          <hr/>
          <div className="bio">{profile.bio}</div>
        </div>
      ))}
    </div>
  );
}
export default ProfileInformation;