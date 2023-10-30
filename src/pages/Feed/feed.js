import { useEffect, useState } from 'react';
import { thumbnailUrl, FetchSession, FetchFeed } from '../../utilities/routes';

import SidePanel from '../../components/SidePanel/side-panel';
import LoadingBar from '../../components/LoadingBar/loading-bar';
import './feed.scss';

function Feed()
{
  const [session, setSession] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type == 'admin') return window.location.href = '/statistics';
      setSession({ id: session.id, username: session.username, type: session.type });

      FetchFeed().then((feed) => {
        setFeed(feed);
        setLoaded(true);
      });
    });
  }, []);

  if (session.id && session.type == 'user') {
    return (
      <div className='feed-container'>
        <div className='outer-border'>
          <SidePanel session={session}/>

          {loaded ?
            <div className='feed'>
              {feed.length > 0 && feed.map((post) => (
                <div className='post' key={post.id}>

                  <div className='header'>
                    <span className='username'>@{post.creatorUsername}</span><br/>
                    <img
                      src={`${thumbnailUrl}/fs-api/post/${post.creatorId}/${post.fileName}`}
                      onClick={() => { window.location.href = `/post?profileId=${post.creatorId}&postId=${post.id}&post=${post.fileName}` }} alt='post'
                    />
                  </div>

                  <div className='body'>
                    <div className='post-description'>{post.description}</div>
                    <span className='post-date'>{new Date(post.dateCreated).toLocaleString()}</span>

                    <div className='likes-comments'>
                      <i className='bi bi-heart-fill'/>
                      <span className='likes'> {post.likes}</span>&nbsp;&nbsp;

                      <i className='bi bi-chat-left-text-fill'/>
                      <span className='comments'> {post.comments}</span>
                    </div>
                  </div><hr/>

                </div>
              )) || <div className='no-feed'>Your feed is currently empty</div>}
            </div>
          
          : <div className='feed'><LoadingBar size='medium' height={15}/></div>
          }
        </div>
      </div>
    );
  
  } else return <LoadingBar size='large' height={15}/>
}
export default Feed;