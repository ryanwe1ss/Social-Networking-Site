import DefaultProfilePicture from "../../images/default.png";
import "./connections.scss";

function Following(args)
{
  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <header>
          <h4>Following</h4>
          <span onClick={() => {
            document.getElementById("modal").style.display = "none";
            args.setShowFollowing(false);
            
          }} id="close">&times;</span>
        </header><hr/>
        {args.following.map(account => (
          <div className="following" key={account.id}>
            <div className="account">
              <img
                src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${account.id}`}
                onError={(img) => (img.target.src = DefaultProfilePicture)}
                className="thumbnail"
                alt="thumbnail"
              />
              <label onClick={() => { location.href=`/profile?id=${account.id}` }}>
                {account.username}
                <br/><span>{account.name && account.name.trim().length > 0 ? account.name : "No Name"}</span>
              </label>
              {args.sessionId !== args.profileId
                ? null
                : <input type="button" className="btn btn-secondary btn-sm" value="Remove" onClick={() => {
                    args.HandleDeleteConnection(account.id, "following");
                    args.HandleGetFollowing();
                  }}/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Following;