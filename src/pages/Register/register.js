import { useEffect, useRef, useState } from 'react';
import { FetchSession, PerformLogin, PerformRegister } from '../../utilities/routes';
import './register.scss';

function Register()
{
  const [response, setResponse] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

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
  }, []);

  function HandleRegister(event) {
    event.target.disabled = true;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmRef.current.value;

    PerformRegister(username, password, confirmPassword).then((response) => {
      switch (response.status) {
        case 200:
          PerformLogin(username, password).then((response) => {
            localStorage.setItem('sessionToken', response.token);
            location.href = `/profile/${username}`;
          });
          break;
      
        case 409:
          setResponse('Username already taken');
          break;
      
        case 500:
          setResponse('Failed to register, try again');
          break;
      
        case 401:
          setResponse('Passwords do not match');
          break;
      
        case 400:
          setResponse('Username and Password must be 5-20 characters');
          break;
      
        case 403:
          setResponse('Permission error creating your user folder. Please contact administrator');
          break;
      
        case 429:
          setResponse('Too many accounts registered');
          break;
      
        case 502:
          setResponse('Server was unable to communicate with the file server');
          break;
      
      } event.target.disabled = false;
    });
  }

  return (
    <center>
      <div className='register-form'>
        <h1>Register</h1>
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
        </div><br/>

        <div className='row'>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input type='password' ref={confirmRef} className='form-control'/>
          </div>
        </div>
        <input type='button' onClick={HandleRegister} className='btn btn-primary' value='Register Account'/>
        <div id='response'>
          {response}
        </div>

        <div className='footer'>
          Already registered?<br/><a href='/'>Click here</a>
        </div>
      </div>
    </center>
  );
}
export default Register;