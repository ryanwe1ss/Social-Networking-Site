import { UnblockAccount } from "../../../utilities/utilities";

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
              src={`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/thumbnail?id=${account.id}`}
              onError={(img) => (img.target.src = DefaultProfilePicture)}
              className="thumbnail"
              alt="thumbnail"
            />
            <label onClick={() => { location.href=`/profile?id=${account.id}` }}>
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