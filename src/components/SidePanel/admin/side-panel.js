import { Logout } from "../../../utilities/utilities";
import "./../side-panel.scss";

function SidePanel() {

  return (
    <div className="side-panel">
      <img src={`${process.env.PUBLIC_URL}/images/sidepanel-logo.png`} alt="logo" />

      <div className="side-bar">
        <div><a href="/monitor-posts" className="bi bi-image"> Monitor Posts</a></div>
        <div><a href="/user-settings" className="bi bi-search"> User Settings</a></div>
        <div><a href="/accounts" className="bi bi-chat"> Accounts</a></div>

        <div className="bottom">
          <div><a href="/" onClick={Logout} className="bi bi-lock"> Logout</a></div>
        </div>
      </div>
    </div>
  );
}
export default SidePanel;