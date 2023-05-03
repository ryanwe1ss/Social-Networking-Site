import { useState, useEffect } from "react";
import { FetchSession, FetchSavedPosts } from "../../utilities/utilities";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import Footer from "../../components/Footer/footer";
import "./saved-posts.scss";

function SavedPosts()
{
  const [session, setSession] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") return window.location.href = "/statistics";
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchSavedPosts();
    });
  }, []);

  function HandleFetchSavedPosts() {
    FetchSavedPosts().then((saved) => {
      setPosts(saved.posts);
      setLoaded(true);
    });
  }

  if (session.id && session.type === "user") {
    return (
      <div className="saved-posts-container">
        <div className="outer-border">
          <SidePanel session={session}/>

          <div className="saved-posts"> 
            <div className="header">
              <h1>Your Saved Posts</h1>
              <hr/>
            </div>

            {loaded ?
              <div className="posts">
                {posts.length > 0 ? posts.map((post) => (
                  <div className="post" key={post.id}>
                    <a href={`/post?id=${post.poster.id}&post=${post.post_id}`} key={post.id}>
                      <img src={`data:image/jpeg;base64,${post.image}`} id={post.id} alt="image"/>
                    </a>
                    <p>@{post.poster.username}</p>
                  </div>
                
                )) : <center>You have no saved posts</center> }
                
              </div> : <LoadingBar size="large" height={15}/>
            }
          </div>
        </div>
        <Footer/>
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default SavedPosts;