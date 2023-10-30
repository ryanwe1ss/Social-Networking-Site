import { useState, useEffect, useRef } from 'react';
import { FetchSession, PerformLogin } from '../../utilities/routes';
import './login.scss';

function Login()
{
  const [response, setResponse] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    FetchSession(true).then((session) => {
      if (session) {
        switch (session.type) {
          case 'admin':
            window.location.href = '/statistics';
            break;

          case 'user':
            window.location.href = `/profile/${session.username}`;
            break;
        }
      }
    });

    passwordRef.current.addEventListener('keyup', (event) => {
      if (event.key == 'Enter') HandleLogin(event);
    });
  }, []);

  function HandleLogin(event) {
    event.target.disabled = true;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    PerformLogin(username, password).then((response) => {
      localStorage.setItem('sessionToken', response.token);

      if (response.status == 200) {
        if (response.type == 'admin') return window.location.href = '/statistics';
        window.location.href = `/profile/${response.username}`;

      } else if (response.status == 504) {
        setResponse('Error connecting to server. Please contact an administrator.');
      
      } else {
        setResponse('Login failed, try again');
        passwordRef.current.value = null;
      }
    
    }); event.target.disabled = false;
  }

  return (
    <center>
      <div className='login-form'>
        <h1>Login</h1>
        <div className='row'>
          <div className='form-group'>
            <label>Username</label>
            <input type='text' ref={usernameRef} className='form-control'/>
          </div>
        </div><br/>

        <div className='row'>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' ref={passwordRef} className='form-control'/>
          </div>
        </div>
        <input type='button' className='btn btn-primary' value='Login' onClick={HandleLogin}/>
        <div id='response'>
          {response}
        </div>

        <div className='footer'>
          Not registered?<br/><a href='/register'>Click here</a>
        </div>
      </div>
    </center>
  );
}
export default Login;