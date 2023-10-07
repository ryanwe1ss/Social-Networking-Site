import { useState, useEffect } from "react";
import {
  FetchSession,
  CheckAdminPermissions,
  FetchProfileReports,
  FetchPostReports,
  FetchCommentReports,
  SearchReports,
} from "../../../utilities/utilities";

import ProfileReports from "./components/profile-reports";
import PostReports from "./components/post-reports";
import CommentReports from "./components/comment-reports";

import SidePanel from "../../../components/SidePanel/side-panel";
import Footer from "../../../components/Footer/footer";
import "./reports.scss";

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

  function SwitchReports(event) {
    setSelected(event.target.value);
    setReports([]);

    if (event.target.value == 1) {
      FetchProfileReports().then((reports) => {
        setReports(reports);
      });
    
    } else if (event.target.value == 2) {
      FetchPostReports().then((reports) => {
        setReports(reports);
      }); 
    
    } else if (event.target.value == 3) {
      FetchCommentReports().then((reports) => {
        setReports(reports);
      });
    }
  }

  function HandleSearchReports(event) {
    switch (parseInt(selected)) {
      case 1:
        FetchProfileReports(event.target.value).then((reports) => {
          setReports(reports);
        });
        break;

      case 2:
        FetchPostReports(event.target.value).then((reports) => {
          setReports(reports);
        });
        break;

      case 3:
        FetchCommentReports(event.target.value).then((reports) => {
          setReports(reports);
        });
        break;
    }
  }

  if (session.id && permissions.monitor_reports_permission) {
    return (
      <div className="reports-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>

          <div className="reports">
            <div className="profile">
              <div className="header">
                <h4>{selected == 1 ? 'Profile Reports' : selected == 2 ? 'Post Reports' : 'Comment Reports'}</h4>
                <div className="col-md-2">
                  <select className="form-select form-select-sm" onChange={SwitchReports}>
                    <option value="1">Profile Reports</option>
                    <option value="2">Post Reports</option>
                    <option value="3">Comment Reports</option>
                  </select>
                </div>
              </div>

              <div className="filters">
                <input type="text" className="form-control" onKeyUp={HandleSearchReports} placeholder="Search reports..."/>
              </div>

              <div className="body">
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
        <Footer/>
      </div>
    );
  
  } else {
    return (
      <div className="reports-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>

          <div className="reports">
            <i className="bi bi-lock-fill"/>&nbsp;You do not have access to view this page.
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Reports;