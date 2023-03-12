import React, { useEffect, useState } from "react";
import { FetchPosts } from "../../utilities/utilities";
import "./posts.scss";

function Posts(props) {
  const profileId = parseInt(location.search.split("id=")[1]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchPosts(profileId).then((posts) => {
      if (posts) setPosts(posts);
    });
  }, []);

  return (
    <div className="user-posts">
      <hr/>
      <div className="posts">
        {posts.length > 0 ? (
          posts.map(post => (
            <div className="post" key={post.id}>
              <img src={`data:image/jpeg;base64,${post.image}`} alt="thumbnail"/>
            </div>
          ))
        ) : (
          <p>{props.username.replace("@", "")} has no posts</p>
        )}
      </div>
    </div>
  );
}
export default Posts;