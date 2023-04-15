import { useEffect, useState } from "react";
import { FetchSession } from "../../utilities/utilities";

import SidePanel from "../../components/SidePanel/user/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./posts.scss";

function Posts()
{
  const [session, setSession] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") window.location.href = "/admin";
      setSession({ id: session.id, username: session.username, type: session.type });
    });
  }, []);

  if (session.id && session.type === "user") {
    return (
      <div className="posts-container">
        <div className="outer-border">
          <SidePanel sessionId={session.id}/>

          <div className="posts">
            Hello
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Posts;