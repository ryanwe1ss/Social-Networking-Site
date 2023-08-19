import { useState, useEffect } from "react";
import {
  FetchSession,
  CheckAdminPermissions,
  FetchProfileReports,
  FetchPostReports,
  FetchCommentReports,
} from "../../../utilities/utilities";

import ProfileReports from "./components/profile-reports";
import PostReports from "./components/post-reports";
import CommentReports from "./components/comment-reports";

import SidePanel from "../../../components/SidePanel/side-panel";
import Footer from "../../../components/Footer/footer";
import "./reports.scss";

function Reports()
{
  const [session, setSession] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState(1);

  const [profileReports, setProfileReports] = useState([]);
  const [postReports, setPostReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      CheckAdminPermissions().then((permissions) => {
        setPermissions(permissions);
        
        FetchProfileReports().then((reports) => {
          setProfileReports(reports);
        });
      });
    });
  }, []);

  function SwitchReports(event) {
    setSelected(event.target.value);

    if (event.target.value == 1) {
      FetchProfileReports().then((reports) => {
        setProfileReports(reports);
      });
    
    } else if (event.target.value == 2) {
      FetchPostReports().then((reports) => {
        setPostReports(reports);
      }); 
    
    } else if (event.target.value == 3) {
      FetchCommentReports().then((reports) => {
        setCommentReports(reports);
      });
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
                <input type="text" className="form-control" placeholder="Search reports..."/>
                <button className="btn btn-secondary"><i className="bi bi-arrow-clockwise"/></button>
              </div>

              <div className="body">
                {selected == 1 ?
                  <ProfileReports profileReports={profileReports}/> :
                 selected == 2 ?
                  <PostReports postReports={postReports}/> :
                 selected == 3 ?
                  <CommentReports commentReports={commentReports}/> :
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