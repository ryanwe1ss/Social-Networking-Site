import { useState, useRef } from 'react';

import './account-settings.scss';
import {
  ReportAccount,
  BlockAccount
} from '../../../../utilities/routes';

function AccountSettings(args)
{
  const reportMessageRef = useRef(null);
  const [report, setShowReport] = useState(false);
  const [response, setResponse] = useState(null);

  function HandleBlock() {
    BlockAccount(args.profileId).then(response => {
      if (response.status == 200) {
        args.HandleFetchProfile();
        args.setShowSettings(false);
      }
    });
  }

  async function HandleReportAccount() {
    const response = await ReportAccount({
      id: args.profileId,
      message: reportMessageRef.current.value,
    });
    
    switch (response.status)
    {
      case 200:
        setResponse('Your report has been submitted.');
        break;
      case 400:
        setResponse('Must be between 5 - 250 characters.');
        break;
      case 429:
        setResponse('You can submit a report once every 3 hours.');
        break;
      default:
        setResponse('Something went wrong.');
        break;
    }
  }

  return (
    <div className='account-settings'>
      <div className='modal'>
        <div className='modal-content'>
          <header>
            <h4>Account Settings</h4>
            <span onClick={() => args.setShowSettings(false)} className='close'>&times;</span>
          </header><hr/>

          <div className='modal-body'>
            <input className='btn btn-secondary' type='button' value='Block' onClick={HandleBlock}/>
            <input className='btn btn-secondary' type='button' value='Report' onClick={() => setShowReport(true)}/>

            {report &&
              <div className='report'>
                <hr/>
                <label>Why do you want to report this account?</label>
                <textarea className='form-control' ref={reportMessageRef} placeholder='Enter your report here...'></textarea>
                <input className='btn btn-secondary' type='button' value='Submit' onClick={HandleReportAccount}/>
                <div id='result'>{response}</div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountSettings;