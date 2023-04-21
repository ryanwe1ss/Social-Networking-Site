import { useEffect, useState } from "react";
import {
  FetchSession,
  FetchPost,
  LikePost,
  CommentPost
} from "../../utilities/utilities";

import LoadingBar from "../../components/LoadingBar/loading-bar";
import SidePanel from "../../components/SidePanel/side-panel";
import "./post.scss";

function Post()
{
  const profileId = parseInt(location.search.split("id=")[1]);
  const postId = parseInt(location.search.split("post=")[1]);
  const [session, setSession] = useState([]);

  const [post, setPost] = useState([]);
  const [picture, setPicture] = useState([]);
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchPost(session);
    });
  }, []);

  function HandleFetchPost(session) {
    FetchPost(profileId, postId).then((result) => {
      if (!result) location.href = `/profile?id=${session.id}`;

      setPost(result.creator);
      setPicture(result.post);
      setRendered(true);
    });
  }

  function HandleLikePost() {
    if (post.likes_enabled) {
      LikePost(post.id).then(() => {
        HandleFetchPost();
      });
    }
  }

  function HandleCommentPost() {
    const comment = document.getElementById("comment").value;

    if (comment.length > 0 && comment.length < 256 && post.comments_enabled) {
      CommentPost(postId, comment).then(() => {
        document.getElementById("comment").value = null;
        HandleFetchPost();
      });
    }
  }

  if (session.id) {
    return (
      <div className="post-container">
        <div className="outer-border">
          <SidePanel sessionId={session.id} type={session.type}/>
  
          <div className="post">
            <div className="header-img">
              {isRendered ? 
                <>
                  <img
                    src={`data:image/jpeg;base64,${picture}`}
                    onError={(img) => (img.target.src = DefaultProfilePicture)}
                    className="picture"
                    alt="picture"
                  />
                  <label className="user">@{post.username}</label>
                  <label className="date">{new Date(post.date_created).toLocaleDateString()}</label><hr/>
                  <label className="description">{post.description}</label><hr/>
                </> : <>
                <div className="picture">
                  <LoadingBar size="small"/>
                </div>

                Loading Post...
                </>
              }
            </div>
  
            <div className="interact">
              <div className="likes">
                {post.likes_enabled ?
                  <span><i className="bi bi-heart-fill" id={post.is_liked ? 'liked' : null} onClick={HandleLikePost}/> {post.likes} Likes</span> :
                  <span><i className="bi bi-heart-fill" id="disabled"/> {isRendered ? "Likes have been disabled" : null}</span>
                }
              </div>
  
              {isRendered ? 
                <div className="comments">
                  { post.comments && post.comments_enabled ?
                    post.comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <img
                          src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${comment.commenter.id}`}
                          onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                          className="thumbnail"
                          alt="thumbnail"
                        />
                        <span className="commenter"> <a href={`/profile?id=${comment.commenter.id}`}>{comment.commenter.username}</a></span>
                        <span className="comment"> {comment.comment}</span><br/>
                        <span className="date">Sent on {new Date(comment.date_created).toLocaleString()}</span>
                      </div>
                    )) : !post.comments_enabled
                      ? <div className="comments-disabled">Comments are disabled</div>
                      : !post.comments ? <div className="no-comments">No comments yet...</div>
                      : null
                  }
                </div> :
                <div className="comments">
                  <LoadingBar size="large"/>
                </div>
              }
  
              <div className="inputs">
                <input
                  type="text"
                  id="comment"
                  className="form-control"
                  placeholder="Write a comment..."
                  disabled={!post.comments_enabled}
                />
                <button
                  className="form-control btn btn-primary"
                  onClick={HandleCommentPost}
                  disabled={!post.comments_enabled}
                >Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Post;