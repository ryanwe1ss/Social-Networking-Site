import DefaultProfilePicture from "../../images/default.png";
import "./connections.scss";

function Following(params)
{
  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <header>
          <h4>Following</h4>
          <span onClick={() => {
            document.getElementById("modal").style.display = "none";
            params.setShowFollowing(false);
            
          }} id="close">&times;</span>
        </header><hr/>
        {params.following.map(account => (
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
              {params.accountId !== params.profileId
                ? null
                : <input type="button" value="Remove" onClick={() => {
                    params.HandleRemoveConnection(account.id, "following");
                    params.HandleGetFollowing();
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