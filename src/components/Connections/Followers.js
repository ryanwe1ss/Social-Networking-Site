import "./connections.scss";

function Followers(args) {
  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <header>
          <h4>Followers</h4>
          <span onClick={() => {
            document.getElementById("modal").style.display = "none";
            args.setShowFollowers(false);
            
          }} id="close">&times;</span>
        </header><hr/>

        <div className="followers">
          {args.followers.map(account => (
            <div className="account" key={account.id}>
              <img
                src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${account.id}`}
                onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                className="thumbnail"
                alt="thumbnail"
              />
              <label onClick={() => { location.href=`/profile?id=${account.id}` }}>
                {account.username}
                <br/><span>{account.name && account.name.trim().length > 0 ? account.name : "No Name"}</span>
              </label>
              {args.session.id != args.profileId || args.session.type == "admin"
                ? null
                : <input type="button" className="btn btn-secondary btn-sm" value="Remove" onClick={() => {
                    args.HandleDeleteConnection(account.id, "followers");
                    args.HandleFetchFollowers();
                  }}/>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Followers;