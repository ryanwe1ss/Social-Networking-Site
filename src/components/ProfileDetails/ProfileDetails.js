import { useEffect, useState } from "react";
import { FetchSession } from "../../utilities/utilities";

import LoadingBar from "../LoadingBar/loading-bar";
import Posts from "../Posts/posts";
import "./profile-details.scss";

function ProfileDetails(props) {

  const [session, setSession] = useState({
    id: null,
    username: null,
  });

  const profileId = parseInt(location.search.split("id=")[1]);
  const username = props.profile.length > 0 ? props.profile[0].username : null;
  const isFollowing = props.profile.length > 0 ? props.profile[0].is_following : false;
  const isPrivate = props.profile.length > 0 ? props.profile[0].is_private : false;

  useEffect(() => {
    FetchSession().then((session) => {
      setSession({ id: session.id, username: session.username });
    });
  }, []);

  if (session.id) {
    if (props.isDisabled) {
      return (
        <div className="information">
          <h4>
            <i className="bi bi-info-circle"/>
            &nbsp;This profile doesn't exist or has been disabled
          </h4>
        </div>
      );
  
    } else if (!isFollowing && session.id !== profileId && isPrivate) {
      return (
        <div className="information">
          <h4>
            <i className="bi bi-lock-fill"/>Private Account
          </h4>
        </div>
      );
  
    } else if (props.profile.length == 0) {
      return (
        <div className="information">
          <LoadingBar size="large"/>
        </div>
      );
    
    } else {
      if (props.edit) {
        return (
          <div className="information" style={{backgroundColor: "lightblue"}}>
            {props.profile.map(profile => (
              <div key={"profile"}>
                <h6>Account Information</h6>
                <div className="left-labels">
                  <i className="bi bi-person-fill"> Name:</i><br/>
                  <i className="bi bi-calendar-minus"> Member Since:</i><br/>
                  <i className="bi bi-calendar-plus"> Last Updated:</i><br/>
                </div>
                <div className="right-assertions">
                  <span><input type="text" id="name" defaultValue={profile.name}/></span><br/>
                  <span>{new Date(profile.date_created).toLocaleString()}</span><br/>
                  <span>{new Date(profile.date_updated).toLocaleString()}</span><br/>
                </div>
                <h6>Basic Information</h6>
                <div className="left-labels">
                <i className="bi bi-gender-ambiguous"> Gender:<br/></i>
                  <i className="bi bi-activity"> Status:<br/></i>
                  <i className="bi bi-balloon"> Birthday:<br/></i>
                  <i className="bi bi-building"> School:<br/></i>
                  <i className="bi bi-book"> Major:<br/></i>
                </div>
                <div className="right-assertions">
                  <span>
                    <select id="gender" defaultValue={profile.gender}>
                      <option>Male</option>
                      <option>Female</option>
                    </select><br/></span>
                  <span>
                    <select id="status" defaultValue={profile.status}>
                      <option>Single</option>
                      <option>In Relationship</option>
                      <option>Married</option>
                    </select><br/></span>
                  <span>
                    <input type="date" id="birthdate" defaultValue={new Date(
                      profile.birthdate).toISOString().replace(/T.*/,'').split('-').join('-')}
                    /><br/>
                  </span>
                  <span><input type="text" id="school" defaultValue={profile.school}/><br/></span>
                  <span><input type="text" id="major" defaultValue={profile.major}/><br/></span>
                </div>
                <h6>Contact Information</h6>
                <div className="left-labels">
                  <i className="bi bi-envelope"> Email:</i><br/>
                  <i className="bi bi-phone"> Phone Number:</i><br/>
                </div>
                <div className="right-assertions">
                  <span><input type="text" id="email" defaultValue={profile.email}/></span><br/>
                  <span><input type="text" id="phone_number" defaultValue={profile.phone_number}/></span><br/>
                </div>
                <hr/>
                <div className="bio">
                  <textarea id="bio" defaultValue={profile.bio} placeholder="Type Bio Here..."/>
                </div>
              </div>
            ))}
            <Posts username={username} editMode={true} saved={props.saved} setSaved={props.setSaved}/>
        </div>
        );
      
      } else {
        return (
          <div className="information">
            {props.profile.map(profile => (
              <div key={"profile"}>
                <h6>Account Information</h6>
                <div className="left-labels">
                  <i className="bi bi-person-fill"> Name:</i><br/>
                  <i className="bi bi-calendar-minus"> Member Since:</i><br/>
                  <i className="bi bi-calendar-plus"> Last Updated:</i><br/>
                </div>
                <div className="right-assertions">
                  <span>{profile.name}</span><br/>
                  <span>{new Date(profile.date_created).toLocaleString()}</span><br/>
                  <span>{new Date(profile.date_updated).toLocaleString()}</span><br/>
                </div>
                <h6>Basic Information</h6>
                <div className="left-labels">
                  <i className="bi bi-gender-ambiguous"> Gender:<br/></i>
                  <i className="bi bi-activity"> Status:<br/></i>
                  <i className="bi bi-balloon"> Birthday:<br/></i>
                  <i className="bi bi-building"> School:<br/></i>
                  <i className="bi bi-book"> Major:<br/></i>
                </div>
                <div className="right-assertions">
                  <span>{profile.gender}<br/></span>
                  <span>{profile.status}<br/></span>
                  <span>{new Date(profile.birthdate).toLocaleDateString()}<br/></span>
                  <span>{profile.school}<br/></span>
                  <span>{profile.major}<br/></span>
                </div>
                <h6>Contact Information</h6>
                <div className="left-labels">
                  <i className="bi bi-envelope"> Email:</i><br/>
                  <i className="bi bi-phone"> Phone Number:</i><br/>
                </div>
                <div className="right-assertions">
                  <span>{profile.email}</span><br/>
                  <span>{profile.phone_number}</span><br/>
                </div>
                <hr/>
                <div className="bio">{profile.bio == null ? 'No Bio Yet...' : profile.bio}</div>
              </div>
            ))}
            <Posts username={username} editMode={false} saved={props.saved} setSaved={props.setSaved}/>
          </div>
        );
      }
    }
  
  } else return <LoadingBar size="large"/>
}
export default ProfileDetails;