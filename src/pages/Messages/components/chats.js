import { useState, useEffect } from 'react';

import LoadingBar from '../../../components/LoadingBar/loading-bar';
import DefaultProfileImage from '/public/images/default-profile.png';

import {
  thumbnailUrl,
  FetchChats,
} from '../../../utilities/routes';

function Chats(args)
{
  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    FetchChats().then((chats) => {
      setChatsLoaded(true);
      setChats(
        chats.map(chat => {
          if (chat.user_one.name != args.session.username) {
            return { id: chat.user_one.id, chat_id: chat.chat_id, name: chat.user_one.name + (chat.messages > 0 ? ` (${chat.messages})` : '') };
          }
          if (chat.user_two.name !== args.session.username) {
            return { id: chat.user_two.id, chat_id: chat.chat_id, name: chat.user_two.name + (chat.messages > 0 ? ` (${chat.messages})` : '') };
          }
        })
      );
    });
  }, []);

  useEffect(() => {
    const chat = document.getElementById(`${args.chat}_chat`);
    if (chat) {
      chat.click();
    }

  }, [chats]);

  return (
    <div className='chats'>
      <div className='chat-header' onClick={() => args.setShowCreateChat(true)}><i className='bi bi-person-plus'></i>&nbsp;Message Friend</div>
      {chatsLoaded ? chats.map(chat => (
        <div className='chat' onClick={() => args.HandleFetchConversation(chat.id)} id={`${chat.chat_id}_chat`} key={chat.id}>
          <img
            src={`${thumbnailUrl}/fs-api/thumbnail/${chat.id}`}
            onError={(img) => (img.target.src = DefaultProfileImage)}
            className='thumbnail'
            alt='thumbnail'
          />
          <span>{chat.name}</span>
          <i className='bi bi-chat-fill selected' id={chat.id} style={{display: 'none', float: 'right'}}/>
        </div>
      )) : <LoadingBar size='small' height={15}/>}
    </div>
  );
}
export default Chats;