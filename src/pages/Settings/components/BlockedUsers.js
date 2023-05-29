import { thumbnailUrl, UnblockAccount } from "../../../utilities/utilities";

function BlockedUsers(args)
{
  function HandleUnblock(accountId) {
    UnblockAccount(accountId).then(response => {
      if (response.status == 200) {
        args.HandleFetchBlocked();
      }
    });
  }

  return (
    <div className="settings-blocked-users-container">
      {args.blocked.length > 0 ? (
        args.blocked.map((account) => (
          <div className="blocked-users" key={account.id}>
            <img
              src={`${thumbnailUrl}/api/thumbnail/${account.id}`}
              onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
              className="thumbnail"
              alt="thumbnail"
            />
            <label onClick={() => { location.href=`/profile/${account.username}` }}>
              <span>@{account.username}</span>
              <br/><span>{account.name && account.name.trim().length > 0 ? account.name : "No Name"}</span>
            </label>
  
            <input type="button" className="btn btn-secondary btn-sm" value="Unblock" onClick={() => {
              HandleUnblock(account.id);
            }}/>
            <hr/>
          </div>
        ))
      ) : (
        <div className="blocked-users">
          <center>No blocked users</center>
        </div>
      )}
    </div>
  );
}
export default BlockedUsers;