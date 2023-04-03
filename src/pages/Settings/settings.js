import React, { useEffect, useState } from "react";

import SidePanel from "../../components/SidePanel/side-panel";
import UsernameChange from "./components/UsernameChange";
import PrivacySettings from "./components/PrivacySettings";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./settings.scss";

import {
  FetchProfile,
  FetchSession,
  UpdatePrivacy,
  UpdateUsername,
  UpdatePassword,
} from "../../utilities/utilities";
import PasswordChange from "./components/PasswordChange";

function Settings() {

  const [isPrivate, setPrivate] = useState(false);
  const [component, setComponent] = useState(1);
  const [account, setAccount] = useState([]);

  const [session, setSession] = useState({
    id: null,
    username: null,
  });

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
      
      FetchProfile(session.id).then(account => {
        setAccount(account[0]);
        if (account[0].is_private) setPrivate(true);
      });
    });
  }, []);

  function UpdateAccountType(type) {
    UpdatePrivacy(type).then(response => {
      if (response.status === 200) {
        setPrivate(!isPrivate);
      }
    });
  }

  function UpdateCredential(type) {
    const Update = type === "Username" ? UpdateUsername : UpdatePassword;

    Update(document.getElementById(`new${type}`).value).then(response => {
      document.getElementById("result").style.color = "#000000";
      
      switch (response.status) {
        case 200:
          document.getElementById("result").style.color = "#00D21C";
          document.getElementById("result").innerHTML = `Your ${type.toLowerCase()} has been successfully updated`;
          break;

        case 409:
          document.getElementById("result").innerHTML = `${type} already exists`;
          break;

        case 400:
          document.getElementById("result").innerHTML = `${type} must be between 5 and 12 characters`;
          break;

        default:
          document.getElementById("result").innerHTML = `Error Updating ${type}, try again`;
      }
    });
  }

  if (session.id) {
    return (
      <div className="settings-container">
        <div className="outer-border">
          <SidePanel sessionId={session.id}/>
  
          <div className="settings">
            <div className="settings-panel">
              <label onClick={() => { setComponent(1) }}>Privacy Settings</label>
              <label onClick={() => { setComponent(2) }}>Username Change</label>
              <label onClick={() => { setComponent(3) }}>Password Change</label>
              <label>Blocked Users</label>
              <label>Deactivate Account</label>
            </div>
  
            <div className="settings-block">
              {
                component === 1 ? <PrivacySettings UpdateAccountType={UpdateAccountType} isPrivate={isPrivate}/> :
                component === 2 ? <UsernameChange UpdateCredential={UpdateCredential} account={account}/> :
                component === 3 ? <PasswordChange UpdateCredential={UpdateCredential} account={account}/> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Settings;