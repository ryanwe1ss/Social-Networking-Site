import { useEffect, useState, useRef } from 'react';
import {
  thumbnailUrl,
  FetchSession,
  FetchPostContent,
  FetchPostPicture,
  LikePost,
  CommentPost,
  FavoritePost,
} from '../../utilities/routes';
import DefaultProfileImage from '/public/images/default-profile.png';

import LoadingBar from '../../components/LoadingBar/loading-bar';
import SidePanel from '../../components/SidePanel/side-panel';

import ReportPostModal from './components/report-post';
import ReportCommentModal from './components/report-comment';
import Likes from './components/likes';
import './post.scss';

function Post()
{
  const profileId = parseInt(location.search.split('profileId=')[1]);
  const postId = parseInt(location.search.split('postId=')[1]);
  const postName = parseInt(location.search.split('post=')[1]);
  
  const commentRef = useRef(null);
  const [session, setSession] = useState([]);
  const [showLikes, setShowLikes] = useState(false);
  const [showReportPostModal, setShowReportPostModal] = useState(false);
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);

  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [picture, setPicture] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchPostContent(session);
      HandleFetchPostPicture();
    });
    
  }, []);

  function HandleFetchPostPicture() {
    FetchPostPicture(profileId, postName).then((picture) => {
      setPicture(picture);
    });
  }

  function HandleFetchPostContent(session) {
    FetchPostContent(profileId, postId).then((content) => {
      if (!content || !content.is_enabled) return location.href = `/profile/${session.username}`;
      setPost(content);
      setLoaded(true);
    });
  }

  function HandleLikePost() {
    if (post.likes_enabled) {
      LikePost(post.id).then(() => {
        HandleFetchPostContent();
      });
    }
  }

  function HandleCommentPost() {
    const comment = commentRef.current.value;

    if (comment.length > 0 && comment.length < 256 && post.comments_enabled) {
      CommentPost(postId, comment).then(() => {
        commentRef.current.value = null;
        HandleFetchPostContent();
      });
    }
  }

  function HandleFavoritePost() {
    FavoritePost(post.id).then(() => {
      HandleFetchPostContent();
    });
  }

  function HandleReportComment(id) {
    setComment(post.comments.find((comment) => comment.id == id));
    setShowReportCommentModal(true);
  }

  if (session.id) {
    return (
      <div className='post-container'>
        <div className='outer-border'>
          <SidePanel session={session}/>
  
          <div className='post'>
            <div className='header-img'>
              {loaded ? 
                <>
                  <img
                    src={picture}
                    onError={(img) => (img.target.src = DefaultProfileImage)}
                    className='picture'
                    alt='picture'
                  />
                  <label className='user'>@{post.username}</label>
                  <label className='date'>{new Date(post.date_created).toLocaleDateString()}</label><hr/>
                  <label className='description'>{post.description}</label><hr/>
                </> : <>
                <div className='picture'>
                  <LoadingBar size='small' height={50}/>
                </div>
                Loading Post...
                </>
              }
            </div>
  
            <div className='interact'>
              <div className='post-actions'>
                <div className='likes'>
                  {post.likes_enabled ?
                    <span>
                      <i className='bi bi-heart-fill' id={post.is_liked ? 'liked' : null} onClick={HandleLikePost}/>
                      &nbsp;<span className='likeBtn' onClick={() => setShowLikes(true)}>{post.likes} {post.likes > 1 ? 'Likes' : post.likes == 0 ? 'Likes' : 'Like'}</span>
                    </span>
                    :
                    <span>
                      <i className='bi bi-heart-fill' id='disabled'/>
                      {loaded ? ' Likes have been disabled' : null}
                    </span>
                  }
                </div>

                {session.id != profileId ?
                  <div className='settings'>
                    <i className='bi bi-flag-fill' onClick={() => session.type == 'admin' ? null : setShowReportPostModal(true)}/>
                    <i className='bi bi-star-fill' id={post.is_favorited ? 'favorited' : null} onClick={HandleFavoritePost}/>
                  </div> : null
                }
              </div>
  
              {loaded ? 
                <div className='comments'>
                  { post.comments && post.comments_enabled ?
                    post.comments.map((comment) => (
                      <div className='comment' key={comment.id}>
                        <img
                          src={`${thumbnailUrl}/fs-api/thumbnail/${comment.commenter.id}`}
                          onError={(img) => (img.target.src = DefaultProfileImage)}
                          className='thumbnail'
                          alt='thumbnail'
                        />
                        <span className='commenter'> <a href={`/profile/${comment.commenter.username}`}>{comment.commenter.username}</a></span>
                        <span className='message'> {comment.comment}</span>
                        {session.id != comment.commenter.id && session.type != 'admin' ?
                          <span className='report' onClick={() => HandleReportComment(comment.id)}>Report</span>
                          : null
                        }
                        
                        <br/>
                        <span className='date'>Sent on {new Date(comment.date_created).toLocaleString()}</span>
                      </div>

                    )) : !post.comments_enabled
                      ? <div className='comments-disabled'>Comments are disabled</div>
                      : !post.comments ? <div className='no-comments'>No comments yet...</div>
                      : null
                  }
                </div> :
                <div className='comments'>
                  <LoadingBar size='large' height={30}/>
                </div>
              }
  
              <div className='inputs'>
                <input
                  type='text'
                  ref={commentRef}
                  className='form-control'
                  placeholder='Write a comment...'
                  disabled={!post.comments_enabled}
                />
                <button
                  className='form-control btn btn-primary'
                  onClick={HandleCommentPost}
                  disabled={!post.comments_enabled}
                >Send</button>
              </div>
            </div>
          </div>
        </div>
        {showReportPostModal &&
          <ReportPostModal
            profileId={profileId}
            postId={postId}
            setShowReportPostModal={setShowReportPostModal}
          />
        }
        {showReportCommentModal &&
          <ReportCommentModal
            comment={comment}
            postId={postId}
            setShowReportCommentModal={setShowReportCommentModal}
          />
        }
        {showLikes &&
          <Likes
            setShowLikes={setShowLikes}
            postId={postId}
          />
        }
      </div>
    );
  
  } else return <LoadingBar size='large' height={15}/>
}
export default Post;