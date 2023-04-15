import { useState, useEffect } from "react";
import {
  FetchSession,
  FetchNotifications,
  AcceptFollowRequest,
  DeclineFollowRequest
} from "../../utilities/utilities";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/user/side-panel";
import "./notifications.scss";

function Notifications()
{
  const [session, setSession] = useState([]);
  const [followRequests, setFollowRequests] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") window.location.href = "/admin";
      
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleGetNotifications();
    });
  }, []);

  function HandleGetNotifications() {
    FetchNotifications().then((notifications) => {
      setFollowRequests(notifications);

      notifications.forEach(notification => {
        const time = new Date(notification.date_created).getTime() - new Date().getTime();
        const days = Math.ceil(time / (1000 * 3600 * 24));
        notification.days = Math.abs(days) == 0 ? "today" : Math.abs(days) + " days ago";
      });
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
          <SidePanel sessionId={session.id}/>

          <div className="notifications">
            <div className="notifications-header">
              <h1>Notifications</h1>
              <hr/>
            </div>

            <div>
              {followRequests.length > 0 ? followRequests.map((request) => (
                <div className="notification" key={request.id}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${request.follower.id}`}
                    onError={(img) => (img.target.src = DefaultProfilePicture)}
                    className="thumbnail"
                    alt="thumbnail"
                  />
                  {request.accepted ? (
                    <>
                      You have accepted&nbsp;
                      <a href={`/profile?id=${request.follower.id}`} className="username">{request.follower.username}'s</a>
                      &nbsp;request to follow you

                      <div className="timestamp">
                        <label>{new Date(request.date_created).toLocaleString()}</label>
                      </div>
                    </>
                  ) : request.declined ? (
                    <>
                      You have declined&nbsp;
                      <a href={`/profile?id=${request.follower.id}`} className="username">{request.follower.username}'s</a>
                      &nbsp;request to follow you

                      <div className="timestamp">
                        <label>{new Date(request.date_created).toLocaleString()}</label>
                      </div>
                    </>
                  ) : (
                    <>
                      <a href={`/profile?id=${request.follower.id}`} className="username">{request.follower.username}</a>
                      <label className="message">requested to follow you · {request.days}</label>

                      <div className="buttons">
                        <button className="btn btn-success btn-sm accept" onClick={() => HandleAcceptFollow(request.id, request.follower.id)}>Accept</button>
                        <button className="btn btn-danger btn-sm decline" onClick={() => HandleDeclineFollow(request.id, request.follower.id)}>Decline</button>
                      </div>
                    </>
                  )}
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