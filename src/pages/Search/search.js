import { useEffect, useState } from "react";
import { thumbnailUrl } from "../../utilities/routes";
import DefaultProfileImage from "/public/images/default-profile.png";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import "./search.scss";

import {
  FetchSession,
  SearchAccounts
} from "../../utilities/routes";

function Search()
{
  const [session, setSession] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") window.location.href = "/statistics";
      setSession({ id: session.id, username: session.username, type: session.type });
    });
  }, []);

  if (session.id && session.type === "user") {
    return (
      <div className="search-container">
        <div className="outer-border">
          <SidePanel session={session}/>
  
          <div className="search-content">
            <div className="search-header">
              <input type="text" className="form-control" onChange={() => {
                SearchAccounts(event).then((result) => {
                  setSearchResults(result);
                  setHasSearched(true);
                });
  
              }} placeholder="Search" autoFocus={true}/>
            </div>
  
            <div className="search-results">
              {searchResults.length > 0 ? searchResults.map((account) => (
                <a href={`/profile/${account.username}`} className="account" id="profile-page" key={account.id}>
                  <img
                    src={`${thumbnailUrl}/fs-api/thumbnail/${account.id}`}
                    onError={(img) => (img.target.src = DefaultProfileImage)}
                    alt="thumbnail"
                  />
                  <label>{account.username}</label>
                </a>
              
              )) : (
                <div className="no-results">
                  <label>{hasSearched ? "No results found" : null}</label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  
  } else {
    return <LoadingBar size="large" height={15}/>
  }
}
export default Search;