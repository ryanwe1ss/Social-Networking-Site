import { useEffect, useState } from "react";

function ProfileEdit(props)
{
  const [data, setData] = useState([]);
  const profileId = location.search.split("id=")[1];

  function UpdateProfile(username, gender, status, birthday, school, concentration, email, phone, bio) {
    const details = {
      "id": profileId,
      "username": username,
      "gender": gender,
      "status": status,
      "birthday": birthday,
      "school": school,
      "concentration": concentration,
      "email": email,
      "phone": phone,
      "bio": bio,
    }

    fetch(`http://localhost/api/updateprofile`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(details),
    })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
    })
    .then((response) => {
      if (response !== "success") alert(response);
      props.setEditForm(false);
    });
  }

  function FetchProfile() {
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
  useEffect(FetchProfile, []);

  return (
    <div className="information">
      <button onClick={() => UpdateProfile(
        document.getElementById("username").value,
        document.getElementById("gender").value,
        document.getElementById("status").value,
        document.getElementById("birthday").value,
        document.getElementById("school").value,
        document.getElementById("concentration").value,
        document.getElementById("email").value,
        document.getElementById("phone").value,
        document.getElementById("bio").value,

      )} style={{float: "right"}}>Update</button>

      {data.map(profile => (
        <div key={"profile"}>
          <h6>Account Information</h6>
          <div className="left-labels">
            <span>Name:</span><br/>
            <span>Member Since:</span><br/>
            <span>Last Updated:</span><br/>
          </div>
          <div className="right-assertions">
            <span><input type="text" id="username" defaultValue={profile.username}/></span><br/>
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
            <span>
              <select id="gender">
                <option>Male</option>
                <option>Female</option>
              </select><br/></span>
            <span>
              <select id="status">
                <option>Single</option>
                <option>In Relationship</option>
              </select><br/></span>
            <span><input type="date" id="birthday" defaultValue={profile.birthday}/><br/></span>
            <span><input type="text" id="school" defaultValue={profile.school}/><br/></span>
            <span><input type="text" id="concentration" defaultValue={profile.concentration}/><br/></span>
          </div>
          <h6>Contact Information</h6>
          <div className="left-labels">
            <span>Email:</span><br/>
            <span>Phone Number:</span><br/>
          </div>
          <div className="right-assertions">
            <span><input type="text" id="email" defaultValue={profile.email}/></span><br/>
            <span><input type="text" id="phone" defaultValue={profile.phone_number}/></span><br/>
          </div>
          <hr/>
          <div className="bio">
            <textarea id="bio" defaultValue={profile.bio}/>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProfileEdit;