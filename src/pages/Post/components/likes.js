import { useEffect, useState } from "react";
import { thumbnailUrl, FetchPostLikes } from "../../../utilities/utilities";

function Likes(args)
{
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    FetchPostLikes(args.postId).then((likes) => {
      setLikes(likes);
    });
  }, []);

  return (
    <div id="likes-modal" className="modal">
      <div className="modal-content">
        <header>
          <h4>Post Likes</h4>
          <span onClick={() => args.setShowLikes(false)} id="close">&times;</span>
        </header><hr/>

        <div className="likes-body">
          {likes.map(like => (
            <div className="like" key={like.id}>
              <img
                src={`${thumbnailUrl}/fs-api/thumbnail/${like.liker.id}`}
                onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                className="thumbnail"
                alt="thumbnail"
              />
              <label onClick={() => { location.href=`/profile/${like.liker.username}` }}>
                {like.liker.username}
                <br/><span>{like.liker.name && like.liker.name.trim().length > 0 ? like.liker.name : "No Name"}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Likes;