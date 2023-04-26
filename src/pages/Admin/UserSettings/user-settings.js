import { useState, useEffect } from "react";
import { FetchSession } from "../../../utilities/utilities";

import SidePanel from "../../../components/SidePanel/side-panel";
import "./user-settings.scss";

function UserSettings()
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
      <div className="user-settings-container">
        <div className="outer-border">
          <SidePanel session={session}/>

          <div className="user-settings">
            User Settings
          </div>
        </div>
      </div>
    );
  }
}
export default UserSettings;