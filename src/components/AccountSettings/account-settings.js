import { useState } from "react";

import { ReportAccount } from "./../../utilities/utilities";
import "./account-settings.scss";

function AccountSettings(args)
{
  const [report, setShowReport] = useState(false);

  function HandleReportAccount(reportMsg) {
    if (reportMsg.length < 5 || reportMsg.length > 250) {
      document.getElementById("result").innerHTML = "Must be between 5 - 250 characters.";
    
    } else {
      ReportAccount(args.profileId, reportMsg).then(() => {
        document.getElementById("result").innerHTML = "Your report has been submitted.";
      });
    }
  }

  return (
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
          <input className="btn btn-secondary" type="button" value="Block" onClick={args.HandleBlock}/>
          <input className="btn btn-secondary" type="button" value="Report" onClick={() => setShowReport(true)}/>

          {report && <div className="report">
            <hr/>
            <label>Why do you want to report this account?</label>
            <textarea className="form-control" id="reportMsg" placeholder="Enter your report here..."></textarea>
            <input className="btn btn-secondary" type="button" value="Submit" onClick={() => HandleReportAccount(
              document.getElementById("reportMsg").value
            )}/>
            <div id="result"/>
          </div>}
        </div>
      </div>
    </div>
  );
}
export default AccountSettings;