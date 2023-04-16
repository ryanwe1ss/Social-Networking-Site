import { useState, useEffect } from "react";
import { FetchSession, FetchStatistics } from "../../utilities/utilities";

import SidePanel from "../../components/SidePanel/admin/side-panel";
import "./admin-panel.scss";

function AdminPanel()
{
  const [session, setSession] = useState([]);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      FetchStatistics().then((statistics) => {
        if (statistics.error) return console.log("Error Grabbing Statistics. Please contact your administrator.");
        setStatistics(statistics);
        console.log(statistics);
      });
    });
  }, []);

  if (session.type === "admin") {
    return (
      <div className="admin-panel-container">
        <div className="outer-border">
          <SidePanel/>
  
          <div className="admin-panel">
            <div className="statistics">
              <div className="statistics-header">
                <h4>Social Network Statistics</h4>
              </div>

              <div className="statistics-body">
                Total Visits: <label>{statistics.total_logins}</label><hr/>
                Total Users: <label>{statistics.total_accounts}</label><hr/>
                Total Chats: <label>{statistics.total_chats}</label><hr/>
                Total Messages Sent: <label>{statistics.total_messages_sent}</label><hr/>
                Total Posts: <label>{statistics.total_posts}</label><hr/>
                Total Comments: <label>{statistics.total_comments}</label><hr/>
                Total Likes: <label>{statistics.total_likes}</label><hr/>
                Total Connections: <label>{statistics.total_connections}</label><hr/>
                Total Reports: <label>{statistics.total_reports}</label><hr/>

                <div className="first-user">
                  First User Registered On <br/>{new Date(statistics.first_user_created).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="search">
              <div className="search-body">
                <input type="text" className="form-control" placeholder="Search for account..."/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminPanel;