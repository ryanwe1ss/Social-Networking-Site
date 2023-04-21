import LoadingBar from "../LoadingBar/loading-bar";
import Posts from "../Posts/posts";
import "./profile-details.scss";

function ProfileDetails(args) {

  const profileId = parseInt(location.search.split("id=")[1]);
  const username = Object.keys(args.profile).length > 0 ? args.profile.username : null;
  const isFollowing = Object.keys(args.profile).length > 0 ? args.profile.is_following : false;
  const isPrivate = Object.keys(args.profile).length > 0 ? args.profile.is_private : false;

  if (args.session.id) {
    if (args.isDisabled) {
      return (
        <div className="information">
          <h4>
            <i className="bi bi-info-circle"/>
            &nbsp;This profile doesn't exist or has been disabled
          </h4>
        </div>
      );
  
    } else if (!isFollowing && args.session.id !== profileId && args.session.type !== "admin" && isPrivate) {
      return (
        <div className="information">
          <h4>
            <i className="bi bi-lock-fill"/>Private Account
          </h4>
        </div>
      );
  
    } else if (args.profile.length == 0) {
      return (
        <div className="information">
          <LoadingBar size="large"/>
        </div>
      );
    
    } else {
      if (args.edit) {
        return (
          <div className="information" style={{backgroundColor: "#537699"}}>
            <div>
              <h6>Account Information</h6>
              <div className="left-labels">
                <i className="bi bi-person-fill"> Name:</i><br/>
                <i className="bi bi-calendar-minus"> Member Since:</i><br/>
                <i className="bi bi-calendar-plus"> Last Updated:</i><br/>
              </div>
              <div className="right-assertions">
                <span><input type="text" id="name" defaultValue={args.profile.name}/></span><br/>
                <span>{new Date(args.profile.date_created).toLocaleString()}</span><br/>
                <span>{new Date(args.profile.date_updated).toLocaleString()}</span><br/>
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
                  <select id="gender" defaultValue={args.profile.gender}>
                    <option>Male</option>
                    <option>Female</option>
                  </select><br/></span>
                <span>
                  <select id="status" defaultValue={args.profile.status}>
                    <option>Single</option>
                    <option>In Relationship</option>
                    <option>Married</option>
                  </select><br/></span>
                <span>
                  <input type="date" id="birthdate" defaultValue={new Date(
                    args.profile.birthdate).toISOString().replace(/T.*/,'').split('-').join('-')}
                  /><br/>
                </span>
                <span><input type="text" id="school" defaultValue={args.profile.school}/><br/></span>
                <span><input type="text" id="major" defaultValue={args.profile.major}/><br/></span>
              </div>
              <h6>Contact Information</h6>
              <div className="left-labels">
                <i className="bi bi-envelope"> Email:</i><br/>
                <i className="bi bi-phone"> Phone Number:</i><br/>
              </div>
              <div className="right-assertions">
                <span><input type="text" id="email" defaultValue={args.profile.email}/></span><br/>
                <span><input type="text" id="phone_number" defaultValue={args.profile.phone_number}/></span><br/>
              </div>
              <hr/>
              <div className="bio">
                <textarea id="bio" defaultValue={args.profile.bio} placeholder="Type Bio Here..."/>
              </div>
            </div>
            <Posts
              session={args.session}
              username={username}
              editMode={true}
              saved={args.saved}
              setSaved={args.setSaved}
            />
        </div>
        );
      
      } else {
        return (
          <div className="information">
            <div>
              <h6>Account Information</h6>
              <div className="left-labels">
                <i className="bi bi-person-fill"> Name:</i><br/>
                <i className="bi bi-calendar-minus"> Member Since:</i><br/>
                <i className="bi bi-calendar-plus"> Last Updated:</i><br/>
              </div>
              <div className="right-assertions">
                <span>{args.profile.name}</span><br/>
                <span>{new Date(args.profile.date_created).toLocaleString()}</span><br/>
                <span>{new Date(args.profile.date_updated).toLocaleString()}</span><br/>
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
                <span>{args.profile.gender}<br/></span>
                <span>{args.profile.status}<br/></span>
                <span>{new Date(args.profile.birthdate).toLocaleDateString()}<br/></span>
                <span>{args.profile.school}<br/></span>
                <span>{args.profile.major}<br/></span>
              </div>
              <h6>Contact Information</h6>
              <div className="left-labels">
                <i className="bi bi-envelope"> Email:</i><br/>
                <i className="bi bi-phone"> Phone Number:</i><br/>
              </div>
              <div className="right-assertions">
                <span>{args.profile.email}</span><br/>
                <span>{args.profile.phone_number}</span><br/>
              </div>
              <hr/>
              <div className="bio">{args.profile.bio == null ? 'No Bio Yet...' : args.profile.bio}</div>
            </div>
            <Posts
              session={args.session}
              username={username}
              editMode={false}
              saved={args.saved}
              setSaved={args.setSaved}
            />
          </div>
        );
      }
    }
  
  } else return <LoadingBar size="large"/>
}
export default ProfileDetails;