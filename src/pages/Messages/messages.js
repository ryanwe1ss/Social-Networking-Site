import { useState, useEffect, useRef } from 'react';
import LoadingBar from '../../components/LoadingBar/loading-bar';

import SidePanel from '../../components/SidePanel/side-panel';
import './messages.scss';

import {
  FetchSession,
  FetchConversation,
} from '../../utilities/routes';
import { ShowBoxDialog } from '../../utilities/utilities';

import Chats from './components/chats';
import CreateChat from './components/create-chat';
import Conversation from './components/conversation';

export const webSocketUrl =
  process.env.CHAT_SERVER +
  (process.env.CS_API_USE_PORT_IN_URL == 'true'
  ? `:${process.env.CHAT_SERVER_PORT}` : '');

function Messages()
{
  const chat = location.search.split('chat=')[1];
  let chatSocket;

  const chatRef = useRef(null);
  const messageRef = useRef(null);

  const [session, setSession] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type == 'admin') return window.location.href = '/statistics';
      setSession({ id: session.id, username: session.username, type: session.type });
    });
  }, []);

  function HandleFetchConversation(userId) {
    const messages = chatRef.current;

    document.querySelectorAll('.selected').forEach(selected => {
      selected.parentNode.style.pointerEvents = 'auto';
      selected.style.display = 'none';
    });
    
    document.getElementById(userId).style.display = 'block';
    document.getElementById(userId).parentNode.style.pointerEvents = 'none';

    FetchConversation(userId).then((conversation) => {
      const activeMessaging = !conversation.public_messaging && !conversation.is_following;
      if (activeMessaging) {
        ShowBoxDialog('You do not follow this user and they do not allow public messaging');
      
      } messageRef.current.disabled = activeMessaging;

      setConversation(conversation.messages);
      setChatId(conversation.chat_id);

      setTimeout(() => {
        if (messages.innerText.length > 0) {
          messages.scrollTop = messages.scrollHeight;
        }
      }, 0);

      if (conversation.chat_id == chatId) return;
      chatSocket = new WebSocket(`${webSocketUrl}/cs-api/?chatId=${conversation.chat_id}`);
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
    const message = messageRef.current.value;
    if (message.length > 500) {
      ShowBoxDialog('Message must be less than 500 characters');
      return;
    }

    if (chatSocket.readyState == WebSocket.OPEN && message.length > 0 && conversation) {
      const newMessage = {
        chat_id:   conversation.chat_id,
        to:        userId,
        from:      session.username,
        to_user:   userId,
        from_user: session.id,
        message:   message,
        id:        new Date().getTime(),
      };

      chatSocket.send(JSON.stringify(newMessage));
      setConversation(conversation => [...conversation, newMessage]);
      messageRef.current.value = null;
    }
  }

  function HandleCloseChat(chatSocket, conversation, chatId) {
    if (chatId != conversation.chatId) {
      chatSocket.close();
    }
  }

  if (session.id && session.type == 'user') {
    return (
      <div className='messages-container'>
        <div className='outer-border'>
          <SidePanel session={session}/>
  
          <div className='messages'>
            <Chats session={session} chat={chat} setShowCreateChat={setShowCreateChat} HandleFetchConversation={HandleFetchConversation}/>
            <Conversation session={session} conversation={conversation} messageRef={messageRef} chatRef={chatRef}/>
          </div>

          {showCreateChat && <CreateChat setShowCreateChat={setShowCreateChat} />}
        </div>
      </div>
    );
  
  } else return <LoadingBar size='large' height={15}/>
}
export default Messages;