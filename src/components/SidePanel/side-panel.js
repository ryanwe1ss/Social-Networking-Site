import { useEffect, useState } from "react";
import { CheckAdminPermissions, FetchNotifications, Logout } from "../../utilities/utilities";
import "./side-panel.scss";

function SidePanel(args)
{
  if (args.session.type === "admin") {
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
      CheckAdminPermissions().then((permissions) => {
        setPermissions(permissions);
        console.log(permissions);
      });
    }, []);

    return (
      <div className="side-panel">
        <img src={`${process.env.PUBLIC_URL}/images/sidepanel-logo.png`} alt="logo" />
  
        <div className="side-bar">
          <div><a href="/statistics" className="bi bi-activity"> Statistics</a></div>
          <div><a href="/monitor-posts" className="bi bi-binoculars-fill"> Monitor Posts</a></div>
          <div><a href="/user-settings" className="bi bi-person-fill-gear"> User Settings</a></div>
          <div><a href="/reports" className="bi bi-flag-fill"> Reports</a></div>
  
          <div className="bottom">
            <div><a href="/" onClick={Logout} className="bi bi-lock"> Logout</a></div>
          </div>
        </div>
      </div>
    );
  
  } else if (args.session.type === "user") {
    const [notification, setNotificationCount] = useState([]);

    useEffect(() => {
      FetchNotifications(true).then((notifications) => {
        setNotificationCount(notifications);
      });
    }, []);

    return (
      <div className="side-panel">
        <img src={`${process.env.PUBLIC_URL}/images/sidepanel-logo.png`} alt="logo" />

        <div className="side-bar">
          <div><a href="/feed" className="bi bi-image"> Feed</a></div>
          <div><a href="/search" className="bi bi-search"> Search</a></div>
          <div><a href="/messages" className="bi bi-chat"> Messages</a></div>
          <div>
            <a href="/notifications" className="bi bi-bell notification"> Notifications
              <span className="badge" style={{display: notification.count == 0 ? "none" : "block"}}>{notification.count}</span>
            </a>
          </div>
          <div><a href={`/profile?id=${args.session.id}`} className="bi bi-person-fill"> Profile</a></div>
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