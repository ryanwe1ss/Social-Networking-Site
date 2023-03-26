import { useState, useEffect } from "react";
import {
  FetchSession,
  FetchProfile,
  FetchPicture,
  UpdateProfile,
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

function Profile()
{
  const profileId = parseInt(location.search.split("id=")[1]);

  const [picture, setPicture] = useState([]);
  const [profile, setProfile] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [saved, setSaved] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [session, setSession] = useState({
    id: null,
    username: null,
  });

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
      HandleFetchProfile();
    });
  }, []);

  function HandleFetchProfile() {
    FetchProfile(profileId).then((profile) => {
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

  function HandleUpdate() {
    const body = {
      'name': document.getElementById("name").value,
      'gender': document.getElementById("gender").value,
      'status': document.getElementById("status").value,
      'birthdate': document.getElementById("birthdate").value,
      'school': document.getElementById("school").value,
      'major': document.getElementById("major").value,
      'email': document.getElementById("email").value,
      'phone_number': document.getElementById("phone_number").value,
      'bio': document.getElementById("bio").value,
    };

    UpdateProfile(body).then((response) => {
      if (response.status === 200) {
        HandleFetchProfile();
        setEditForm(false);
        setSaved(true);
      }
    });
  }

  function HandleUpload(event) {
    UploadProfilePicture(event).then((response) => {
      if (response.status === 200) {
        setTimeout(() => {
          setRendered(false);
          HandleFetchPicture();
        }, 100);
      }
    });
  }

  function HandleFollow() {
    FollowAccount(profileId).then((response) => {
      if (response.status === 200) HandleFetchProfile();
    });
  }

  function HandleUnfollow() {
    UnfollowAccount(profileId).then((response) => {
      if (response.status === 200) HandleFetchProfile();
    })
  }

  function HandleDeleteConnection(userId, type) {
    DeleteConnection(userId, type).then((response) => {
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
    CreateChat(profileId).then((response) => {
      if (response.status === 200) {
        window.location.href = `/messages?id=${profileId}`;
      }
    });
  }

  if (session.id) {
    return (
      <div className="profile-container">
        <div className="outer-border">
          <SidePanel sessionId={session.id}/>
  
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
  
              {profile.map(account => (
                <div key={account.id}>
                  {session.id == profileId
                  ? <div className="profile-interact">
                      {
                        !editForm ?
                          <input className="btn btn-secondary btn-sm" type="button" value="Edit Profile" 
                            onClick={() => setEditForm(true)}
                          /> :
                          <span>
                            <button className="btn btn-success btn-sm" onClick={HandleUpdate}>
                              <i className="bi bi-check-lg"/>
                            </button>
                            
                            <button className="btn btn-danger btn-sm" onClick={() => setEditForm(false)}>
                              <i className="bi bi-x-lg"/>
                            </button>
                          </span>
                      }
  
                      <input id="profile-picture" onChange={HandleUpload} type="file"/>
                      <button className="btn btn-secondary btn-sm"
                        onClick={() => document.getElementById("profile-picture").click()}
                      >Edit Profile Picture
                      </button>
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
                  <div className="connection-labels" style={{pointerEvents: session.id == profileId || profile[0].is_following ? "all" : "none"}}>
                    <label onClick={HandleGetFollowers}>Followers</label>: {account.followers} |&nbsp;
                    <label onClick={HandleGetFollowing}>Following</label>: {account.following}
                  </div>
                </div>
              ))}
            </div>
  
            <div className="right-details">
              {editForm
                ? <ProfileDetails
                    edit={true}
                    saved={saved}
                    profile={profile}
                    sessionId={session.id}
                    HandleFetchProfile={HandleFetchProfile}
                    setEditForm={setEditForm}
                    setSaved={setSaved}
                  />
  
                : <ProfileDetails
                    edit={false}
                    saved={saved}
                    profile={profile}
                    sessionId={session.id}
                    HandleFetchProfile={HandleFetchProfile}
                    setEditForm={setEditForm}
                    setSaved={setSaved}
                    isDisabled={isDisabled}
                  />
              }
            </div>
  
            {showFollowers
              ? <Followers
                  sessionId={session.id}
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
                  sessionId={session.id}
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
  
  } else return <LoadingBar size="large"/>
}
export default Profile;