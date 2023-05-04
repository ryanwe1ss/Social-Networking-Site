import { useEffect, useState } from "react";
import LoadingBar from "../../components/LoadingBar/loading-bar";

import SidePanel from "../../components/SidePanel/side-panel";
import Footer from "../../components/Footer/footer";

import "./search.scss";

import {
  FetchSession,
  SearchAccounts
} from "../../utilities/utilities";

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
                    src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${account.id}`}
                    onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
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
        <Footer/>
      </div>
    );
  
  } else {
    return <LoadingBar size="large" height={15}/>
  }
}
export default Search;