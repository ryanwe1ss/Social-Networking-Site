import { DeactivateAccount, DeleteAccount } from "../../../utilities/utilities";

function ManageAccount()
{
  function HandleDeactivateAccount() {
    DeactivateAccount().then((response) => {
      if (response.status != 200) {
        return document.getElementById("deactivate-account-error").innerHTML =
          "A Problem Occured While Deactivating Your Account. Please Try Again Later.";
      }

      document.getElementById("deactivate-account-error").innerHTML =
          "Your Account Has Been Deactivated. You Will Be Redirected To The Home Page In 5 Seconds.";

      setTimeout(() => {
        window.location.href = "/";

      }, 5000);
    });
  }

  function HandleDeleteAccount() {
    DeleteAccount().then((response) => {
      if (response.status != 200) {
        return document.getElementById("delete-account-error").innerHTML =
          "A Problem Occured While Deleting Your Account. Please Try Again Later.";
      }

      document.getElementById("delete-account-error").innerHTML =
          "Your Account Has Been Deleted. You Will Be Redirected To The Home Page In 5 Seconds.";

      setTimeout(() => {
        window.location.href = "/";

      }, 5000);
    });
  }

  return (
    <div className="settings-manage-account-container">
      <div className="deactivate">
        <p>Deactivating your account will leave it permanently disabled and getting it back means you would need to contact an administrator.</p>
        <button className="btn btn-danger" onClick={() => {
          document.querySelector(".confirmation-deactivate").style.display = "block";
          document.querySelector(".btn-danger").style.display = "none";

        }}>Deactivate</button>

        <div className="confirmation-deactivate" style={{display: "none"}}>
          <p>Are you sure you want to deactivate your account?</p>
          <a className="btn btn-danger" onClick={HandleDeactivateAccount}>Yes</a>&nbsp;&nbsp;

          <button className="btn btn-secondary" onClick={() => {
            document.querySelector(".confirmation-deactivate").style.display = "none";
            document.querySelector(".btn-danger").style.display = "block";

          }}>No</button>
          <div id="deactivate-account-error"/>
        </div>
      </div><hr/>

      <div className="delete">
        <p>Deleting your account will permanently remove it from the system and you will not be able to get it back.</p>
        <button className="btn btn-danger delete-account" onClick={() => {
          document.querySelector(".confirmation-delete").style.display = "block";
          document.querySelector(".delete-account").style.display = "none";

        }}>Delete</button>

        <div className="confirmation-delete" style={{display: "none"}}>
          <p>Are you sure you want to delete your account?</p>
          <a className="btn btn-danger" onClick={HandleDeleteAccount}>Yes</a>&nbsp;&nbsp;

          <button className="btn btn-secondary" onClick={() => {
            document.querySelector(".confirmation-delete").style.display = "none";
            document.querySelector(".delete-account").style.display = "block";

          }}>No</button>
          <div id="delete-account-error"/>
        </div>
      </div>
    </div>
  );
}
export default ManageAccount;