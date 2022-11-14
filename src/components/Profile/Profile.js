import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react"
import { ReactSession } from "react-client-session";

import DefaultProfilePicture from "../../images/profile.png";
import ProfileInformation from "./ProfileInformation";
import ProfileEdit from "./ProfileEdit";

function Profile() {
  ReactSession.setStoreType("localStorage");
  
  const username = ReactSession.get("username");
  const accountId = ReactSession.get("accountId");
  const profileId = location.search.split("id=")[1];

  const [data, setData] = useState([]);
  const [picture, setProfilePicture] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/profile?id=${profileId}`),
      fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/picture?id=${profileId}`),
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.blob()]))
    .then(([profile, picture]) => {
      setProfilePicture(URL.createObjectURL(picture));
      setData(profile);
    })
  });

  function SearchAccounts(event) {
    fetch(
      `${process.env.REACT_APP_API_URL}:
      ${process.env.REACT_APP_SERVER_PORT}
      /api/search?id=${accountId}&searchQuery=${event.target.value}`.replace(/\s/g, '')
    )
    .then((result) => { return result.json() })
    .then((data) => {
      let names = [];
      data.map(row => {
        names.push({ value: row.id, text: row.username });
      });
      setSearchData(names);
    })
  }

  function UploadProfilePicture(event) {
    let httpRequest = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("data", event.target.files[0]);
    httpRequest.open("post", `
      ${process.env.REACT_APP_API_URL}:
      ${process.env.REACT_APP_SERVER_PORT}
      /api/update?id=${profileId}&username=${username}`.replace(/\s/g, ''), false
    
    ); httpRequest.send(formData);
  }

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
            <a href={'/'} onClick={() => { ReactSession.set("accountId", null) }}>Logout</a>
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
            <hr />
          </div>

          <div className="wrapper">
            <div className="profile">
              <img
                src={picture}
                onError={(img) => (img.target.src = DefaultProfilePicture)}
                width="250"
                height="230"
                alt="profile"
              /><br />
              {accountId == profileId
                ? <div>
                  <input className="mt-2" type="button" value="Edit Profile" onClick={() => setEditForm(editForm ? false : true)} />
                  <input className="mt-1" type="file" onChange={UploadProfilePicture} />
                </div> : <h5>@{data.map(d => d.username)}</h5>}
            </div>
            {editForm
              ? <ProfileEdit GetProfile={GetProfile} setEditForm={setEditForm} data={data} />
              : <ProfileInformation data={data} />
            }
          </div>
        </div>
      </div>
    );

  } else window.location.href = "/";
}
export default Profile;