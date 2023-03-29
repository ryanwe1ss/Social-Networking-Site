import { useEffect, useState } from "react";
import { FetchSession } from "../../utilities/utilities";

import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./posts.scss";

function Posts()
{
  const [session, setSession] = useState({
    id: null,
    username: null,
  });

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
    });
  }, []);

  if (session.id) {
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