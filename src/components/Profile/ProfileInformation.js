function ProfileInformation(params)
{
  if (params.isDisabled) {
    return (
      <div className="information">
        This profile doesn't exist or has been disabled...
      </div>
    );

  } else if (params.profileData.length == 0) {
    return (
      <div className="information">
        <div className="spinner"/>
      </div>
    );
  
  } else {
    return (
      <div className="information">
        {params.profileData.map(profile => (
          <div key={"profile"}>
            <h6>Account Information</h6>
            <div className="left-labels">
              <span>Name:</span><br/>
              <span>Member Since:</span><br/>
              <span>Last Updated:</span><br/>
            </div>
            <div className="right-assertions">
              <span>{profile.name}</span><br/>
              <span>{new Date(profile.date_created).toLocaleString()}</span><br/>
              <span>{new Date(profile.date_updated).toLocaleString()}</span><br/>
            </div>
            <h6>Basic Information</h6>
            <div className="left-labels">
              <span>Gender:<br/></span>
              <span>Status:<br/></span>
              <span>Birthday:<br/></span>
              <span>School:<br/></span>
              <span>Concentration:<br/></span>
            </div>
            <div className="right-assertions">
              <span>{profile.gender}<br/></span>
              <span>{profile.status}<br/></span>
              <span>{new Date(profile.birthdate).toLocaleDateString()}<br/></span>
              <span>{profile.school}<br/></span>
              <span>{profile.concentration}<br/></span>
            </div>
            <h6>Contact Information</h6>
            <div className="left-labels">
              <span>Email:</span><br/>
              <span>Phone Number:</span><br/>
            </div>
            <div className="right-assertions">
              <span>{profile.email}</span><br/>
              <span>{profile.phone_number}</span><br/>
            </div>
            <hr/>
            <div className="bio">{profile.bio}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default ProfileInformation;