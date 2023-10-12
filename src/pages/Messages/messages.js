import { useState, useEffect } from 'react';
import LoadingBar from '../../components/LoadingBar/loading-bar';

import DefaultProfileImage from '/public/images/default-profile.png';
import SidePanel from '../../components/SidePanel/side-panel';
import './messages.scss';

import {
  thumbnailUrl,
  FetchSession,
  FetchConversation,
  FetchChats,
} from '../../utilities/routes';

import { ShowBoxDialog } from '../../utilities/utilities';

export const webSocketUrl =
  process.env.CHAT_SERVER +
  (process.env.CS_API_USE_PORT_IN_URL == "true"
  ? `:${process.env.CHAT_SERVER_PORT}` : '');

function Messages()
{
  const [session, setSession] = useState([]);

  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [conversation, setConversation] = useState([]);

  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState();
  const [userId, setUserId] = useState();

  let chatSocket;

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === 'admin') window.location.href = '/statistics';
      
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchChats(session);
      setChatsLoaded(true);
    });
  }, []);

  function HandleFetchChats(session) {
    FetchChats().then((chats) => {
      const users = chats.map(chat => {
        if (chat.user_one !== session.username) {
          return { id: chat.user_one_id, name: chat.user_one };
        }
        if (chat.user_two !== session.username) {
          return { id: chat.user_two_id, name: chat.user_two };
        }
      });
      setChats(users);

      let timer = 0;
      const chatExists = setInterval(function() {
        const user = parseInt(location.search.split('id=')[1]);
        const chat = document.getElementById(`${user}_chat`);

        if (chat) {
           chat.click();
           clearInterval(chatExists);
        
        } else if (!user) {
          clearInterval(chatExists);

        } else {
          if (timer > 100) {
            clearInterval(chatExists);
          
          } timer += 1;
        }

     }, 100);
    })
  }

  function HandleFetchConversation(userId) {
    const messages = document.getElementById('chat');

    document.querySelectorAll('.selected').forEach(selected => {
      selected.parentNode.style.pointerEvents = 'auto';
      selected.style.display = 'none';
    });
    
    document.getElementById(userId).style.display = 'block';
    document.getElementById(userId).parentNode.style.pointerEvents = 'none';

    FetchConversation(userId).then((conversation) => {
      document.getElementById('message').disabled = false;

      setConversation(conversation.messages);
      setChatId(conversation.chatId);
      setUserId(userId);

      setTimeout(() => {
        if (messages.innerText.length > 0) {
          messages.scrollTop = messages.scrollHeight;
        }
      }, 0);

      if (conversation.chatId == chatId) return;
      chatSocket = new WebSocket(`${webSocketUrl}/cs-api/?chatId=${conversation.chatId}`);

      chatSocket.onmessage = (event) => {
        setConversation(conversation => [...conversation, { ...JSON.parse(event.data), id: new Date().getTime() }]);
        setTimeout(() => messages.scrollTop = messages.scrollHeight, 0);
      };

      document.getElementById('send').addEventListener('click', () => HandleSendMessage(chatSocket, conversation, userId));
      document.querySelectorAll('.chat').forEach(chat => {
        chat.addEventListener('click', () => HandleCloseChat(chatSocket, conversation, chatId));
      });
    });
  }

  function HandleSendMessage(chatSocket, conversation, userId) {
    const message = document.getElementById('message').value;
    if (message.length > 500) {
      ShowBoxDialog('Message must be less than 500 characters');
      return;
    }

    if (chatSocket.readyState == WebSocket.OPEN && message.length > 0) {
      const newMessage = {
        chat_id: conversation.chatId,
        to: userId,
        from: session.username,
        to_user: userId,
        from_user: session.id,
        message: message,
        id: new Date().getTime(),
      };

      chatSocket.send(JSON.stringify(newMessage));
      setConversation(conversation => [...conversation, newMessage]);
      document.getElementById('message').value = null;
    }
  }

  function HandleCloseChat(chatSocket, conversation, chatId) {
    if (chatId !== conversation.chatId) {
      chatSocket.close();
    }
  }

  if (session.id && session.type === 'user') {
    return (
      <div className='messages-container'>
        <div className='outer-border'>
          <SidePanel session={session}/>
  
          <div className='messages'>
            <div className='chats'>
              <div className='chat-header'>Message Friend</div>
              {chatsLoaded ? chats.map(chat => (
                <div className='chat' onClick={() => { HandleFetchConversation(chat.id) }} id={`${chat.id}_chat`} key={chat.id}>
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
  
            <div className='interface'>
              <div className='chat-session' id='chat'>
                {conversation.map(message => (
                  <div className='text-chat' key={message.id}>
                    {message.from == session.username ?
                      <div className='you'>{message.message}</div> :
                      <div className='user'>{message.message}</div>
                    }
                  </div>
                ))
                }
              </div>
  
              <div className='message-box'>
                <textarea id='message' placeholder='Type Message Here' disabled/>
  
                <div className='buttons'>
                  <button id='send'>
                    <i className='bi bi-arrow-right-circle-fill'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size='large' height={15}/>
}
export default Messages;