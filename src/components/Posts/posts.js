import React, { useEffect, useState } from "react";
import LoadingBar from "../LoadingBar/loading-bar";
import "./posts.scss";

import { FetchPosts, DeletePost } from "../../utilities/utilities";
import PostPictureModal from "./components/post-picture-modal";

function Posts(args) {
  const popup = document.querySelector(".popup-box");
  const profileId = parseInt(location.search.split("id=")[1]);
  const editMode = args.editMode;

  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [limit, setLimit] = useState(6);

  const [tempPosts, setTempPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchPosts(profileId, limit).then((result) => {
      setPosts(result.posts);
      setLoaded(true);
      setTimeout(() => {
        if (result.count <= limit)
          document.querySelector(".load-more").style.display = "none";
      
      }, 250);
    });

  }, [limit, refresh]);

  useEffect(() => {
    tempPosts.forEach(postId => {
      if (args.saved) {
        DeletePost(postId).then((response) => {
          if (response.status != 200) {
            popup.style.display = "block";
            popup.innerHTML =  "Problem Deleting Post. Error: " + response.status;
            setTimeout(() => popup.style.display = "none", 6000);
          }
        })
      }
      document.getElementById(postId).style.border = "2px solid black";
    });

    if (args.saved) setRefresh(refresh + 1);
    setTempPosts([]);
    args.setSaved(false);

  }, [editMode]);

  function SelectPost(postId) {
    setTempPosts(id => [...id, postId]);
    document.getElementById(postId).style.border = "4px solid red";
  }

  if (args.session.id) {
    return (
      <div className="user-posts">
        <input type="file" id="post"/><hr/>
  
        {loaded && profileId == args.session.id && args.session.type !== "admin" && !args.editMode ? 
          <div className="share-post" onClick={() => document.getElementById("postModal").style.display = "block"}>
            <i className="bi bi-plus-circle"/> Share a post
          </div> : null }
  
        <div className="posts">
          {loaded ? posts.length > 0 ?
            posts.map(post => (
              <a className="post" href={!editMode ? `/post?id=${profileId}&post=${post.id}` : null} key={post.id}>
                <img src={`data:image/jpeg;base64,${post.image}`} id={post.id} alt="thumbnail"/>
                { editMode ?
                  <span
                    className="delete"
                    onClick={() => SelectPost(post.id)}
                  >✕
                  </span>
                : null }
              </a>
            )) :
            
            args.session.id != profileId ?
              <div className="no-posts">
                {args.username + " has no posts"}
              </div> : null :
  
            <div className="spinner">
              <LoadingBar size="small"/>
              <label>Loading Posts...</label>
            </div>
          }
        </div>
        {loaded ?
          <div className="load-more">
            <input type="button" className="btn btn-secondary btn-sm" value="Load More"
            onClick={() => {
              setLimit(limit + 3);
              setLoaded(false);
            }}/>
          </div> : null
        }
        <PostPictureModal
          setRefresh={setRefresh} refresh={refresh}
          setLoaded={setLoaded} loaded={loaded}
        />
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default Posts;