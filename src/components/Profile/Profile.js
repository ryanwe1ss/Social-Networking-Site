import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react"
import {
  FetchProfile,
  SearchAccounts,
  UploadProfilePicture,
  FollowAccount,
  UnfollowAccount,
  RemoveConnection,
  GetFollowers,
  GetFollowing,
  Logout,
  RedirectPage,
} from "../../utilities";

import DefaultProfilePicture from "../../images/default.png";
import ProfileInformation from "./ProfileInformation";
import ProfileEdit from "./ProfileEdit";
import Followers from "../Connections/Followers";
import Following from "../Connections/Following";
import Footer from "../Footer/Footer";

function Profile() {
  const accountId = parseInt(localStorage.getItem("accountId"));
  const profileId = parseInt(location.search.split("id=")[1]);

  const [profileData, setProfile] = useState([]);
  const [picture, setPicture] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [editForm, setEditForm] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    FetchProfile(accountId, profileId).then((result) => {
      setProfile(result.profile);
      setPicture(result.picture);
    });
    SearchAccounts(null, accountId).then((result) => {
      setSearchData(result);
    });
  }, []);

  function HandleFetch() {
    FetchProfile(accountId, profileId).then((result) => {
      setProfile(result.profile);
      setPicture(result.picture);
    });
  }

  function HandleUpload(event) {
    const httpRequest = UploadProfilePicture(event, accountId);
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
        setTimeout(() => HandleFetch(), 1000);
      }
    }
  }

  function HandleFollow() {
    FollowAccount(accountId, profileId).then((response) => {
      if (response.status === 200) HandleFetch();
    });
  }

  function HandleUnfollow() {
    UnfollowAccount(accountId, profileId).then((response) => {
      if (response.status === 200) HandleFetch();
    })
  }

  function HandleRemoveConnection(userId, type) {
    RemoveConnection(accountId, userId, type).then((response) => {
      if (response.status === 200) {
        HandleFetch();
      }
    })
  }

  function HandleGetFollowers() {
    GetFollowers(profileId).then((followers) => {
      setFollowers(followers);
      setShowFollowers(true);
    });
  }

  function HandleGetFollowing() {
    GetFollowing(profileId).then((following) => {
      setFollowing(following);
      setShowFollowing(true);
    });
  }

  return (
    <div className="block">
      <div className="border-area">
        <div className="menu">
          <h1>NetConnect</h1>
          <a href={'/'} onClick={Logout}>Logout</a>
          <a href={`/profile?id=${accountId}`}>Direct Messages</a>
          <a href={`/profile?id=${accountId}`}>My Profile</a>

          <Dropdown
            id="search"
            options={searchData}
            placeholder="Search Network"
            onKeyUp={(event) => {
              SearchAccounts(event, accountId).then((query) => {
                setSearchData(query);
              });
            }}
            onChange={(event) => RedirectPage(event, searchData)}
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
                    <input className="mt-1" type="file" onChange={HandleUpload}/>
                  </div> :
                  <h5>
                    <label className="username">{account.username}</label>
                    <div>
                      {account.is_following ?
                        <input className="follow" type="button" value="Unfollow" onClick={HandleUnfollow}/> :
                        <input className="follow" type="button" value="Follow" onClick={HandleFollow}/>
                      }
                      <input className="message" type="button" value="Message"/>
                    </div>
                  </h5>
                }
                <hr/>
                <div className="interactions">
                  <label onClick={HandleGetFollowers}>Followers</label>: {account.followers} |&nbsp;
                  <label onClick={HandleGetFollowing}>Following</label>: {account.following}
                </div>
              </div>
            ))}
          </div>
          {editForm
            ? <ProfileEdit HandleFetch={HandleFetch} setEditForm={setEditForm} profileData={profileData}/>
            : <ProfileInformation profileData={profileData}/>
          }
          {showFollowers
            ? <Followers
                accountId={accountId}
                profileId={profileId}
                followers={followers}
                setShowFollowers={setShowFollowers}
                HandleGetFollowers={HandleGetFollowers}
                HandleRemoveConnection={HandleRemoveConnection}
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
                HandleRemoveConnection={HandleRemoveConnection}
              />
            : false
          }
        </div>
        <Footer/>
      </div>
    </div>
  );
}
export default Profile;