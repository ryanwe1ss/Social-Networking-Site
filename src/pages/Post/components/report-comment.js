import { useEffect, useState } from "react";
import { FetchReportReasons, ReportComment } from "../../../utilities/utilities";

function ReportCommentModal(args)
{
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    FetchReportReasons().then((reasons) => {
      setReasons(reasons); 
    });
  }, []);

  function HandleReportComment(reason, additionalInformation) {
    const reportBody = {
      reportedId: args.comment.commenter.id,
      commentId: args.comment.id,
      reason: reason,
      additionalInformation: additionalInformation,
    }

    if (reason !== "default") {
      ReportComment(reportBody).then((response) => {
        if (response.status == 200) {
          document.getElementById("result").innerHTML = "Your report has been submitted.";
        
        } else if (response.status == 400) {
          document.getElementById("result").innerHTML = "Problem Occurred. Please try again later.";
        
        } else if (response.status == 429) {
          document.getElementById("result").innerHTML = "You can submit a report once every 3 hours.";
        
        } else document.getElementById("result").innerHTML = "Something went wrong.";
      });
    
    } else document.getElementById("result").innerHTML = "Please select a reason.";
  }

  return (
    <div id="report-modal" className="modal">
      <div className="modal-content">
        <header>
          <h4>Report Comment</h4>
          <span onClick={() => args.setShowReportCommentModal(false)} id="close">&times;</span>
        </header><hr/>

        <div className="report-body">
          <label>Reason</label>
          <select id="reason" defaultValue={'default'}>
            <option disabled hidden value="default">Select a reason...</option>
            {reasons.map((reason) => {
              return <option key={reason.id} value={reason.id}>{reason.reason}</option>
            })}
          </select><br/>
          
          <label>Additional Information</label>
          <textarea placeholder="Additional information..."/>
        </div>

        <input type="button" className="btn btn-primary" value="Submit" onClick={() => {
          HandleReportComment(
            document.getElementById("reason").value,
            document.getElementsByTagName("textarea")[0].value
          )
        }}/>
        <div id="result"/>
      </div>
    </div>
  );
}
export default ReportCommentModal;