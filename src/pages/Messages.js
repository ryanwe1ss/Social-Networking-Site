import { Dropdown } from "semantic-ui-react"
import {
  Logout,
  RedirectPage,
} from "../utilities";

function Messages()
{
  const accountId = parseInt(localStorage.getItem("accountId"));

  return (
    <div className="block">
      <div className="border-area">
        <div className="menu">
          <h1>NetConnect</h1>
          <a href={'/'} onClick={Logout}>Logout</a>
          <a href={`/profile?id=${accountId}`}>My Profile</a>

          <Dropdown
            id="search"
            options={null}
            placeholder="Search Network"
            onChange={(event) => RedirectPage(event, searchData)}
            search
            selection
          />
          <hr/>
        </div>
      </div>
    </div>
  );
}
export default Messages;