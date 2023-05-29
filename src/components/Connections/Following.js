import { thumbnailUrl } from "../../utilities/utilities";
import "./connections.scss";

function Following(args)
{
  return (
    <div className="following-component">
      <div className="modal" id="modal">
        <div className="modal-content">
          <header>
            <h4>Following</h4>
            <span onClick={() => {
              document.getElementById("modal").style.display = "none";
              args.setShowFollowing(false);
              
            }} id="close">&times;</span>
          </header><hr/>

          <div className="following">
            {args.following.map(account => (
              <div className="account" key={account.id}>
                <img
                  src={`${thumbnailUrl}/api/thumbnail/${account.id}`}
                  onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                  className="thumbnail"
                  alt="thumbnail"
                />
                <label onClick={() => { location.href=`/profile/${account.username}` }}>
                  {account.username}
                  <br/><span>{account.name && account.name.trim().length > 0 ? account.name : "No Name"}</span>
                </label>
                {args.session.id != args.profileId || args.session.type == "admin"
                  ? null
                  : <input type="button" className="btn btn-secondary btn-sm" value="Remove" onClick={() => {
                      args.HandleDeleteConnection(account.id, "following");
                      args.HandleFetchFollowing();
                    }}/>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Following;