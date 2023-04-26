import { useState, useEffect } from "react";
import { FetchSession, FetchStatistics, SearchAccounts, RedirectPage } from "../../../utilities/utilities";

import SidePanel from "../../../components/SidePanel/side-panel";
import "./statistics.scss";

function AdminPanel()
{
  const [session, setSession] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type !== "admin") return window.history.back();
      setSession({ id: session.id, username: session.username, type: session.type });

      FetchStatistics().then((statistics) => {
        if (statistics.error) return console.log("Problem Grabbing Site Statistics. Please contact your administrator.");
        setStatistics(statistics);
        HandleSearchAccounts(null);
      });
    });
  }, []);

  function HandleSearchAccounts(event) {
    SearchAccounts(event, true, true).then((result) => {
      setSearchResults(result);
      setHasSearched(true);
    });
  }

  if (session.id) {
    return (
      <div className="statistics-container">
        <div className="outer-border">
          <SidePanel session={session}/>
  
          <div className="panel">
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
              <input type="text" className="form-control" placeholder="Search for account..." onChange={HandleSearchAccounts}/>
  
              <div className="search-body">
                {searchResults.length > 0 ? searchResults.map((account) => (
                  <div onClick={() => RedirectPage(account.id)} className="account" id="profile-page" key={account.id}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${account.id}`}
                      onError={(img) => (img.target.src = DefaultProfilePicture)}
                      alt="thumbnail"
                    />
                    <label>{account.username}</label>
                  </div>
                
                )) : (
                  <div className="no-results">
                    <label>{hasSearched ? "No results found" : null}</label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminPanel;