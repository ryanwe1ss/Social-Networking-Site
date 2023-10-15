function Conversation(args)
{
  return (
    <div className='interface'>
      <div className='chat-session' id='chat'>
        {args.conversation.map(message => (
          <div className='text-chat' key={message.id}>
            {message.from == args.session.username ?
              <div className='you'>{message.message}</div> :
              <div className='user'>{message.message}</div>
            }
          </div>
        ))}
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
  );
}
export default Conversation;