import { useState, useEffect } from "react";
import { FetchSession } from "../../utilities/utilities";
import SidePanel from "../../components/SidePanel/admin/side-panel";
import "./admin-panel.scss";

function AdminPanel()
{
  const [session, setSession] = useState({
    id: null,
    username: null,
    type: null,
  });

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });
    });
  }, []);

  if (session.type === "admin") {
    return (
      <div className="admin-panel-container">
        <div className="outer-border">
          <SidePanel/>
  
          <div className="admin-panel">
            hello
          </div>
        </div>
      </div>
    );
  }
}
export default AdminPanel;