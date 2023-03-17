import React, { useEffect, useState } from "react";
import { FetchPosts, UploadPost, DeletePost } from "../../utilities/utilities";
import LoadingBar from "../LoadingBar/loading-bar";
import "./posts.scss";

function Posts(props) {
  const profileId = parseInt(location.search.split("id=")[1]);
  const accountId = parseInt(localStorage.getItem("accountId"));
  const editMode = props.editMode;

  const [uploaded, setUploaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [posted, setPosted] = useState(false);

  const [refresh , setRefresh] = useState(0);
  const [limit, setLimit] = useState(3);
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

  function DisplayImage(event) {
    const reader = new FileReader();
    setUploaded(true);

    reader.onload = (event) => {
      document.getElementById("preview").src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  function HandlePostImage() {
    const image = document.getElementById("selectImage").files[0];

    UploadPost(accountId, image).then((response) => {
      if (response.status == 200) {
        setPosted(true);

        setTimeout(() => {
          document.getElementById("postModal").style.display = "none";
          setRefresh(refresh + 1);
          setLoaded(false);
          setPosted(false);

        }, 1000);
      
      } else alert("Error: " + response.status);
    });
  }

  function HandleDeletePost(postId) {
    DeletePost(accountId, postId).then((response) => {
      if (response.status == 200) {
        console.log(response);
      }
    })
  }

  return (
    <div className="user-posts">
      <input type="file" id="post"/><hr/>

      {profileId == accountId ? 
        <div className="share-post" onClick={() => document.getElementById("postModal").style.display = "block"}>
          <i className="bi bi-plus-circle"/> Share a post
        </div> : null }

      <div className="posts">
        {loaded ? posts.length > 0 ?
          posts.map(post => (
            <div className="post" key={post.id}>
              <img src={`data:image/jpeg;base64,${post.image}`} alt="thumbnail"/>
              { editMode ?
                <span
                  className="delete"
                  onClick={() => HandleDeletePost(post.id)}
                >✕
                </span>
              : null }
            </div>
          )) :
          
          accountId != profileId ?
            <div className="no-posts">
              {props.username.replace("@", "") + " has no posts"}
            </div> : null :

          <div className="spinner">
            <LoadingBar size="small"/>
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

      <div id="postModal" className="modal">
        <div className="modal-content">
          <header>
            <h4>Post Picture</h4>
            <span onClick={() => { document.getElementById("postModal").style.display = "none"}} id="close">&times;</span>
          </header><hr/>

          {posted ? <LoadingBar size="large"/> :

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
                    onClick={HandlePostImage}
                    disabled={!uploaded}
                    >Post Image
                  </button>
                </div>
              </div>

              <div className="preview-block">
                <img id="preview"/>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default Posts;