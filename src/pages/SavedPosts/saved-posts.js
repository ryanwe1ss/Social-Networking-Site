import { useState, useEffect } from 'react';
import { thumbnailUrl, FetchSession, FetchSavedPosts } from '../../utilities/routes';

import LoadingBar from '../../components/LoadingBar/loading-bar';
import SidePanel from '../../components/SidePanel/side-panel';
import './saved-posts.scss';

function SavedPosts()
{
  const [session, setSession] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type == 'admin') return window.location.href = '/statistics';
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchSavedPosts();
    });
  }, []);

  function HandleFetchSavedPosts() {
    FetchSavedPosts().then(saved => {
      setPosts(saved);
      setLoaded(true);
    });
  }

  if (session.id && session.type == 'user') {
    return (
      <div className='saved-posts-container'>
        <div className='outer-border'>
          <SidePanel session={session}/>

          <div className='saved-posts'> 
            <div className='header'>
              <h1>Your Saved Posts</h1>
              <hr/>
            </div>

            {loaded ?
              <div className='posts'>
                {posts.length > 0 ? posts.map((post) => (
                  <div className='post' key={post.id}>
                    <a href={`/post?profileId=${post.poster.id}&postId=${post.postId}&post=${post.fileName}`} key={post.id}>
                      <img src={`${thumbnailUrl}/fs-api/post/${post.poster.id}/${post.fileName}`} id={post.id} alt='image'/>
                    </a>
                    <p>@{post.poster.username}</p>
                  </div>
                
                )) : <center>You have no saved posts</center> }
                
              </div> : <LoadingBar size='medium' height={8}/>
            }
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size='large' height={15}/>
}
export default SavedPosts;