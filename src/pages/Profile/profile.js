import { useState, useEffect } from "react";
import {
  FetchProfile,
  FetchPicture,
  SearchAccounts,
  UploadProfilePicture,
  FollowAccount,
  UnfollowAccount,
  RemoveConnection,
  CreateChat,
  GetFollowers,
  GetFollowing,
  Logout,
  RedirectPage,
} from "../../utilities/utilities";

import DefaultProfilePicture from "../../images/default.png";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import Followers from "../../components/Connections/Followers";
import Following from "../../components/Connections/Following";
import "./profile.scss";

function Profile() {
  const accountId = parseInt(localStorage.getItem("accountId"));
  const profileId = parseInt(location.search.split("id=")[1]);

  const [profileData, setProfile] = useState([]);
  const [picture, setPicture] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [editForm, setEditForm] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isRendered, setRendered] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    HandleFetchProfile();
    SearchAccounts(null, accountId).then((result) => {
      setSearchData(result);
    });
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

  function HandleRemoveConnection(userId, type) {
    RemoveConnection(accountId, userId, type).then((response) => {
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

        <div className="side-panel">
          <h2>NetConnect</h2>

          <div className="side-bar">
            <div><a href="/posts" className="bi bi-image"> Posts</a></div>
            <div><a href="/search" className="bi bi-search"> Search</a></div>
            <div><a href="/messages" className="bi bi-chat"> Messages</a></div>
            <div><a href={`/profile?id=${accountId}`} className="bi bi-person-fill"> Profile</a></div>
            <div><a href="/settings" className="bi bi-gear"> Settings</a></div>
            <div><a href="/" onClick={Logout} className="bi bi-lock"> Logout</a></div>
          </div>
        </div>

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
                <div className="tiny-spinner"/>
              </div>
            }

            {profileData.map(account => (
              <div key={account.id}>
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
                      <input
                        className="message"
                        type="button"
                        value="Message"
                        onClick={HandleMessage}
                      />
                    </div>
                  </h5>
                }
                <hr/>
                <div className="connection-labels">
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
                HandleGetFollowing={HandleGetFollowing}
                HandleRemoveConnection={HandleRemoveConnection}
              />
            : false
          }
        </div>
      </div>
    </div>
  );

  /*
  return (
    <div className="block">
      <div className="border-area">
        <div className="menu">
          <h1>NetConnect</h1>
          <a href={'/'} onClick={Logout}>Logout</a>
          <a href={'/messages'}>Direct Messages</a>
          {accountId !== profileId ? <a href={`/profile?id=${accountId}`}>My Profile</a> : false}

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

            {isRendered ? 
              <img
                src={picture}
                onError={(img) => (img.target.src = DefaultProfilePicture)}
                className="picture"
                alt="picture"
              /> :
              <div className="picture">
                <div className="tiny-spinner"/>
              </div>
            }

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
                      <input
                        className="message"
                        type="button"
                        value="Message"
                        onClick={HandleMessage}
                      />
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
            ? <ProfileEdit HandleFetchProfile={HandleFetchProfile} setEditForm={setEditForm} profileData={profileData}/>
            : <ProfileInformation profileData={profileData} isDisabled={isDisabled}/>
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
                HandleGetFollowing={HandleGetFollowing}
                HandleRemoveConnection={HandleRemoveConnection}
              />
            : false
          }
        </div>
        <Footer/>
      </div>
    </div>
  );
  */
}
export default Profile;