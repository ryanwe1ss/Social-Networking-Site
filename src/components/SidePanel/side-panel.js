import { Logout } from "../../utilities/utilities";
import "./side-panel.scss";

function SidePanel() {
  const accountId = parseInt(localStorage.getItem("accountId"));

  return (
    <div className="side-panel">
      <h2>NetConnect</h2>

      <div className="side-bar">
        <div><a href="/posts" className="bi bi-image"> Posts</a></div>
        <div><a href="/search" className="bi bi-search"> Search</a></div>
        <div><a href="/messages" className="bi bi-chat"> Messages</a></div>
        <div><a href={`/profile?id=${accountId}`} className="bi bi-person-fill"> Profile</a></div>
        <div className="bottom">
        <div><a href="/" onClick={Logout} className="bi bi-lock"> Logout</a></div>
        <div><a href="/settings" className="bi bi-gear"> Settings</a></div>
        </div>
      </div>
    </div>
  );
}
export default SidePanel;