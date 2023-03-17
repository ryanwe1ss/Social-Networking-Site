import { useState, useEffect } from "react";
import {
  FetchProfile,
  FetchPicture,
  UploadProfilePicture,
  FollowAccount,
  UnfollowAccount,
  DeleteConnection,
  CreateChat,
  GetFollowers,
  GetFollowing,
} from "../../utilities/utilities";

import DefaultProfilePicture from "../../images/default.png";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import Followers from "../../components/Connections/Followers";
import Following from "../../components/Connections/Following";
import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./profile.scss";

function Profile() {
  const accountId = parseInt(localStorage.getItem("accountId"));
  const profileId = parseInt(location.search.split("id=")[1]);

  const [profileData, setProfile] = useState([]);
  const [picture, setPicture] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [editForm, setEditForm] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    HandleFetchProfile();
  }, []);

  function HandleFetchProfile() {
    FetchProfile(accountId, profileId).then((profile) => {
      if (!profile) {
        setProfile([]);
        setPicture([]);
        setRendered(true);
        setDisabled(true);
      
      } else {
        setProfile(profile);
        HandleFetchPicture();
      }
    });
  }

  function HandleFetchPicture() {
    FetchPicture(profileId).then((picture) => {
      setPicture(picture);
      setRendered(true);
    })
  }

  function HandleUpload(event) {
    UploadProfilePicture(event, accountId).then((response) => {
      if (response.status === 200) {
        setTimeout(() => {
          setRendered(false);
          HandleFetchPicture();
        }, 100);
      }
    });
  }

  function HandleFollow() {
    FollowAccount(accountId, profileId).then((response) => {
      if (response.status === 200) HandleFetchProfile();
    });
  }

  function HandleUnfollow() {
    UnfollowAccount(accountId, profileId).then((response) => {
      if (response.status === 200) HandleFetchProfile();
    })
  }

  function HandleDeleteConnection(userId, type) {
    DeleteConnection(accountId, userId, type).then((response) => {
      if (response.status === 200) {
        HandleFetchProfile();
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

  function HandleMessage() {
    CreateChat(accountId, profileId).then((response) => {
      if (response.status === 200) {
        window.location.href = `/messages?id=${profileId}`;
      }
    });
  }

  return (
    <div className="profile-container">
      <div className="outer-border">
        <SidePanel/>

        <div className="profile">
          <div className="left-details">
            {isRendered ? 
              <img
                src={picture}
                onError={(img) => (img.target.src = DefaultProfilePicture)}
                className="picture"
                alt="picture"
              /> :
              <div className="picture">
                <LoadingBar size="small"/>
              </div>
            }

            {profileData.map(account => (
              <div key={account.id}>
                {accountId == profileId
                ? <div className="profile-interact">
                    <input className="btn btn-secondary btn-sm" type="button" value="Edit Profile" onClick={() => setEditForm(editForm ? false : true)}/>
                    <input id="profile-picture" onChange={HandleUpload} type="file"/>
                    <button className="btn btn-secondary btn-sm" onClick={() => document.getElementById("profile-picture").click()}>Edit Profile Picture</button>
                  </div> :
                  <h5>
                    <label className="username">{account.username}</label>
                    <div className="interact">
                      {account.is_following ?
                        <button className="btn btn-secondary btn-sm" onClick={HandleUnfollow}>Unfollow</button> :
                        <button className="btn btn-secondary btn-sm" onClick={HandleFollow}>Follow</button>
                      }
                      <input
                        className="btn btn-secondary btn-sm"
                        type="button"
                        value="Message"
                        onClick={HandleMessage}
                      />
                    </div>
                  </h5>
                }
                <hr/>
                <div className="connection-labels" style={{pointerEvents: accountId == profileId || profileData[0].is_following ? "all" : "none"}}>
                  <label onClick={HandleGetFollowers}>Followers</label>: {account.followers} |&nbsp;
                  <label onClick={HandleGetFollowing}>Following</label>: {account.following}
                </div>
              </div>
            ))}
          </div>

          <div className="right-details">
            {editForm
              ? <ProfileDetails
                  edit={true} profileData={profileData}
                  HandleFetchProfile={HandleFetchProfile} setEditForm={setEditForm}/>

              : <ProfileDetails
                edit={false} profileData={profileData} HandleFetchProfile={HandleFetchProfile}
                setEditForm={setEditForm} isDisabled={isDisabled}/>
            }
          </div>

          {showFollowers
            ? <Followers
                accountId={accountId}
                profileId={profileId}
                followers={followers}
                setShowFollowers={setShowFollowers}
                HandleGetFollowers={HandleGetFollowers}
                HandleDeleteConnection={HandleDeleteConnection}
              />
            : false
          }
          {showFollowing
            ? <Following
                accountId={accountId}
                profileId={profileId}
                following={following}
                setShowFollowing={setShowFollowing}
                HandleGetFollowing={HandleGetFollowing}
                HandleDeleteConnection={HandleDeleteConnection}
              />
            : false
          }
        </div>
      </div>
    </div>
  );
}
export default Profile;