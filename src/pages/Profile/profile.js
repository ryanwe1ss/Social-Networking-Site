import { useState, useEffect } from "react";
import {
  FetchSession,
  FetchProfile,
  FetchPicture,
  UnblockAccount,
  UpdateProfile,
  UploadProfilePicture,
  FollowAccount,
  UnfollowAccount,
  DeleteConnection,
  CreateChat,
  FetchFollowers,
  FetchFollowing,
} from "../../utilities/utilities";

import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import AccountSettings from "../../components/AccountSettings/account-settings";
import Followers from "../../components/Connections/Followers";
import Following from "../../components/Connections/Following";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import Footer from "../../components/Footer/footer";

import "./profile.scss";

function Profile()
{
  const popup = document.querySelector(".popup-box");
  const profileId = parseInt(location.search.split("id=")[1]);

  const [session, setSession] = useState([]);
  const [picture, setPicture] = useState([]);
  const [profile, setProfile] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [saved, setSaved] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchProfile();
    });
  }, []);

  function HandleFetchProfile() {
    FetchProfile(profileId).then((profile) => {
      if (profile.length == 0 || profile.is_blocked) {
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

        popup.style.display = "block";
        popup.innerHTML = "Your profile has been updated!";
        setTimeout(() => { document.querySelector(".popup-box").style.display = "none"; }, 6000);
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

  function HandleUnblock() {
    UnblockAccount(profileId).then(response => {
      if (response.status == 200) {
        HandleFetchProfile();
      }
    });
  }

  function HandleDeleteConnection(userId, type) {
    DeleteConnection(userId, type).then((response) => {
      if (response.status === 200) {
        HandleFetchProfile();
      }
    })
  }

  function HandleFetchFollowers() {
    FetchFollowers(profileId).then((followers) => {
      setFollowers(followers);
      setShowFollowers(true);
    });
  }

  function HandleFetchFollowing() {
    FetchFollowing(profileId).then((following) => {
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
          <SidePanel session={session}/>
  
          <div className="profile">
            <div className="left-details">
              {isRendered ? 
                <img
                  src={picture}
                  onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                  className="picture"
                  alt="picture"
                /> :
                <div className="picture">
                  <LoadingBar size="small" height={35}/>
                </div>
              } {
                <div>
                  {session.id == profileId && session.type != "admin" ?
                    <div className="profile-interact">
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
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => document.getElementById("profile-picture").click()}>Edit Profile Picture
                      </button>
                    </div> : profile.is_blocked == false && session.type != "admin" ?
                      <div>
                        <h5>
                          <label className="username">@{profile.username}</label>
                          <div className="interact">
                            {profile.is_blocking == false ?
                              <div>
                                {profile.is_following ?
                                  <button className="btn btn-secondary btn-sm" onClick={HandleUnfollow}>Unfollow</button> : profile.is_requested ?
                                  <button className="btn btn-secondary btn-sm">Requested</button> :
                                  <button className="btn btn-secondary btn-sm" onClick={HandleFollow}>Follow</button>
                                }
                                <input
                                  className="btn btn-secondary btn-sm"
                                  type="button"
                                  value="Message"
                                  onClick={HandleMessage}
                                />
                                <i className="bi bi-gear-fill" onClick={() => setShowSettings(true)}/>
                              </div> :
                                <input type="button" className="btn btn-secondary btn-sm" value="Unblock Account" onClick={() => {
                                  HandleUnblock();
                                }}/>
                            }
                          </div>
                        </h5>
                      </div> : null
                  }
                </div>
              }
              <div style={{display: profile.is_blocked == false ? "block" : "none"}}>
                <hr style={{marginTop: session.id == profileId ? null : "5px"}}/>
                <div className="connection-labels" style={{
                  pointerEvents:
                    session.id == profileId || session.type == "admin" || !profile.is_private || profile.is_following
                    ? "all"
                    : "none"
                }}>
                  <label onClick={HandleFetchFollowers}>Followers</label>: {profile.followers} |&nbsp;
                  <label onClick={HandleFetchFollowing}>Following</label>: {profile.following}
                </div>
              </div>
            </div>
  
            <div className="right-details">
              {editForm
                ? <ProfileDetails
                    edit={true}
                    saved={saved}
                    profile={profile}
                    session={session}
                    HandleFetchProfile={HandleFetchProfile}
                    setEditForm={setEditForm}
                    setSaved={setSaved}
                  />
  
                : <ProfileDetails
                    edit={false}
                    saved={saved}
                    profile={profile}
                    session={session}
                    HandleFetchProfile={HandleFetchProfile}
                    setEditForm={setEditForm}
                    setSaved={setSaved}
                    isDisabled={isDisabled}
                  />
              }
            </div>
  
            {showFollowers
              ? <Followers
                  session={session}
                  profileId={profileId}
                  followers={followers}
                  setShowFollowers={setShowFollowers}
                  HandleFetchFollowers={HandleFetchFollowers}
                  HandleDeleteConnection={HandleDeleteConnection}
                />
              : false
            }
            {showFollowing
              ? <Following
                  session={session}
                  profileId={profileId}
                  following={following}
                  setShowFollowing={setShowFollowing}
                  HandleFetchFollowing={HandleFetchFollowing}
                  HandleDeleteConnection={HandleDeleteConnection}
                />
              : false
            }
            {showSettings
              ? <AccountSettings
                profileId={profileId}
                setShowSettings={setShowSettings}
                HandleFetchProfile={HandleFetchProfile}
              />
            : false
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default Profile;