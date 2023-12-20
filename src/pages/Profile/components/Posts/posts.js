import React, { useEffect, useState, useRef } from 'react';

import LoadingBar from '../../../../components/LoadingBar/loading-bar';
import PostPictureModal from './components/post-picture-modal';

import { ShowBoxDialog } from '../../../../utilities/utilities';
import { thumbnailUrl, DeletePost } from '../../../../utilities/routes';

import './posts.scss';

function Posts(args) {
  const editMode = args.editMode;
  
  const [limit, setLimit] = useState(4);
  const [loaded, setLoaded] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

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
            ShowBoxDialog('Problem Deleting Post. Error: ' + response.status);
          
          } else location.reload();
        });
      
      } document.getElementById(postId).style.border = '2px solid black';
    
    }); setTempPosts([]);

  }, [editMode]);

  function SelectPost(postId) {
    setTempPosts(id => [...id, postId]);
    document.getElementById(postId).style.border = '4px solid red';
  }

  if (args.session.id) {
    return (
      <div className='user-posts'>
        <input type='file' id='post'/>
  
        {loaded && args.profile.id == args.session.id && args.session.type != 'admin' && !args.editMode ? 
          <div className='share-post' onClick={() => setShowPostModal(true)}>
            <i className='bi bi-plus-circle'/> Share a post
          </div> : null }
  
        <div className='posts'>
          {loaded ? posts && posts.length > 0 ?
            posts.map(post => (
              <a className='post' href={!editMode ? `/post?profileId=${args.profile.id}&postId=${post.id}&post=${post.file_name}` : null} key={post.id}>
                <img src={`${thumbnailUrl}/fs-api/post/${args.profile.id}/${post.file_name}`} id={post.id} alt='thumbnail'/>
                
                {editMode ?
                  <span
                    className='delete'
                    onClick={() => SelectPost(post.id)}
                  >✕
                  </span>
                : null}
              </a>
            )) :
            
            args.session.id != args.profile.id ?
              <div className='no-posts'>
                {args.profile.username + ' has no posts'}
              </div> : null :
  
            <div className='spinner'>
              <LoadingBar size='small'/>
              <label>Loading Posts...</label>
            </div>
          }
        </div>
        {loaded ?
          <div className='load-more' style={{display: `${args.profile.posts && args.profile.posts.length > limit ? 'block' : 'none'}`}}>
            <input type='button' className='btn btn-secondary btn-sm' value='Load More'
              onClick={() => {
                setLimit(limit + 3);
                setLoaded(false);
              }}/>
          </div> : null
        }
        {showPostModal && <PostPictureModal setShowPostModal={setShowPostModal}/>}
      </div>
    );
  
  } else return <LoadingBar size='medium' height={8}/>
}
export default Posts;