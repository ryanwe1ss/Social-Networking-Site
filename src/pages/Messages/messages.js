import { useState, useEffect } from "react";
import LoadingBar from "../../components/LoadingBar/loading-bar";

import SidePanel from "../../components/SidePanel/side-panel";
import Footer from "../../components/Footer/footer";
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
  const [session, setSession] = useState([]);

  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [thumbnails, setThumbnail] = useState([]);

  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    FetchSession().then((session) => {
      if (session.type === "admin") window.location.href = "/statistics";
      
      setSession({ id: session.id, username: session.username, type: session.type });
      HandleFetchChats(session);
      setChatsLoaded(true);
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

      const convScroll = setInterval(function() {
        const messages = document.getElementById("chat");
        
        if (messages.innerText.length > 0) {
          messages.scrollTop = messages.scrollHeight;
          clearInterval(convScroll);
        }

      }, 0);
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

  if (session.id && session.type === "user") {
    return (
      <div className="messages-container">
        <div className="outer-border">
          <SidePanel session={session}/>
  
          <div className="messages">
            <div className="chats">
              <div className="chat-header">Message Friend</div>
              {chatsLoaded ? chats.map(chat => (
                <div className="chat" onClick={() => { HandleFetchConversation(chat.id) }} id={`${chat.id}_chat`} key={chat.id}>
                  <img
                    src={thumbnails.filter(t => t.id == chat.id).map(t => t.thumbnail)}
                    onError={(img) => (img.target.src = `${process.env.PUBLIC_URL}/images/default-profile.png`)}
                    className="thumbnail"
                    alt="thumbnail"
                  />
                  <span>{chat.name}</span>
                  <i className="bi bi-chat-fill selected" id={chat.id} style={{display: "none", float: "right"}}/>
                </div>
              )) : <LoadingBar size="small" height={15}/>}
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
                ))
                }
              </div>
  
              <div className="message-box">
                <textarea id="message" placeholder="Type Message Here" disabled/>
  
                <div className="buttons">
                  <button id="send" onClick={() => HandleSendMessage(document.getElementById("message").value)}>
                    <i className='bi bi-arrow-right-circle-fill'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  
  } else return <LoadingBar size="large" height={15}/>
}
export default Messages;