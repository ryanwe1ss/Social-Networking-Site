import { useState, useEffect } from "react";
import { CheckAdminPermissions, FetchSession } from "../../../utilities/utilities";

import SidePanel from "../../../components/SidePanel/side-panel";
import Footer from "../../../components/Footer/footer";
import "./monitor-posts.scss";

function MonitorPosts()
{
  const [session, setSession] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      CheckAdminPermissions().then((permissions) => {
        setPermissions(permissions);
      })
    });
  }, []);

  if (session.id && permissions.monitor_posts_permission) {
    return (
      <div className="monitor-posts-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>
  
          <div className="monitor-posts">
            Monitor Posts
          </div>
        </div>
        <Footer/>
      </div>
    );
  
  } else {
    return (
      <div className="monitor-posts-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>

          <div className="monitor-posts">
            <i className="bi bi-lock-fill"/>&nbsp;You do not have access to view this page.
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
export default MonitorPosts;