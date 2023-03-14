import React, { useEffect, useState } from "react";
import { FetchPosts, UploadPost } from "../../utilities/utilities";
import LoadingBar from "../LoadingBar/loading-bar";
import "./posts.scss";

function Posts(props) {
  const profileId = parseInt(location.search.split("id=")[1]);
  const accountId = parseInt(localStorage.getItem("accountId"));
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchPosts(profileId).then((posts) => {
      if (posts) setPosts(posts);
    });
  }, []);

  function DisplayImage(event) {
    const reader = new FileReader();
    setUploaded(true);

    reader.onload = (event) => {
      document.getElementById("preview").src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  function PostImage() {
    const image = document.getElementById("selectImage").files[0];

    UploadPost(accountId, image).then((response) => {
      if (response.status == 200) {
        setLoading(true);

        setTimeout(() => {
          document.getElementById("postModal").style.display = "none";
          FetchPosts(profileId).then((posts) => {
            setLoading(false);
            if (posts) setPosts(posts);
          });
        }, 4000);
      
      } else alert("Error: " + response.status);
    });
  }

  return (
    <div className="user-posts">
      <input type="file" id="post"/>
      <hr/>

      {profileId == accountId ? 
        <div className="share-post" onClick={() => document.getElementById("postModal").style.display = "block"}>
          <i className="bi bi-plus-circle"/> Share a post
        </div> : null }

      <div className="posts">
        {profileId == accountId || posts.length > 0 ?
          posts.map(post => (
            <div className="post" key={post.id}>
              <img src={`data:image/jpeg;base64,${post.image}`} alt="thumbnail"/>
            </div>
          )) :
        <div className="no-posts">
          {props.username.replace("@", "") + " has no posts"}
        </div>
        }
      </div>

      <div id="postModal" className="modal">
        <div className="modal-content">
          <header>
            <h4>Post Picture</h4>
            <span onClick={() => { document.getElementById("postModal").style.display = "none"}} id="close">&times;</span>
          </header><hr/>

          {loading ? <LoadingBar size="large"/> :

          <div className="post-block">
            <div className="post-image">
              <div className="upload">
                <input type="file" id="selectImage" onChange={DisplayImage}/>
                <button
                  id="selectImageButton"
                  className="btn btn-secondary"
                  onClick={() => { document.getElementById("selectImage").click()}}
                  >Select Image
                </button>
                <button
                  id="postImageButton"
                  className="btn btn-secondary"
                  onClick={PostImage}
                  disabled={!uploaded}
                  >Post Image
                </button>
              </div>
            </div>

            <div className="preview-block">
              <img id="preview"/>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
export default Posts;