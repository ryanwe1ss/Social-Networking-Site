import { useEffect, useState } from "react";

function ProfileEdit(props)
{
  const [data, setData] = useState([]);
  const profileId = location.search.split("id=")[1];

  function UpdateProfile(name, gender, status, birthdate, school, concentration, email, phone_number, bio) {
    const details = {
      "id": profileId,
      "name": name,
      "gender": gender,
      "status": status,
      "birthdate": birthdate,
      "school": school,
      "concentration": concentration,
      "email": email,
      "phone_number": phone_number,
      "bio": bio,
    }

    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/update`, {
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
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/profile?id=${profileId}`)
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
      <input type="button" onClick={() => UpdateProfile(
        document.getElementById("name").value,
        document.getElementById("gender").value,
        document.getElementById("status").value,
        document.getElementById("birthdate").value,
        document.getElementById("school").value,
        document.getElementById("concentration").value,
        document.getElementById("email").value,
        document.getElementById("phone_number").value,
        document.getElementById("bio").value,

      )} style={{float: "right"}} value="Update"/>

      {data.map(profile => (
        <div key={"profile"}>
          <h6>Account Information</h6>
          <div className="left-labels">
            <span>Name:</span><br/>
            <span>Member Since:</span><br/>
            <span>Last Updated:</span><br/>
          </div>
          <div className="right-assertions">
            <span><input type="text" id="name" defaultValue={profile.name}/></span><br/>
            <span>{new Date(profile.date_created).toLocaleString()}</span><br/>
            <span>{new Date(profile.date_updated).toLocaleString()}</span><br/>
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
              <select id="gender" defaultValue={profile.gender}>
                <option>Male</option>
                <option>Female</option>
              </select><br/></span>
            <span>
              <select id="status" defaultValue={profile.status}>
                <option>Single</option>
                <option>In Relationship</option>
              </select><br/></span>
            <span>
              <input type="date" id="birthdate" defaultValue={new Date(
                profile.birthdate).toISOString().replace(/T.*/,'').split('-').join('-')}
              /><br/>
            </span>
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
            <span><input type="text" id="phone_number" defaultValue={profile.phone_number}/></span><br/>
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