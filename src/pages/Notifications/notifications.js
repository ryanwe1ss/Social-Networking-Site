import { useState, useEffect } from "react";
import {
  FetchSession,
  FetchNotifications,
  AcceptFollowRequest,
  DeclineFollowRequest
} from "../../utilities/utilities";

import FollowRequests from "./components/FollowRequests";
import Comments from "./components/Comments";
import Likes from "./components/Likes";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import Footer from "../../components/Footer/footer";

import "./notifications.scss";

function Notifications()
{
  const [session, setSession] = useState([]);
  const [loaded, setLoaded] = useState(false);
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
      let key = 0;

      notifications[0].concat(notifications[1], notifications[2]).forEach(notification => {
        const time = new Date(notification.date_created).getTime() - new Date().getTime();
        const seconds = Math.abs(Math.floor(time / 1000));
        const minutes = Math.abs(Math.floor(seconds / 60));
        const hours = Math.abs(Math.floor(minutes / 60));
        const days = Math.abs(Math.floor(hours / 24));
        const weeks = Math.abs(Math.floor(days / 7));
        const months = Math.abs(Math.floor(days / 30));
        const years = Math.abs(Math.floor(days / 365));
        
        if (seconds < 60) {
          notification.date = seconds > 1 ? seconds + " seconds ago" : "1 second ago";
        } else if (minutes < 60) {
          notification.date = minutes > 1 ? minutes + " minutes ago" : "1 minute ago";
        } else if (hours < 24) {
          notification.date = hours > 1 ? hours + " hours ago" : "1 hour ago";
        } else if (days < 7) {
          notification.date = days > 1 ? days + " days ago" : "1 day ago";
        } else if (weeks < 4) {
          notification.date = weeks > 1 ? weeks + " weeks ago" : "1 week ago";
        } else if (months < 12) {
          notification.date = months > 1 ? months + " months ago" : "1 month ago";
        } else {
          notification.date = years > 1 ? years + " years ago" : "1 year ago";
        }

        notification.key = key;
        key++;
      });

      const combinedNotifications = [...notifications[0], ...notifications[1], ...notifications[2]];
      combinedNotifications.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
      combinedNotifications.forEach((notification) => {
        if (notification.follower) {
          notification.tag = "follow_request";
        } else if (notification.commenter) {
          notification.tag = "comment";
        } else if (notification.liker) {
          notification.tag = "like";
        }
      });

      setNotifications(combinedNotifications);
      setLoaded(true);
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
              <h1>Your Notifications</h1>
              <hr/>
            </div>

            {loaded ? 
              <div>
                {notifications.length > 0 ? notifications.map((notification) => (
                  <div key={notification.key}>
                    {
                    notification.tag == "follow_request" ?
                      <FollowRequests notification={notification} HandleAcceptFollow={HandleAcceptFollow} HandleDeclineFollow={HandleDeclineFollow}/>
                    : notification.tag == "comment" ?
                      <Comments notification={notification}/>
                    : notification.tag == "like" ?
                      <Likes notification={notification}/>
                    : null
                    }
                  </div>
                )) :
                  <div className="no-notifications">
                    <center>You have 0 notifications</center>
                  </div>
                }
              </div> : <LoadingBar size="large" height={15}/>
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default Notifications;