import { useState, useEffect } from "react";
import { FetchSession, CheckAdminPermissions, FetchProfileReports, FetchPostReports } from "../../../utilities/utilities";

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

    if (selected == 1) {
      FetchPostReports().then((reports) => {
        setPostReports(reports);
      }); 
    }
    else {
      FetchProfileReports().then((reports) => {
        setProfileReports(reports);
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
                <h4>{selected == 1 ? 'Profile Reports' : 'Post Reports'}</h4>
                <div className="col-md-2">
                  <select className="form-select form-select-sm" onChange={SwitchReports}>
                    <option hidden>Select Reports Category</option>
                    <option value="1">Profile Reports</option>
                    <option value="2">Post Reports</option>
                    <option value="3">Comment Reports</option>
                  </select>
                </div>

                {/* <button className="btn btn-primary btn-sm" onClick={SwitchReports}>{selected == 1 ? 'Switch to Post Reports' : 'Switch to Profile Reports'}</button> */}
              </div>

              <div className="filters">
                <input type="text" className="form-control" placeholder="Search reports..."/>
                <button className="btn btn-secondary"><i className="bi bi-arrow-clockwise"/></button>
              </div>

              <div className="body">
                {selected == 1 ?
                  <table>
                    <thead>
                      <tr>
                        <th>Reporter</th>
                        <th>Account</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileReports.map((report) => (
                        <tr key={report.id}>
                          <td className="reporter">
                            <a href={`/profile/${report.reporter.username}`}>{report.reporter.username}</a>
                          </td>
                          <td className="reported">
                            <a href={`/profile/${report.reported.username}`}>{report.reported.username}</a>
                          </td>
                          <td className="reason">
                            {report.message}
                          </td>
                          <td className="date">
                            {new Date(report.date_created).toLocaleString()}
                          </td>
                          <td className="actions">
                            <button className="btn btn-warning btn-sm"><i className="bi bi-trash"/></button>
                            <button className="btn btn-danger btn-sm"><i className="bi bi-person-lock"/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  :
                  <table>
                    <thead>
                      <tr>
                        <th>Reporter</th>
                        <th>Post</th>
                        <th>Reason</th>
                        <th>Additional Information</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postReports.map((report) => (
                        <tr key={report.id}>
                          <td className="reporter">
                            <a href={`/profile/${report.reporter.username}`}>{report.reporter.username}</a>
                          </td>
                          <td className="post">
                            <a href={`/post?id=${report.post.id}&post=${report.post.post_id}`}>{report.post.post_id}</a>
                          </td>
                          <td className="reason">
                            {report.reason}
                          </td>
                          <td className="additional-information">
                            {report.additional_information}
                          </td>
                          <td className="date">
                            {new Date(report.date_created).toLocaleString()}
                          </td>
                          <td className="actions">
                            <button className="btn btn-warning btn-sm"><i className="bi bi-trash"/></button>
                            <button className="btn btn-danger btn-sm"><i className="bi bi-person-lock"/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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