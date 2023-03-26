import React, { useEffect, useState } from "react";

import DefaultProfilePicture from "../../images/default.png"
import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./search.scss";

import {
  FetchSession,
  RedirectPage,
  SearchAccounts
} from "../../utilities/utilities";

function Search() {

  const [session, setSession] = useState({
    id: null,
    username: null,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
    });
  }, []);

  if (session.id) {
    return (
      <div className="search-container">
        <div className="outer-border">
          <SidePanel/>
  
          <div className="search-content">
            <div className="search-header">
              <input type="text" className="form-control" onChange={() => {
                SearchAccounts(event, session.id).then((result) => {
                  setSearchResults(result);
                  setHasSearched(true);
                });
  
              }} placeholder="Search" autoFocus={true}/>
            </div>
  
            <div className="search-results">
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
    );
  
  } else {
    return <LoadingBar size="large"/>
  }
}
export default Search;