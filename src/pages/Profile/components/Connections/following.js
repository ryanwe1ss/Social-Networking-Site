import DefaultProfileImage from '/public/images/default-profile.png';
import LoadingBar from '../../../../components/LoadingBar/loading-bar';

import { thumbnailUrl } from '../../../../utilities/routes';
import './connections.scss';

function Following(args)
{
  return (
    <div className='following-component'>
      <div className='modal'>
        <div className='modal-content'>
          <header>
            <h4>Following</h4>
            <span onClick={() => {
              args.setShowFollowing(false);
              args.setFollowingLoaded(false);
              args.setFollowing([]);
              
            }} className='close'>&times;</span>
          </header><hr/>

          <div className='following'>
            {args.followingLoaded ? args.following.map(account => (
              <div className='account' key={account.id}>
                <img
                  src={`${thumbnailUrl}/fs-api/thumbnail/${account.id}`}
                  onError={(img) => (img.target.src = DefaultProfileImage)}
                  className='thumbnail'
                  alt='thumbnail'
                />
                <label onClick={() => { location.href=`/profile/${account.username}` }}>
                  {account.username}
                  <br/><span>{account.name && account.name.trim().length > 0 ? account.name : 'No Name'}</span>
                </label>
                {args.session.id != args.profileId || args.session.type == 'admin'
                  ? null
                  : <input type='button' className='btn btn-secondary btn-sm' value='Remove' onClick={() => {
                      args.HandleDeleteConnection(account.id, 'following');
                      args.HandleFetchFollowing();
                    }}/>
                }
              </div>
            )) : <LoadingBar size='small' height={10}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Following;