import { useState, useEffect } from "react";
import {
  FetchSession,
  FetchNotifications,
} from "../../utilities/utilities";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import "./notifications.scss";

function Notifications()
{
  const [session, setSession] = useState([]);
  const [followRequests, setFollowRequests] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
      HandleGetNotifications();
    });
  }, []);

  function HandleGetNotifications() {
    FetchNotifications().then((notifications) => {
      setFollowRequests(notifications);
      console.log(notifications);
    });
  }

  if (session.id) {
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
                {followRequests.map((request) => (
                  <div className="notification" key={request.id}>
                    
                  </div>
                ))}
              </div>

            </div>
          </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Notifications;