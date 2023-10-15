import { useEffect, useState } from 'react';
import { FetchNotifications, Logout } from '../../utilities/routes';

import SidePanelImage from '/public/images/sidepanel-logo.png';
import SidePanelIcon from '/public/images/sidepanel-icon.png';
import './side-panel.scss';

function SidePanel(args)
{
  const [showSidePanel, setShowSidePanel] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('showSidePanel') == null) {
      localStorage.setItem('showSidePanel', false);
      setShowSidePanel(false);

    } else {
      setShowSidePanel(JSON.parse(localStorage.getItem('showSidePanel')));
    }
  }, []);

  function ShowSidePanel() {
    localStorage.setItem('showSidePanel', !showSidePanel);
    setShowSidePanel(!showSidePanel);
  }

  if (args.session.type == 'admin') {
    return (
      <div className='side-panel' style={{'width': showSidePanel ? '61px' : '285px'}}>
        <div className={`side-bar ${showSidePanel && 'collapsed'}`}>

        <div className='hamburger' onClick={ShowSidePanel}>
            <div className='bi bi-list'></div>
          </div>

          <div className='area'>
            <img src={showSidePanel ? SidePanelIcon : SidePanelImage} id='sp-image' alt='logo'/>
          </div>

          <div className='labels'>
            <div>
              <a href='/statistics' className='bi bi-activity'> {!showSidePanel && 'Statistics'}</a>
            </div>
            <div>
              <a href='/reports' className='bi bi-flag-fill'> {!showSidePanel && 'Reports'}</a>
            </div>
            <div>
              <a href='/' onClick={Logout} className='bi bi-lock'> {!showSidePanel && 'Logout'}</a>
            </div>
          </div>
        </div>
      </div>
    );
  
  } else if (args.session.type == 'user') {
    const [notification, setNotificationCount] = useState([]);

    useEffect(() => {
      FetchNotifications(true).then((notifications) => {
        setNotificationCount(notifications);
      });
    }, []);

    return (
      <div className='side-panel' style={{'width': showSidePanel ? '61px' : '285px'}}>
        <div className={`side-bar ${showSidePanel && 'collapsed'}`}>

          <div className='hamburger' onClick={ShowSidePanel}>
            <div className='bi bi-list'></div>
          </div>

          <div className='area'>
            <img src={showSidePanel ? SidePanelIcon : SidePanelImage} id='sp-image' alt='logo'/>
          </div>

          <div className='labels'>
            <div>
              <a href='/feed' className='bi bi-image'> {!showSidePanel && 'Feed'}</a>
            </div>
            <div>
              <a href='/search' className='bi bi-search'> {!showSidePanel && 'Search'}</a>
            </div>
            <div className='sp-message'>
              <a href='/messages' className='bi bi-chat-left-text'> {!showSidePanel && 'Messages'}
                {notification.messages > 0 && (
                  <div
                    className='sp-badge'
                    style={{
                      padding: notification.messages > 9 && notification.messages < 99
                      ? '3px 3px'
                      : notification.messages > 99
                      ? '4px 3px' : '3px 6px'
                    }}
                  >
                    {notification.messages > 0 && notification.messages < 100
                      ? notification.messages : notification.messages > 99 
                      ? '99+' : null
                    }
                  </div>
                )}
              </a>
            </div>
            <div className='sp-notification'>
              <a href='/notifications' className='bi bi-bell'> {!showSidePanel && 'Notifications'}
                {notification.count > 0 && (
                  <div
                    className='sp-badge'
                    style={{
                      padding: notification.count > 9 && notification.count < 99
                      ? '3px 3px'
                      : notification.count > 99
                      ? '4px 3px' : '3px 6px'
                    }}
                  >
                    {notification.count > 0 && notification.count < 100
                      ? notification.count : notification.count > 99 
                      ? '99+' : null
                    }
                  </div>
                )}
              </a>
            </div>
            <div>
              <a href='/saved-posts' className='bi bi-bookmark'> {!showSidePanel && 'Saved Posts'}</a>
            </div>
            <div>
              <a href={`/profile/${args.session.username}`} className='bi bi-person-fill'> {!showSidePanel && 'Profile'}</a>
            </div>
            <div>
              <a href='/settings' className='bi bi-gear'> {!showSidePanel && 'Settings'}</a>
            </div>
            <div>
              <a href='/' onClick={Logout}><i className='bi bi-box-arrow-in-left'></i>{!showSidePanel && 'Logout'}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SidePanel;