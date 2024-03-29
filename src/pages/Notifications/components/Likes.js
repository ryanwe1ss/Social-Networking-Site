import DefaultProfileImage from "/public/images/default-profile.png";
import { thumbnailUrl } from "../../../utilities/routes";

function Likes(args)
{
  return (
    <div className="notification">
      <img
        src={`${thumbnailUrl}/fs-api/thumbnail/${args.notification.liker.id}`}
        onError={(img) => (img.target.src = DefaultProfileImage)}
        className="thumbnail"
        alt="thumbnail"
      />

      <a href={`/profile/${args.notification.liker.username}`} className="username">{args.notification.liker.username}</a>
      &nbsp;liked your post
      <label className="timestamp">· {args.notification.date}</label>

      <a href={`/post?profileId=${args.session.id}&postId=${args.notification.post.id}&post=${args.notification.file_name}`} className="post">
        <img
          src={`${thumbnailUrl}/fs-api/post/${args.session.id}/${args.notification.file_name}`}
          onError={(img) => (img.target.src = DefaultProfileImage)}
          alt="post"
        />
      </a>
    </div>
  )
}
export default Likes;