import { useState, useEffect } from "react";
import {
  FetchSession,
  FetchNotifications,
  AcceptFollowRequest,
  DeclineFollowRequest
} from "../../utilities/utilities";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import "./notifications.scss";

function Notifications()
{
  const [session, setSession] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") window.location.href = "/statistics";
      
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleGetNotifications();
    });
  }, []);

  function HandleGetNotifications() {
    FetchNotifications().then((notifications) => {
      notifications[0].concat(notifications[1]).forEach(notification => {
        const time = new Date(notification.date_created).getTime() - new Date().getTime();
        const seconds = Math.abs(Math.floor(time / 1000));
        const minutes = Math.abs(Math.floor(seconds / 60));
        const hours = Math.abs(Math.floor(minutes / 60));
        const days = Math.abs(Math.floor(hours / 24));
        const weeks = Math.abs(Math.floor(days / 7));
        const months = Math.abs(Math.floor(days / 30));
        const years = Math.abs(Math.floor(days / 365));
        
        if (seconds < 60) {
          notification.date = seconds > 1 ? seconds + " seconds ago" : "just now";
        } else if (minutes < 60) {
          notification.date = minutes > 1 ? minutes + " minutes ago" : "1 minute ago";
        } else if (hours < 24) {
          notification.date = hours > 1 ? hours + " hours ago" : "1 hour ago";
        } else if (weeks < 4) {
          notification.date = weeks > 1 ? weeks + " weeks ago" : "1 week ago";
        } else if (months >= 1 && months < 12) {
          notification.date = months > 1 ? months + " months ago" : "1 month ago";
        } else if (years >= 1) {
          notification.date = years > 1 ? years + " years ago" : "1 year ago";
        }
      });

      const combinedNotifications = [...notifications[0], ...notifications[1]];
      combinedNotifications.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
      combinedNotifications.forEach((notification) => {
        if (notification.follower) {
          notification.tag = "follow_request";
        } else if (notification.commenter) {
          notification.tag = "comment";
        }
      });

      setNotifications(combinedNotifications);
      console.log(combinedNotifications);
    });
  }

  function HandleAcceptFollow(id, followerId) {
    AcceptFollowRequest(id, followerId).then((response) => {
      if (response.status == 200) {
        HandleGetNotifications();
      }
    });
  }

  function HandleDeclineFollow(id, followerId) {
    DeclineFollowRequest(id, followerId).then((response) => {
      if (response.status == 200) {
        HandleGetNotifications();
      }
    });
  }

  if (session.id && session.type === "user") {
    return (
      <div className="notifications-container">
        <div className="outer-border">
          <SidePanel session={session}/>

          <div className="notifications">
            <div className="notifications-header">
              <h1>Notifications</h1>
              <hr/>
            </div>

            <div>
              {notifications.length > 0 ? notifications.map((notification) => (
                <div key={notification.id}>
                  {notification.tag == "follow_request" ?
                  <div className="notification">
                    <img
                      src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${notification.follower.id}`}
                      onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                      className="thumbnail"
                      alt="thumbnail"
                    />
                    {notification.accepted ? (
                      <>
                        You have accepted&nbsp;
                        <a href={`/profile?id=${notification.follower.id}`} className="username">{notification.follower.username}'s</a>
                        &nbsp;request to follow you
                        <label className="timestamp">· {notification.date}</label>
                      </>
                    ) : notification.declined ? (
                      <>
                        You have declined&nbsp;
                        <a href={`/profile?id=${notification.follower.id}`} className="username">{notification.follower.username}'s</a>
                        &nbsp;request to follow you
                        <label className="timestamp">· {notification.date}</label>
                      </>
                    ) : (
                      <>
                        <a href={`/profile?id=${notification.follower.id}`} className="username">{notification.follower.username}</a>
                        <label className="timestamp">requested to follow you · {notification.date}</label>

                        <div className="buttons">
                          <button className="btn btn-success btn-sm accept" onClick={() => HandleAcceptFollow(notification.id, notification.follower.id)}>Accept</button>
                          <button className="btn btn-danger btn-sm decline" onClick={() => HandleDeclineFollow(notification.id, notification.follower.id)}>Decline</button>
                        </div>
                      </>
                    )}
                  </div> :
                  <div className="notification">
                    <img
                      src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${notification.commenter.id}`}
                      onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                      className="thumbnail"
                      alt="thumbnail"
                    />
                    
                    <a href={`/profile?id=${notification.commenter.id}&post=${notification.post.id}`} className="username">{notification.commenter.username}</a>
                    &nbsp;commented on your post:<div className="comment">{notification.comment}</div>
                    <label className="timestamp">· {notification.date}</label>

                    <a href={`/post?id=${notification.post.account.id}&post=${notification.post.id}`} className="post">
                      <img
                        src={`data:image/jpeg;base64,${notification.post.image}`}
                        onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                        alt="post"
                      />
                    </a>
                  </div>
                  }
                </div>
              )) :
                <div className="no-notifications">
                  <center>You have 0 notifications</center>
                </div>
              }
            </div>

          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Notifications;