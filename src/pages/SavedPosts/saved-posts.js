import { useState, useEffect } from "react";
import { FetchSession } from "../../utilities/utilities";

import SidePanel from "../../components/SidePanel/side-panel";
import Footer from "../../components/Footer/footer";
import "./saved-posts.scss";

function SavedPosts()
{
  const [session, setSession] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") return window.location.href = "/statistics";
      setSession({ id: session.id, username: session.username, type: session.type });
    });
  }, []);

  if (session.id && session.type === "user") {
    return (
      <div className="saved-posts-container">
        <div className="outer-border">
          <SidePanel session={session}/>

          <div className="saved-posts">
            <h1>Saved Posts</h1>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default SavedPosts;