function Comments(args)
{
  return (
    <div className="notification">
      <img
        src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${args.notification.commenter.id}`}
        onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
        className="thumbnail"
        alt="thumbnail"
      />
      
      <a href={`/profile/${args.notification.commenter.username}`} className="username">{args.notification.commenter.username}</a>
      &nbsp;commented on your post:<div className="comment">{args.notification.comment}</div>
      <label className="timestamp">· {args.notification.date}</label>

      <a href={`/post?id=${args.notification.post.account.id}&post=${args.notification.post.id}`} className="post">
        <img
          src={`data:image/jpeg;base64,${args.notification.post.image}`}
          onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
          alt="post"
        />
      </a>
    </div>
  )
}
export default Comments