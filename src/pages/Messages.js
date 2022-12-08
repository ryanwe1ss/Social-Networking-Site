import DefaultProfilePicture from "../images/default.png";
import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import {
  GetChats,
  SearchAccounts,
  Logout,
  RedirectPage,
  FetchThumbnail,
  GetConversation,
  SendMessage,
} from "../utilities/utilities";

function Messages()
{
  const accountId = parseInt(localStorage.getItem("accountId"));
  const username = localStorage.getItem("username");

  const [conversation, setConversation] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [thumbnails, setThumbnail] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    HandleGetChats();
    SearchAccounts(null, accountId).then((result) => {
      setSearchData(result);
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

  function HandleGetChats() {
    GetChats(accountId).then((chats) => {
      const users = chats.map(chat => {
        if (chat.user_one !== username) {
          return { id: chat.user_one_id, name: chat.user_one };
        }
        if (chat.user_two !== username) {
          return { id: chat.user_two_id, name: chat.user_two };
        }
      });
      setChats(users);
      HandleFetchThumbnails(users);
    })
  }

  function HandleFetchConversation(userId) {
    document.querySelectorAll(".selected").forEach(selected => {
      selected.style.display = "none";
    
    }); document.getElementById(userId).style.display = "block";

    GetConversation(accountId, userId).then((conversation) => {
      document.getElementById("message").disabled = false;

      setConversation(conversation.data);
      setChatId(conversation.chatId);
      setUserId(userId);
    })
  }

  function HandleSendMessage(message) {
    if (message.length < 1) return;

    const body = {
      chat_id: chatId,
      from_user: accountId,
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

  return (
    <div className="block">
      <div className="border-area">
        <div className="menu">
          <h1>NetConnect</h1>
          <a href={'/'} onClick={Logout}>Logout</a>
          <a href={`/profile?id=${accountId}`}>My Profile</a>

          <Dropdown
            id="search"
            options={searchData}
            placeholder="Search Network"
            onKeyUp={(event) => {
              SearchAccounts(event, accountId).then((query) => {
                setSearchData(query);
              });
            }}
            onChange={(event) => RedirectPage(event, searchData)}
            search
            selection
          />
          <hr/>
        </div>
        
        <div className="messaging">
          <div className="chats">
            <div className="add-chat"><label>Message New Friend</label></div>
            {chats.map(chat => (
              <div className="chat" onClick={() => { HandleFetchConversation(chat.id) }} key={chat.id}>
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
            <div className="chat-session">
              {conversation.map(message => (
                <div className="text-chat" key={message.id}>
                  {message.from == username ?
                    <div className="you">{message.message}</div> :
                    <div className="user">{message.message}</div>
                  }
                </div>
              ))}
            </div>

            <div className="message-box">
              <textarea id="message" disabled/>

              <div className="buttons">
                <input type="button" value="Send" onClick={
                  () => HandleSendMessage(document.getElementById("message").value) }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Messages;