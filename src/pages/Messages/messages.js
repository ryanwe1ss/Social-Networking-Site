import { useState, useEffect } from "react";

import DefaultProfilePicture from "../../images/default.png";
import SidePanel from "../../components/SidePanel/side-panel";
import LoadingBar from "../../components/LoadingBar/loading-bar";
import "./messages.scss";

import {
  FetchSession,
  FetchThumbnail,
  FetchConversation,
  SendMessage,
  FetchChats,
} from "../../utilities/utilities";

function Messages()
{
  const [conversation, setConversation] = useState([]);
  const [thumbnails, setThumbnail] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState();
  const [userId, setUserId] = useState();

  const [session, setSession] = useState({
    id: null,
    username: null,
  });

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
      HandleFetchChats(session);
    });
  }, []);

  function HandleFetchThumbnails(users) {
    users.forEach(user => {
      FetchThumbnail(user.id).then((thumbnail) => {
        setThumbnail(t => [...t, {
          id: user.id,
          thumbnail: thumbnail,
        }])
      })
    });
  }

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
      HandleFetchThumbnails(users);

      let timer = 0;
      const chatExists = setInterval(function() {
        const user = parseInt(location.search.split("id=")[1]);
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
    document.querySelectorAll(".selected").forEach(selected => {
      selected.style.display = "none";
    
    }); document.getElementById(userId).style.display = "block";

    FetchConversation(userId).then((conversation) => {
      document.getElementById("message").disabled = false;

      setConversation(conversation.messages);
      setChatId(conversation.chatId);
      setUserId(userId);

      const scroll = setInterval(function() {
        const conversation = document.getElementById("chat");
        
        if (conversation.innerText.length > 0) {
          conversation.scrollTop = conversation.scrollHeight;
          clearInterval(scroll);
        }

      }, 25);
    })
  }

  function HandleSendMessage(message) {
    if (message.trim().length < 1) return;

    const body = {
      chat_id: chatId,
      to_user: userId,
      message: message,
    };

    SendMessage(body).then((response) => {
      if (response.status === 200) {
        HandleFetchConversation(userId);
        document.getElementById("message").value = null;
      }
    })
  }

  if (session.id) {
    return (
      <div className="messages-container">
        <div className="outer-border">
          <SidePanel sessionId={session.id}/>
  
          <div className="messages">
            <div className="chats">
              <div className="chat-header">Message Friend</div>
              {chats.map(chat => (
                <div className="chat" onClick={() => { HandleFetchConversation(chat.id) }} id={`${chat.id}_chat`} key={chat.id}>
                  <img
                    src={thumbnails.filter(t => t.id == chat.id).map(t => t.thumbnail)}
                    onError={(img) => (img.target.src = DefaultProfilePicture)}
                    className="thumbnail"
                    alt="thumbnail"
                  />
                  <span>{chat.name}</span>
                  <i className="bi bi-chat-fill selected" id={chat.id} style={{display: "none", float: "right"}}/>
                </div>
              ))}
            </div>
  
            <div className="interface">
              <div className="chat-session" id="chat">
                {conversation.map(message => (
                  <div className="text-chat" key={message.id}>
                    {message.from == session.username ?
                      <div className="you">{message.message}</div> :
                      <div className="user">{message.message}</div>
                    }
                  </div>
                ))}
              </div>
  
              <div className="message-box">
                <textarea id="message" placeholder="Type Message Here" disabled/>
  
                <div className="buttons">
                  <button onClick={
                    () => HandleSendMessage(document.getElementById("message").value) }
                  ><i className='bi bi-arrow-right-circle-fill'/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  } else return <LoadingBar size="large"/>
}
export default Messages;