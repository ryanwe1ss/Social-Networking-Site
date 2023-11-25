import { useState } from 'react';

import { thumbnailUrl } from '../../../utilities/routes';
import { ShowBoxDialog } from '../../../utilities/utilities';
import DefaultProfileImage from '/public/images/default-profile.png';

import {
  SearchUsers,
  CreateChat as CreateChatRequest,
} from '../../../utilities/routes';

function CreateChat(args)
{
  const [users, setUsers] = useState([]);

  async function HandleSearchUsers(event) {
    const users = await SearchUsers(event.target.value);
    console.log(users);

    setUsers(users);
  };

  async function HandleCreateChat(userId) {
    const response = await CreateChatRequest(userId);

    if (response.status == 200) {
      location.href = `/messages?chat=${response.chatId}`;
    
    } else ShowBoxDialog(`Error Creating Chat: ${response.status}`);
  }

  return (
    <div className='modal' id='modal'>
      <div className='modal-content'>
        <header>
          <h4>Create Chat</h4>
          <span onClick={() => args.setShowCreateChat(false)} id='close'>&times;</span>
        </header>
        <hr/>

        <div className='body'>
          <input type='text' id='to' onKeyUp={HandleSearchUsers} placeholder='Find Someone...' />

          <div className='users'>
            {users.length > 0 && users.map((user, index) => (
              <div key={index}>
                <img
                  src={`${thumbnailUrl}/fs-api/thumbnail/${user.id}`}
                  onError={(img) => (img.target.src = DefaultProfileImage)}
                  className='thumbnail'
                  alt='thumbnail'
                />

                <label onClick={() => { location.href=`/profile/${user.username}` }}>
                  {user.username}
                  <br/><span>{user.name && user.name.trim().length > 0 ? user.name : 'No Name'}</span>
                </label>

                <input
                  type='button'
                  className='btn btn-secondary btn-sm'
                  onClick={() => HandleCreateChat(user.id)}
                  disabled={!user.is_following && !user.has_public_messaging}
                  value='Message'
                />
              </div>

            )) || <div>No Account Found</div> }
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateChat;