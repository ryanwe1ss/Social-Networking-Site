import React, { useEffect, useState } from "react";
import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./settings.scss";

import BlockedUsers from "./components/BlockedUsers";
import UsernameChange from "./components/UsernameChange";
import PasswordChange from "./components/PasswordChange";
import GeneralSettings from "./components/GeneralSettings";
import ManageAccount from "./components/ManageAccount";

import {
  FetchSession,
  FetchProfile,
  FetchBlocked,
  UpdateUsername,
  UpdatePassword,
} from "../../utilities/routes";

function Settings()
{
  const [session, setSession] = useState([]);
  const [rendered, setRendered] = useState(false);
  
  const [selected, setSelected] = useState(1);
  const [component, setComponent] = useState(1);

  const [blocked, setBlocked] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") window.location.href = "/statistics";

      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchProfile(session.username);
      HandleFetchBlocked();
    });
  }, []);

  function HandleFetchProfile(username) {
    FetchProfile(username).then(account => {
      setAccount(account);
      setRendered(true);
    });
  }

  function HandleFetchBlocked() {
    FetchBlocked().then(users => {
      setBlocked(users);
    });
  }

  function HandleUpdateCredential(type) {
    const Update = type == "Username" ? UpdateUsername : UpdatePassword;

    Update(document.getElementById(`new${type}`).value).then(response => {
      document.getElementById("result").style.color = "#000000";
      
      switch (response.status) {
        case 200:
          document.getElementById("result").style.color = "#00D21C";
          document.getElementById("result").innerHTML = `Your ${type.toLowerCase()} has been successfully updated`;
          document.getElementById(`new${type}`).value = null;
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

  function RenderComponent(id) {
    setComponent(id);
    setSelected(id);
  }

  if (rendered && session.id && session.type === "user") {
    return (
      <div className="settings-container">
        <div className="outer-border">
          <SidePanel session={session}/>
  
          <div className="settings">
            <div className="settings-panel">
              <label onClick={() => { RenderComponent(1) }} className={selected == 1 ? "active" : null}>General Settings</label>
              <label onClick={() => { RenderComponent(2) }} className={selected == 2 ? "active" : null}>Username Change</label>
              <label onClick={() => { RenderComponent(3) }} className={selected == 3 ? "active" : null}>Password Change</label>
              <label onClick={() => { RenderComponent(4) }} className={selected == 4 ? "active" : null}>Blocked Users</label>
              <label onClick={() => { RenderComponent(5) }} className={selected == 5 ? "active" : null}>Manage Account</label>
            </div>
  
            <div className="settings-block">
              {
                component === 1 ? <GeneralSettings account={account}/> :
                component === 2 ? <UsernameChange HandleUpdateCredential={HandleUpdateCredential} account={account}/> :
                component === 3 ? <PasswordChange HandleUpdateCredential={HandleUpdateCredential} account={account}/> :
                component === 4 ? <BlockedUsers HandleFetchBlocked={HandleFetchBlocked} blocked={blocked}/> :
                component === 5 ? <ManageAccount/> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default Settings;