import { useEffect, useState } from "react";
import { FetchSession, FetchFeed } from "../../utilities/utilities";

import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./feed.scss";

function Feed()
{
  const [session, setSession] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") return window.location.href = "/statistics";
      setSession({ id: session.id, username: session.username, type: session.type });

      FetchFeed().then((feed) => {
        setFeed(feed.posts);
      });
    });
  }, []);

  if (session.id && session.type === "user") {
    return (
      <div className="posts-container">
        <div className="outer-border">
          <SidePanel session={session}/>

          <div className="posts">
            {feed.length > 0 && feed.map((post) => (
              <div className="post" key={post.id}>

                <div className="header">
                  <span className="username">@{post.creator_username}</span><br/>
                  <img src={`data:image/png;base64,${post.file}`} onClick={() => { window.location.href = `/post?id=${post.creator_id}&post=${post.id}` }} alt="post"/>
                </div>

                <div className="body">
                  <div className="post-description">{post.description}</div>
                  <span className="post-date">{new Date(post.date_created).toLocaleString()}</span>

                  <div className="likes-comments">
                    <i className="bi bi-heart-fill"/>
                    <span className="likes"> {post.likes}</span>&nbsp;&nbsp;

                    <i className="bi bi-chat-left-text-fill"/>
                    <span className="comments"> {post.comments}</span>
                  </div>
                </div><hr/>

              </div>
            )) || <div className="no-feed">Your feed is currently empty</div>}
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Feed;