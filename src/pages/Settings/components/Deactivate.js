import { DeactivateAccount } from "../../../utilities/utilities";

function Deactivate()
{
  return (
    <div className="settings-deactivate-container">
      <p>Deactivating your account will leave it permanently disabled and getting it back means you would need to contact an administrator.</p><hr/>
      <button className="btn btn-danger" onClick={() => {
        document.querySelector(".confirmation").style.display = "block";
        document.querySelector(".btn-danger").style.display = "none";

      }}>Deactivate</button>

      <div className="confirmation" style={{display: "none"}}>
        <p>Are you sure you want to deactivate your account?</p>
        <a href="/" className="btn btn-danger" onClick={DeactivateAccount}>Yes</a>&nbsp;&nbsp;

        <button className="btn btn-secondary" onClick={() => {
          document.querySelector(".confirmation").style.display = "none";
          document.querySelector(".btn-danger").style.display = "block";

        }}>No</button>
       </div>
    </div>
  );
}
export default Deactivate;