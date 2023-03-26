import React, { useEffect, useState } from "react";

import SidePanel from "../../components/SidePanel/side-panel";
import UsernameChange from "./components/UsernameChange";
import PrivacySettings from "./components/PrivacySettings";
import { FetchProfile, UpdatePrivacy, UpdateUsername } from "../../utilities/utilities";
import "./settings.scss";

function Settings() {

  const accountId = parseInt(localStorage.getItem("accountId"));
  const [isPrivate, setPrivate] = useState(false);
  const [option, setOption] = useState(1);

  useEffect(() => {
    FetchProfile(accountId, accountId).then(data => {
      if (data[0].is_private) setPrivate(true);
    });
  }, []);

  function UpdateAccountType(type) {
    UpdatePrivacy(accountId, type).then(data => {
      if (data.status === 200) {
        setPrivate(!isPrivate);
      }
    });
  }

  function UpdateAccountUsername() {
    UpdateUsername(accountId, document.getElementById("newUsername").value).then(data => {
      document.getElementById("result").style.color = "red";
      
      switch (data.status) {
        case 200:
          document.getElementById("result").style.color = "green";
          document.getElementById("result").innerHTML = "Username updated successfully";
          break;

        case 409:
          document.getElementById("result").innerHTML = "Username already exists";
          break;

        case 400:
          document.getElementById("result").innerHTML = "Username must be between 5 and 12 characters";
          break;

        default:
          document.getElementById("result").innerHTML = "Error Updating Username, try again";
      }
    });
  }

  return (
    <div className="settings-container">
      <div className="outer-border">
        <SidePanel/>

        <div className="settings">
          <div className="settings-panel">
            <label onClick={() => { setOption(1) }}>Privacy Settings</label>
            <label onClick={() => { setOption(2) }}>Username Change</label>
            <label>Password Change</label>
            <label>Blocked Users</label>
            <label>Deactivate Account</label>
          </div>

          <div className="settings-block">
            {
              option === 1 ? <PrivacySettings UpdateAccountType={UpdateAccountType} isPrivate={isPrivate}/> :
              option === 2 ? <UsernameChange UpdateAccountUsername={UpdateAccountUsername}/> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;