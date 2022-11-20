import DefaultProfilePicture from "../../images/profile.png";

function Followers(params) {
  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <header>
          <h4>Followers</h4>
          <span onClick={() => {
            document.getElementById("modal").style.display = "none";
            params.setShowFollowers(false);
            
          }} id="close">&times;</span>
        </header><hr/>
        {params.followers.map(account => (
          <div className="followers" key={account.id}>
            <div className="account">
              <img
                src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/api/thumbnail?id=${account.id}`}
                onError={(img) => (img.target.src = DefaultProfilePicture)}
                className="thumbnail"
                alt="thumbnail"
              />
              <label onClick={() => { location.href=`/profile?id=${account.id}` }}>
                {account.username}
                <br/><span>{account.name}</span>
              </label>
              {params.accountId !== params.profileId
                ? null
                : <input type="button" value="Remove" onClick={() => {
                    params.FollowAccount(account.id);
                    params.GetFollowers();
                  }}/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Followers;