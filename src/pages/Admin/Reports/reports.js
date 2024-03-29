import { useState, useEffect } from 'react';
import {
  FetchSession,
  CheckAdminPermissions,
  FetchProfileReports,
  FetchPostReports,
  FetchCommentReports,
} from '../../../utilities/routes';

import ProfileReports from './components/profile-reports';
import PostReports from './components/post-reports';
import CommentReports from './components/comment-reports';

import SidePanel from '../../../components/SidePanel/side-panel';
import './reports.scss';

function Reports()
{
  const [permissions, setPermissions] = useState([]);
  const [session, setSession] = useState([]);
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type != 'admin') return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      CheckAdminPermissions().then((permissions) => {
        setPermissions(permissions);
        
        FetchProfileReports().then((reports) => {
          setReports(reports);
        });
      });
    });
  }, []);

  async function SwitchReports(event) {
    setSelected(event.target.value);
    setReports([]);

    const reportFunction = event.target.value == 1 ? FetchProfileReports : event.target.value == 2 ? FetchPostReports : FetchCommentReports;
    const reports = await reportFunction();
    setReports(reports);
  }

  async function HandleSearchReports(event) {
    const reportFunction = selected == 1 ? FetchProfileReports : selected == 2 ? FetchPostReports : FetchCommentReports;
    const reports = await reportFunction(event.target.value);
    setReports(reports);
  }

  if (session.id && permissions.monitor_reports_permission) {
    return (
      <div className='reports-container'>
        <div className='outer-border'>
          <SidePanel session={session} permissions={permissions}/>

          <div className='reports'>
            <div className='profile'>
              <div className='header'>
                <h4>{selected == 1 ? 'Profile Reports' : selected == 2 ? 'Post Reports' : 'Comment Reports'}</h4>
                <div className='col-md-2'>
                  <select className='form-select form-select-sm' onChange={SwitchReports}>
                    <option value='1'>Profile Reports</option>
                    <option value='2'>Post Reports</option>
                    <option value='3'>Comment Reports</option>
                  </select>
                </div>
              </div>

              <div className='filters'>
                <input type='text' className='form-control' onKeyUp={HandleSearchReports} placeholder='Search reports...'/>
              </div>

              <div className='body'>
                {selected == 1 ?
                  <ProfileReports reports={reports}/> :
                 selected == 2 ?
                  <PostReports reports={reports}/> :
                 selected == 3 ?
                  <CommentReports reports={reports}/> :
                 null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  } else {
    return (
      <div className='reports-container'>
        <div className='outer-border'>
          <SidePanel session={session} permissions={permissions}/>

          <div className='reports'>
            <i className='bi bi-lock-fill'/>&nbsp;You do not have access to view this page.
          </div>
        </div>
      </div>
    );
  }
}
export default Reports;