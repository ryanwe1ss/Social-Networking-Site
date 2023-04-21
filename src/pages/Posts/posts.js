import { useEffect, useState } from "react";
import { FetchSession, FetchFeed } from "../../utilities/utilities";

import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./posts.scss";

function Posts()
{
  const [session, setSession] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") return window.location.href = "/admin";
      setSession({ id: session.id, username: session.username, type: session.type });

      FetchFeed().then((feed) => {
        setFeed(feed.posts);
        console.log(feed);
      });
    });
  }, []);

  if (session.id && session.type === "user" && feed.length > 0) {
    return (
      <div className="posts-container">
        <div className="outer-border">
          <SidePanel sessionId={session.id} type={session.type}/>

          <div className="posts">
            {feed.map((post) => (
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
            ))}
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Posts;