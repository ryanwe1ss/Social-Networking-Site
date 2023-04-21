import { useEffect, useState } from "react";
import { FetchNotifications, Logout } from "../../utilities/utilities";
import "./side-panel.scss";

function SidePanel(args)
{
  const [notification, setNotificationCount] = useState([]);

  useEffect(() => {
    FetchNotifications(true).then((notifications) => {
      setNotificationCount(notifications);
    });
  }, []);

  if (args.type === "admin") {
    return (
      <div className="side-panel">
        <img src={`${process.env.PUBLIC_URL}/images/sidepanel-logo.png`} alt="logo" />
  
        <div className="side-bar">
          <div><a href="/admin" className="bi bi-activity"> Statistics</a></div>
          <div><a href="/monitor-posts" className="bi bi-binoculars-fill"> Monitor Posts</a></div>
          <div><a href="/user-settings" className="bi bi-person-fill-gear"> User Settings</a></div>
          <div><a href="/reports" className="bi bi-flag-fill"> Reports</a></div>
  
          <div className="bottom">
            <div><a href="/" onClick={Logout} className="bi bi-lock"> Logout</a></div>
          </div>
        </div>
      </div>
    );
  
  } else if (args.type === "user") {
    return (
      <div className="side-panel">
        <img src={`${process.env.PUBLIC_URL}/images/sidepanel-logo.png`} alt="logo" />

        <div className="side-bar">
          <div><a href="/posts" className="bi bi-image"> Feed</a></div>
          <div><a href="/search" className="bi bi-search"> Search</a></div>
          <div><a href="/messages" className="bi bi-chat"> Messages</a></div>
          <div>
            <a href="/notifications" className="bi bi-bell notification"> Notifications
              <span className="badge" style={{display: notification.count == 0 ? "none" : "block"}}>{notification.count}</span>
            </a>
          </div>
          <div><a href={`/profile?id=${args.sessionId}`} className="bi bi-person-fill"> Profile</a></div>
          <div className="bottom">
            <div><a href="/" onClick={Logout} className="bi bi-lock"> Logout</a></div>
            <div><a href="/settings" className="bi bi-gear"> Settings</a></div>
          </div>
        </div>
      </div>
    );
  }
}
export default SidePanel;