import { useState, useEffect, useRef } from 'react';
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
} from '../../utilities/routes';

import { ShowBoxDialog } from '../../utilities/utilities';
import DefaultProfileImage from '/public/images/default-profile.png';

import ProfileDetails from './components/ProfileDetails/profile-details';
import AccountSettings from './components/AccountSettings/account-settings';
import Followers from './components/Connections/followers';
import Following from './components/Connections/following';

import LoadingBar from '../../components/LoadingBar/loading-bar';
import SidePanel from '../../components/SidePanel/side-panel';

import './profile.scss';

function Profile()
{
  const profileUsername = location.href.split('profile/')[1];

  const [session, setSession] = useState([]);
  const [picture, setPicture] = useState(null);
  const [profile, setProfile] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followingLoaded, setFollowingLoaded] = useState(false);
  const [followersLoaded, setFollowersLoaded] = useState(false);

  const [saved, setSaved] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const statusRef = useRef(null);
  const birthdateRef = useRef(null);
  const schoolRef = useRef(null);
  const majorRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const bioRef = useRef(null);
  const profilePictureRef = useRef(null);

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchProfile();
    });
  }, []);

  function HandleFetchProfile() {
    FetchProfile(profileUsername).then((profile) => {
      if (profile.length == 0 || profile.is_blocked) {
        setProfile([]);
        setPicture([]);
        setRendered(true);
        setDisabled(true);
      
      } else {
        setProfile(profile);
        HandleFetchPicture(profile);
      }
    });
  }

  function HandleFetchPicture(tempProfile) {
    FetchPicture(tempProfile ? tempProfile.id : profile.id).then(picture => {
      setPicture(picture);
      setRendered(true);
    });
  }

  function HandleUpdate() {
    const body = {
      'name':         nameRef.current.value,
      'gender':       genderRef.current.value,
      'status':       statusRef.current.value,
      'birthdate':    birthdateRef.current.value,
      'school':       schoolRef.current.value,
      'major':        majorRef.current.value,
      'email':        emailRef.current.value,
      'phone_number': phoneNumberRef.current.value,
      'bio':          bioRef.current.value,
    };

    UpdateProfile(body).then((response) => {
      if (response.status == 200) {
        HandleFetchProfile();
        setEditForm(false);
        setSaved(true);
      
      } ShowBoxDialog(response.status == 200 ? 'Your profile has been updated' : `Error: ${response.status}`);
    });
  }

  function HandleUpload(event) {
    ShowBoxDialog('Uploading profile picture...');
    UploadProfilePicture(event).then((response) => {
      if (response.status == 200) {
        setRendered(false);
        HandleFetchPicture();
      }
    });
  }

  function HandleFollow() {
    FollowAccount(profile.id).then((response) => {
      if (response.status == 200) HandleFetchProfile();
    });
  }

  function HandleUnfollow() {
    UnfollowAccount(profile.id).then((response) => {
      if (response.status == 200) HandleFetchProfile();
    })
  }

  function HandleUnblock() {
    UnblockAccount(profile.id).then(response => {
      if (response.status == 200) {
        HandleFetchProfile();
      }
    });
  }

  function HandleDeleteConnection(userId, type) {
    DeleteConnection(userId, type).then((response) => {
      if (response.status == 200) {
        HandleFetchProfile();
      }
    })
  }

  function HandleFetchFollowers() {
    setShowFollowers(true);

    FetchFollowers(profile.id).then((followers) => {
      setFollowersLoaded(true);
      setFollowers(followers);
    });
  }

  function HandleFetchFollowing() {
    setShowFollowing(true);

    FetchFollowing(profile.id).then((following) => {
      setFollowingLoaded(true);
      setFollowing(following);
    });
  }

  function HandleMessage() {
    CreateChat(profile.id).then((response) => {
      if (response.status == 200) {
        window.location.href = `/messages?chat=${response.chatId}`;
      }
    });
  }

  if (session.id) {
    return (
      <div className='profile-container'>
        <div className='outer-border'>
          <SidePanel session={session}/>
  
          <div className='profile'>
            <div className='left-details'>
              {isRendered ? 
                <img
                  src={picture}
                  onError={(img) => (img.target.src = DefaultProfileImage)}
                  className='picture'
                  alt='picture'
                /> :
                <div className='picture'>
                  <LoadingBar size='small' height={35}/>
                </div>
              } {
                <div>
                  {session.id == profile.id && session.type != 'admin' ?
                    <div className='profile-interact'>
                      {
                        !editForm ?
                          <input className='btn btn-secondary btn-sm' type='button' value='Edit Profile' 
                            onClick={() => setEditForm(true)}
                          /> :
                          <span>
                            <button className='btn btn-success btn-sm' onClick={HandleUpdate}>
                              <i className='bi bi-check-lg'/>
                            </button>
                            
                            <button className='btn btn-danger btn-sm' onClick={() => {
                              setEditForm(false);
                              setSaved(false);
                            }}>
                              <i className='bi bi-x-lg'/>
                            </button>
                          </span>
                      }
                      <input ref={profilePictureRef} onChange={HandleUpload} type='file'/>
                      <button
                        className='btn btn-secondary btn-sm'
                        onClick={() => profilePictureRef.current.click()}>Edit Profile Picture
                      </button>
                    </div> : profile.is_blocked == false && session.type != 'admin' ?
                      <div>
                        <h5>
                          <label className='username'>@{profile.username}</label>
                          <div className='interact'>
                            {profile.is_blocking == false ?
                              <div>
                                {profile.is_following ?
                                  <button className='btn btn-secondary btn-sm' onClick={HandleUnfollow}>Unfollow</button> : profile.is_requested ?
                                  <button className='btn btn-secondary btn-sm'>Requested</button> :
                                  <button className='btn btn-secondary btn-sm' onClick={HandleFollow}>Follow</button>
                                }
                                <input
                                  className='btn btn-secondary btn-sm'
                                  disabled={!profile.public_messaging && !profile.is_following}
                                  type='button'
                                  value='Message'
                                  onClick={HandleMessage}
                                />
                                <i className='bi bi-gear-fill' onClick={() => setShowSettings(true)}/>
                              </div> :
                                <input type='button' className='btn btn-secondary btn-sm' value='Unblock Account' onClick={HandleUnblock}/>
                            }
                          </div>
                        </h5>
                      </div> : null
                  }
                </div>
              }
              <div style={{display: profile.is_blocked == false ? 'block' : 'none'}}>
                <hr style={{marginTop: session.id == profile.id ? null : '5px'}}/>
                <div className='connection-labels' style={{
                  pointerEvents:
                    session.id == profile.id || session.type == 'admin' || !profile.is_private || profile.is_following
                    ? 'all'
                    : 'none'
                }}>
                  <label onClick={HandleFetchFollowers}>Followers</label>: {profile.followers} |&nbsp;
                  <label onClick={HandleFetchFollowing}>Following</label>: {profile.following}
                </div>
              </div>
            </div>
  
            <div className='right-details'>
              <ProfileDetails
                edit={editForm}
                saved={saved}
                profile={profile}
                session={session}
                setSaved={setSaved}
                isDisabled={isDisabled}

                nameRef={nameRef}
                genderRef={genderRef}
                statusRef={statusRef}
                birthdateRef={birthdateRef}
                schoolRef={schoolRef}
                majorRef={majorRef}
                emailRef={emailRef}
                phoneNumberRef={phoneNumberRef}
                bioRef={bioRef}
              />
            </div>
  
            {showFollowers
              ? <Followers
                  session={session}
                  profileId={profile.id}
                  followers={followers}
                  followersLoaded={followersLoaded}
                  setFollowers={setFollowers}
                  setShowFollowers={setShowFollowers}
                  setFollowersLoaded={setFollowersLoaded}
                  HandleFetchFollowers={HandleFetchFollowers}
                  HandleDeleteConnection={HandleDeleteConnection}
                />
              : false
            }
            {showFollowing
              ? <Following
                  session={session}
                  profileId={profile.id}
                  following={following}
                  followingLoaded={followingLoaded}
                  setFollowing={setFollowing}
                  setShowFollowing={setShowFollowing}
                  setFollowingLoaded={setFollowingLoaded}
                  HandleFetchFollowing={HandleFetchFollowing}
                  HandleDeleteConnection={HandleDeleteConnection}
                />
              : false
            }
            {showSettings
              ? <AccountSettings
                profileId={profile.id}
                setShowSettings={setShowSettings}
                HandleFetchProfile={HandleFetchProfile}
              />
            : false
            }
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size='large' height={15}/>
}
export default Profile;