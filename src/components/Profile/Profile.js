import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react"

import DefaultProfilePicture from "../../images/default.png";
import ProfileInformation from "./ProfileInformation";
import ProfileEdit from "./ProfileEdit";
import Followers from "../Followers/Followers";
import Following from "../Following/Following.js";
import Footer from "../Footer/Footer.js";

function Profile() {
  const username = localStorage.getItem("username");
  const accountId = parseInt(localStorage.getItem("accountId"));
  const profileId = parseInt(location.search.split("id=")[1]);

  const [profileData, setProfileData] = useState([]);
  const [picture, setProfilePicture] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [editForm, setEditForm] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    FetchProfile();
    SearchAccounts();
  }, []);

  function FetchProfile() {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/profile?id=${accountId}&profileId=${profileId}`)
    .then((result) => {
      return result.json();
    })
    .then((profileData) => {
      if (profileData.length !== 0) {
        profileData.map(a => a.username = "@" + a.username)
        setProfileData(profileData);

        fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/picture?id=${profileId}`)
        .then((result) => { return result.blob() })
        .then((picture) => {
          setProfilePicture(URL.createObjectURL(picture));
        });
      }
    });
  }

  function SearchAccounts(event) {
    let searchQuery = event ? event.target.value : "";
    fetch(
      `${process.env.REACT_APP_API_URL}:
      ${process.env.REACT_APP_SERVER_PORT}
      /api/search?id=${accountId}&searchQuery=${searchQuery}`.replace(/\s/g, '')
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

  function FollowAccount() {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/follow?id=${accountId}&profileId=${profileId}`)
    .then((result) => {
      return result.text();
    })
    .then((response) => {
      if (response === "success") {
        FetchProfile();
      }
    });
  }

  function UnfollowAccount(id=null) {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/unfollow?id=${accountId}&profileId=${id ? id : profileId}`)
    .then((result) => {
      return result.text();
    })
    .then((response) => {
      if (response === "success") {
        FetchProfile();
      }
    });
  }

  function GetFollowers() {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/followers?id=${profileId}`)
    .then((result) => {
      return result.json();
    })
    .then((followers) => {
      setFollowers(followers);
      setShowFollowers(true);
    });
  }

  function GetFollowing() {
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/following?id=${profileId}&profileId=${profileId}`)
    .then((result) => {
      return result.json();
    })
    .then((following) => {
      setFollowing(following);
      setShowFollowing(true);
    });
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
            <a href={'/'} onClick={() => { localStorage.clear() }}>Logout</a>
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
                className="picture"
                alt="picture"
              />
              {profileData.map(account => (
                <div className="details" key={account.id}>
                  {accountId == profileId
                  ? <div>
                      <input className="mt-2" type="button" value="Edit Profile" onClick={() => setEditForm(editForm ? false : true)}/>
                      <input className="mt-1" type="file" onChange={UploadProfilePicture}/>
                    </div> :
                    <h5>
                      <label className="username">{account.username}</label>
                      <input className="message" type="button" value="Message"/>
                      {account.is_following ?
                        <input className="follow" type="button" value="Unfollow" onClick={() => UnfollowAccount()}/> :
                        <input className="follow" type="button" value="Follow" onClick={FollowAccount}/>
                      }
                    </h5>
                  }
                  <hr/>
                  <div className="interactions">
                    <label onClick={GetFollowers}>Followers</label>: {account.followers} |&nbsp;
                    <label onClick={GetFollowing}>Following</label>: {account.following}
                  </div>
                </div>
              ))}
            </div>
            {editForm
              ? <ProfileEdit FetchProfile={FetchProfile} setEditForm={setEditForm} profileData={profileData} />
              : <ProfileInformation profileData={profileData} />
            }
            {showFollowers
              ? <Followers
                  accountId={accountId}
                  profileId={profileId}
                  followers={followers}
                  setShowFollowers={setShowFollowers}
                  GetFollowers={GetFollowers}
                  FollowAccount={FollowAccount}
                />
              : false
            }
            {showFollowing
              ? <Following
                  accountId={accountId}
                  profileId={profileId}
                  following={following}
                  setShowFollowing={setShowFollowing}
                  GetFollowing={GetFollowing}
                  UnfollowAccount={UnfollowAccount}
                />
              : false
            }
          </div>
          <Footer/>
        </div>
      </div>
    );

  } else window.location.href = "/";
}
export default Profile;