function PrivacySettings(args) {
  return (
    <div className="settings-privacy-container">
      <input
        type="button"
        className="private-btn"
        style={{backgroundColor: args.isPrivate ? 'rgb(0, 187, 0)' : 'red'}}
        value={args.isPrivate ? 'Enabled' : 'Disabled'}
        onClick={() => args.HandleUpdateAccountType(!args.isPrivate)}
      />

      <label>Private Account</label>
    </div>
  );
}
export default PrivacySettings;