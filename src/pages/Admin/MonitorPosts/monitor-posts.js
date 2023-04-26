import { useState, useEffect } from "react";
import { FetchSession } from "../../../utilities/utilities";

import SidePanel from "../../../components/SidePanel/side-panel";
import "./monitor-posts.scss";

function MonitorPosts()
{
  const [session, setSession] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });
    });
  }, []);

  if (session.id) {
    return (
      <div className="monitor-posts-container">
        <div className="outer-border">
          <SidePanel session={session}/>
  
          <div className="monitor-posts">
            Monitor Posts
          </div>
        </div>
      </div>
    );
  }
}
export default MonitorPosts;