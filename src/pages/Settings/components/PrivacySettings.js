function PrivacySettings(params) {
  return (
    <div className="privacy-settings">
      <input
        type="button"
        className="private-btn"
        style={{backgroundColor: params.isPrivate ? 'rgb(0, 187, 0)' : 'red'}}
        value={params.isPrivate ? 'Enabled' : 'Disabled'}
        onClick={() => params.UpdateAccountType(!params.isPrivate)}
      />

      <label>Private Account</label>
    </div>
  );
}
export default PrivacySettings;