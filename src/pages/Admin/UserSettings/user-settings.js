import { useState, useEffect } from "react";
import { CheckAdminPermissions, FetchSession } from "../../../utilities/utilities";

import SidePanel from "../../../components/SidePanel/side-panel";
import Footer from "../../../components/Footer/footer";
import "./user-settings.scss";

function UserSettings()
{
  const [session, setSession] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      CheckAdminPermissions().then((permissions) => {
        setPermissions(permissions);
      });
    });
  }, []);

  if (session.id && permissions.modify_accounts_permission) {
    return (
      <div className="user-settings-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>

          <div className="user-settings">
            User Settings
          </div>
        </div>
        <Footer/>
      </div>
    );
  
  } else {
    return (
      <div className="user-settings-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>

          <div className="user-settings">
            <i className="bi bi-lock-fill"/>&nbsp;You do not have access to view this page.
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
export default UserSettings;