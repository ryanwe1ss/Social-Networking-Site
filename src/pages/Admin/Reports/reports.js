import { useState, useEffect } from "react";
import { FetchSession, CheckAdminPermissions, FetchProfileReports, FetchPostReports } from "../../../utilities/utilities";

import SidePanel from "../../../components/SidePanel/side-panel";
import Footer from "../../../components/Footer/footer";
import "./reports.scss";

function Reports()
{
  const [session, setSession] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [profileReports, setProfileReports] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      CheckAdminPermissions().then((permissions) => {
        setPermissions(permissions);

        FetchProfileReports().then((profileReports) => {
          setProfileReports(profileReports);
          console.log(profileReports);
        });
      });
    });
  }, []);

  if (session.id && permissions.monitor_reports_permission) {
    return (
      <div className="reports-container">
        <div className="outer-border">
          <SidePanel session={session} permissions={permissions}/>

          <div className="reports">
            <div className="profile">
              <div className="header">
                <h4>Profile Reports</h4>
              </div>

              <input type="text" className="form-control" placeholder="Search for profile reports..."/>
              <div className="body">
                <table>
                  <thead>
                    <tr>
                      <th>Reporter</th>
                      <th>Reported</th>
                      <th>Reason</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileReports.map((report) => (
                      <tr key={report.id}>
                        <td className="reporter">
                          <a href={`/profile/${report.reporter.id}`}>{report.reporter.username}</a>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="report-type-selection">
              <div className="header">
                <h4>Post Reports</h4>
              </div>

              <input type="text" className="form-control" placeholder="Search for post reports..."/>
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