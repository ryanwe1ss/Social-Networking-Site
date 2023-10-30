import { useEffect, useState, useRef } from 'react';
import { FetchReportReasons, ReportComment } from '../../../utilities/routes';

function ReportCommentModal(args)
{
  const reasonRef = useRef(null);
  const additionalInformationRef = useRef(null);

  const [reasons, setReasons] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    FetchReportReasons().then((reasons) => {
      setReasons(reasons); 
    });
  }, []);

  async function HandleReportComment() {
    const reportBody = {
      reportedId: args.comment.commenter.id,
      commentId: args.comment.id,
      reason: reasonRef.current.value,
      additionalInformation: additionalInformationRef.current.value,
    }

    if (reasonRef.current.value != 'default') {
      const reportResponse = await ReportComment(reportBody);
      switch (reportResponse.status)
      {
        case 200:
          setResponse('Your report has been submitted.');
          break;
        case 400:
          setResponse('Problem Occurred. Please try again later.');
          break;
        case 429:
          setResponse('You can submit a report once every 3 hours.');
          break;
        default:
          setResponse('Something went wrong.');
          break;
      }
    
    } else setResponse('Please select a reason.');
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <header>
          <h4>Report Comment</h4>
          <span onClick={() => args.setShowReportCommentModal(false)} className='close'>&times;</span>
        </header><hr/>

        <div className='report-body'>
          <label>Reason</label>
          <select ref={reasonRef} defaultValue={'default'}>
            <option disabled hidden value='default'>Select a reason...</option>
            
            {reasons.map((reason) => {
              return <option key={reason.id} value={reason.id}>{reason.reason}</option>
            })}
          </select><br/>
          
          <label>Additional Information</label>
          <textarea ref={additionalInformationRef} placeholder='Additional information...'/>
        </div>

        <input type='button' className='btn btn-primary' value='Submit' onClick={HandleReportComment}/>
        <div className='result'>{response}</div>
      </div>
    </div>
  );
}
export default ReportCommentModal;