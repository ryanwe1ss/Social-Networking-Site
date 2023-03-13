import React, { useState } from "react";
import DefaultProfilePicture from "../../images/default.png"
import SidePanel from "../../components/SidePanel/side-panel";
import "./search.scss";

import {
  RedirectPage,
  SearchAccounts
} from "../../utilities/utilities";

function Search() {
  const accountId = parseInt(localStorage.getItem("accountId"));
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="search-container">
      <div className="outer-border">
        <SidePanel/>

        <div className="search-content">
          <div className="search-header">
            <input type="text" className="form-control" onChange={() => {
              SearchAccounts(event, accountId).then((result) => {
                setSearchResults(result);
                setHasSearched(true);
              });

            }} placeholder="Search" />
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
}
export default Search;