import React, { useEffect, useState } from "react";
import LoadingBar from "../LoadingBar/loading-bar";
import "./posts.scss";

import { thumbnailUrl, DeletePost } from "../../utilities/routes";
import PostPictureModal from "./components/post-picture-modal";

function Posts(args) {
  const popup = document.querySelector(".popup-box");
  const editMode = args.editMode;

  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(3);

  const [posts, setPosts] = useState([]);
  const [tempPosts, setTempPosts] = useState([]);

  useEffect(() => {
    setPosts(args.profile.posts.slice(0, limit));
    setLoaded(true);

  }, [limit]);

  useEffect(() => {
    tempPosts.forEach(postId => {
      if (args.saved) {
        DeletePost(postId).then((response) => {
          if (response.status != 200) {
            popup.style.display = "block";
            popup.innerHTML =  "Problem Deleting Post. Error: " + response.status;
            setTimeout(() => popup.style.display = "none", 6000);
          
          } location.reload();
        })
      
      } document.getElementById(postId).style.border = "2px solid black";
    });

  }, [editMode]);

  function SelectPost(postId) {
    setTempPosts(id => [...id, postId]);
    document.getElementById(postId).style.border = "4px solid red";
  }

  if (args.session.id) {
    return (
      <div className="user-posts">
        <input type="file" id="post"/><hr/>
  
        {loaded && args.profile.id == args.session.id && args.session.type !== "admin" && !args.editMode ? 
          <div className="share-post" onClick={() => document.getElementById("postModal").style.display = "block"}>
            <i className="bi bi-plus-circle"/> Share a post
          </div> : null }
  
        <div className="posts">
          {loaded ? posts && posts.length > 0 ?
            posts.map(post => (
              <a className="post" href={!editMode ? `/post?profileId=${args.profile.id}&postId=${post.id}&post=${post.file_name}` : null} key={post.id}>
                <img src={`${thumbnailUrl}/fs-api/post/${args.profile.id}/${post.file_name}`} id={post.id} alt="thumbnail"/>
                
                {editMode ?
                  <span
                    className="delete"
                    onClick={() => SelectPost(post.id)}
                  >✕
                  </span>
                : null}
              </a>
            )) :
            
            args.session.id != args.profile.id ?
              <div className="no-posts">
                {args.profile.username + " has no posts"}
              </div> : null :
  
            <div className="spinner">
              <LoadingBar size="small"/>
              <label>Loading Posts...</label>
            </div>
          }
        </div>
        {loaded ?
          <div className="load-more" style={{display: `${args.profile.posts && args.profile.posts.length > limit ? 'block' : 'none'}`}}>
            <input type="button" className="btn btn-secondary btn-sm" value="Load More"
              onClick={() => {
                setLimit(limit + 3);
                setLoaded(false);
              }}/>
          </div> : null
        }
        <PostPictureModal/>
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default Posts;