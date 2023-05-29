import { thumbnailUrl } from "../../../utilities/utilities";

function FollowRequests(args)
{
  return (
    <div className="notification">
      <img
        src={`${thumbnailUrl}/api/thumbnail/${args.notification.follower.id}`}
        onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
        className="thumbnail"
        alt="thumbnail"
      />
      {args.notification.accepted ? (
        <>
          You have accepted&nbsp;
          <a href={`/profile/${args.notification.follower.username}`} className="username">{args.notification.follower.username}'s</a>
          &nbsp;request to follow you
          <label className="timestamp">· {args.notification.date}</label>
        </>
      ) : args.notification.declined ? (
        <>
          You have declined&nbsp;
          <a href={`/profile/${args.notification.follower.username}`} className="username">{args.notification.follower.username}'s</a>
          &nbsp;request to follow you
          <label className="timestamp">· {args.notification.date}</label>
        </>
      ) : (
        <>
          <a href={`/profile/${args.notification.follower.username}`} className="username">{args.notification.follower.username}</a>
          <label className="timestamp">requested to follow you · {args.notification.date}</label>

          <div className="buttons">
            <button className="btn btn-success btn-sm accept" onClick={() => args.HandleAcceptFollow(args.notification.id, args.notification.follower.id)}>Accept</button>
            <button className="btn btn-danger btn-sm decline" onClick={() => args.HandleDeclineFollow(args.notification.id, args.notification.follower.id)}>Decline</button>
          </div>
        </>
      )}
    </div>
  )
}
export default FollowRequests