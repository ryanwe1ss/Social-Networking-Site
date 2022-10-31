import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react"
import { ReactSession } from "react-client-session";

import DefaultProfilePicture from "../../images/profile.png";
import ProfileInformation from "./ProfileInformation";
import ProfileEdit from "./ProfileEdit";

function Profile()
{
  ReactSession.setStoreType("localStorage");
  const accountId = ReactSession.get("accountId");
  const profileId = location.search.split("id=")[1];

  const [data, setData] = useState([]);
  const [picture, setProfilePicture] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [editForm, setEditForm] = useState(false);

  function GetProfile() {
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

  function SearchAccounts(event) {
    let searchQuery = event ? event.target.value : "";
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/search?id=${accountId}&searchQuery=${searchQuery}`)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then((data) => {
      let names = [];
      data.map(element => {
        names.push({value: element.id, text: element.name});
      });
      setSearchData(names);
    })
  }

  function UploadProfilePicture(event) {
    let httpRequest = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("data", event.target.files[0]);
    httpRequest.open("post", `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/update?id=${profileId}`, false);
    httpRequest.send(formData);
  }

  function GetProfilePicture() 
  {
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
  useEffect(GetProfile, []);
  useEffect(SearchAccounts, []);

  function RedirectPage(event) {
    if (event.target.innerText.length > 0) {
      let accountId = searchData.find(n => n.text == event.target.innerText).value;
      window.location.href = `/profile?id=${accountId}`;
    }
  }

  if (accountId) {
    return (
      <div className="block">
        <div className="border-area">
          <div className="menu">
            <h1>NetConnect</h1>
            <a href={`/profile?id=${accountId}`}>Direct Messages</a>
            <a href={`/profile?id=${accountId}`}>My Profile</a>
  
            <Dropdown
              id="search"
              options={searchData}
              placeholder="Search Network"
              onKeyUp={SearchAccounts}
              onChange={RedirectPage}
              search
              selection
            />
            <hr/>
          </div>
          
          <div className="wrapper">
            <div className="profile">
              <img
                src={picture}
                onError={(img) => (img.target.src = DefaultProfilePicture)}
                width="250"
                height="230"
                alt="profile"
              /><br/>
              {accountId == profileId
              ? <div>
                  <input className="mt-2" type="button" value="Edit Profile" onClick={() => setEditForm(editForm ? false:true)}/>
                  <input className="mt-1" type="file" onChange={UploadProfilePicture}/>
                </div> : <h5>{data.map(d => d.name)}'s Profile</h5>}
            </div>
            {editForm
              ? <ProfileEdit GetProfile={GetProfile} setEditForm={setEditForm} data={data}/>
              : <ProfileInformation data={data}/>
            }
          </div>
        </div>
      </div>
    );
  
  } else window.location.href = "/";
}
export default Profile;