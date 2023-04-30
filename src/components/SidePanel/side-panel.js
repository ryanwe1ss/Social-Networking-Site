import { useEffect, useState } from "react";
import { FetchNotifications, Logout } from "../../utilities/utilities";
import "./side-panel.scss";

function SidePanel(args)
{
  if (args.session.type === "admin") {
    return (
      <div className="side-panel">
        <img src={`${process.env.PUBLIC_URL}/images/sidepanel-logo.png`} alt="logo" />
  
        <div className="side-bar">
          <div>
            <a href="/statistics" className="bi bi-activity"> Statistics</a>
          </div>
          <div>
            {args.permissions.monitor_posts_permission ?
              <a href="/monitor-posts" className="bi bi-binoculars-fill"> Monitor Posts</a> :
              <a className="bi bi-binoculars-fill disabled"> Monitor Posts</a>
            }
          </div>
          <div>
            {args.permissions.modify_accounts_permission ?
              <a href="/user-settings" className="bi bi-person-fill-gear"> User Settings</a> :
              <a className="bi bi-person-fill-gear disabled"> User Settings</a>
            }
          </div>
          <div>
            {args.permissions.monitor_reports_permission ?
              <a href="/reports" className="bi bi-flag-fill"> Reports</a> :
              <a className="bi bi-flag-fill disabled"> Reports</a>
            }
          </div>
  
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
          <div><a href="/saved-posts" className="bi bi-bookmark"> Saved Posts</a></div>
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