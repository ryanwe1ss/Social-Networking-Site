function Likes(args)
{
  return (
    <div className="notification">
      <img
        src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${args.notification.liker.id}`}
        onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
        className="thumbnail"
        alt="thumbnail"
      />

      <a href={`/profile/${args.notification.liker.username}`} className="username">{args.notification.liker.username}</a>
      &nbsp;liked your post
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
export default Likes