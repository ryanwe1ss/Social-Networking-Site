import { useEffect, useState } from "react";
import DefaultProfilePicture from "../../images/default.png";
import { FetchPost } from "../../utilities/utilities";
import SidePanel from "../../components/SidePanel/side-panel";
import "./post.scss";

function Post()
{
  const profileId = parseInt(location.search.split("id=")[1]);
  const postId = parseInt(location.search.split("post=")[1]);
  const [postData, setPostData] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    FetchPost(profileId, postId).then((result) => {
      console.log(result);
      
      setPostData(result.creator);
      setPost(result.post);
    });
  }, []);

  return (
    <div className="post-container">
      <div className="outer-border">
        <SidePanel/>

        <div className="post">
          <div className="header-img">
            <label>({postData.username}) - {postData.description}</label>
            
            <img
              src={`data:image/jpeg;base64,${post}`}
              onError={(img) => (img.target.src = DefaultProfilePicture)}
              alt="post"
            />
          </div>

          <div className="interact">
            <label><i className="bi bi-heart-fill"/> {postData.likes} Likes</label>
            <hr/>

            <div className="comments">
              comments
            </div>

            <input type="text" className="form-control" placeholder="Write a comment..."/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;