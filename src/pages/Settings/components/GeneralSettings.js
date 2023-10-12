import { useEffect, useState } from "react";
import { UpdatePrivacy, UpdatePublicMessaging } from "../../../utilities/routes";

function GeneralSettings(args)
{
  const [isPrivate, setPrivate] = useState(false);
  const [isPublicMessaging, setPublicMessaging] = useState(false);

  useEffect(() => {
    if (args.account.is_private) setPrivate(true);
    if (args.account.public_messaging) setPublicMessaging(true);
  }, []);

  function HandleUpdateAccountPrivacy(type) {
    UpdatePrivacy(type).then(response => {
      if (response.status === 200) {
        setPrivate(!isPrivate);
      }
    });
  }

  function HandleUpdatePublicMessaging(type) {
    UpdatePublicMessaging(type).then(response => {
      if (response.status === 200) {
        setPublicMessaging(!isPublicMessaging);
      }
    });
  }

  return (
    <div className="settings-general-container">
      <section>
        <input
          type="button"
          style={{backgroundColor: isPrivate ? 'rgb(0, 187, 0)' : 'red'}}
          value={isPrivate ? 'Enabled' : 'Disabled'}
          onClick={() => HandleUpdateAccountPrivacy(!isPrivate)}
        />

        <label>Private Account</label>
      </section>

      <section>
        <input
          type="button"
          style={{backgroundColor: isPublicMessaging ? 'rgb(0, 187, 0)' : 'red'}}
          value={isPublicMessaging ? 'Enabled' : 'Disabled'}
          onClick={() => HandleUpdatePublicMessaging(!isPublicMessaging)}
        />
        <label>Public Messaging</label>
      </section>
    </div>
  );
}
export default GeneralSettings;