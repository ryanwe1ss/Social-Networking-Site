import { useState } from "react";

import {
  ReportAccount,
  BlockAccount
} from "./../../utilities/utilities";
import "./account-settings.scss";

function AccountSettings(args)
{
  const [report, setShowReport] = useState(false);

  function HandleBlock() {
    BlockAccount(args.profileId).then(response => {
      if (response.status == 200) {
        args.HandleFetchProfile();
        args.setShowSettings(false);
      }
    });
  }

  function HandleReportAccount(reportMsg) {
    const reportBody = {
      id: args.profileId,
      message: reportMsg
    }

    ReportAccount(reportBody).then((response) => {
      if (response.status == 200) {
        document.getElementById("result").innerHTML = "Your report has been submitted.";
      
      } else if (response.status == 400) {
        document.getElementById("result").innerHTML = "Must be between 5 - 250 characters.";
      
      } else if (response.status == 429) {
        document.getElementById("result").innerHTML = "You can submit a report once every 3 hours.";
      
      } else document.getElementById("result").innerHTML = "Something went wrong.";
    });
  }

  return (
    <div className="account-settings">
      <div className="modal" id="modal">
        <div className="modal-content">
          <header>
            <h4>Account Settings</h4>
            <span onClick={() => {
              document.getElementById("modal").style.display = "none";
              args.setShowSettings(false);
              
            }} id="close">&times;</span>
          </header><hr/>

          <div className="modal-body">
            <input className="btn btn-secondary" type="button" value="Block" onClick={HandleBlock}/>
            <input className="btn btn-secondary" type="button" value="Report" onClick={() => setShowReport(true)}/>

            {report &&
              <div className="report">
                <hr/>
                <label>Why do you want to report this account?</label>
                <textarea className="form-control" id="reportMsg" placeholder="Enter your report here..."></textarea>
                <input className="btn btn-secondary" type="button" value="Submit" onClick={() => HandleReportAccount(
                  document.getElementById("reportMsg").value
                )}/>
                <div id="result"/>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountSettings;