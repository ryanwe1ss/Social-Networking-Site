import { thumbnailUrl } from "../../../utilities/utilities";

function Comments(args)
{
  return (
    <div className="notification">
      <img
        src={`${thumbnailUrl}/fs-api/thumbnail/${args.notification.commenter.id}`}
        onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
        className="thumbnail"
        alt="thumbnail"
      />
      
      <a href={`/profile/${args.notification.commenter.username}`} className="username">{args.notification.commenter.username}</a>
      &nbsp;commented on your post:<div className="comment">{args.notification.comment}</div>
      <label className="timestamp">· {args.notification.date}</label>

      <a href={`/post?profileId=${args.session.id}&postId=${args.notification.post.id}&post=${args.notification.file_name}`} className="post">
        <img
          src={`${thumbnailUrl}/fs-api/post/${args.session.id}/${args.notification.file_name}`}
          onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
          alt="post"
        />
      </a>
    </div>
  )
}
export default Comments