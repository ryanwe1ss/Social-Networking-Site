import { useState } from "react";

import { UploadPost } from "../../../utilities/utilities";
import LoadingBar from "../../LoadingBar/loading-bar";

function PostPictureModal(args)
{
  const popup = document.querySelector(".popup-box");
  const [uploaded, setUploaded] = useState(false);
  const [posted, setPosted] = useState(false);

  function DisplayImage(event) {
    const image = event.target.files[0];

    if (image) {
      const reader = new FileReader();
      setUploaded(true);

      reader.onload = (event) => {
        document.getElementById("preview").src = event.target.result;
      }
      reader.readAsDataURL(image);
    
    } else {
      document.getElementById("preview").src = null;
      setUploaded(false);
    }
  }

  function HandlePostImage(event, description, comment, like, image) {
    event.target.disabled = true;

    UploadPost(description, comment, like, image).then((response) => {
      if (response.status == 200) {
        setPosted(true);

        setTimeout(() => {
          document.getElementById("postModal").style.display = "none";
          args.setRefresh(args.refresh + 1);
          args.setLoaded(false);
          setPosted(false);

        }, 1000);
      
      } else {
        popup.style.display = "block";
        popup.innerHTML =  "Problem Uploading Post. Error: " + response.status;
        setTimeout(() => popup.style.display = "none", 6000);
      }
    });
  }
  
  return (
    <div id="postModal" className="modal">
      <div className="modal-content">
        <header>
          <h4>Post Picture</h4>
          <span onClick={() => { document.getElementById("postModal").style.display = "none"}} id="close">&times;</span>
        </header><hr/>

        {args.posted ? <LoadingBar size="large" height={15}/> :

          <div className="post-block">
            <div className="post-form">
              <div className="row">
                <div className="form-group">
                  <input className="form-control" id="description" type="text" placeholder="Write a Description..."/><br/>
                  
                  <input type="checkbox" id="comment" defaultChecked={true}/>
                  <label>&nbsp; Enable Commenting?</label>

                  <span className="gap"/>
                  
                  <input type="checkbox" id="like" defaultChecked={true}/>
                  <label>&nbsp; Enable Liking?</label>
                </div>
              </div>
            </div><hr/>

            <div className="post-image">
              <div className="upload">
                <input type="file" id="selectImage" onChange={DisplayImage}/>
                <button
                  id="selectImageButton"
                  className="btn btn-secondary"
                  onClick={() => { document.getElementById("selectImage").click()}}
                  >Select Image
                </button>
                <button
                  id="postImageButton"
                  className="btn btn-secondary"
                  onClick={(event) => HandlePostImage(
                    event,
                    document.getElementById("description").value,
                    document.getElementById("comment").checked,
                    document.getElementById("like").checked,
                    document.getElementById("selectImage").files[0]
                  )}
                  disabled={!uploaded}
                  >Create Post
                </button>
              </div>
            </div>

            <div className="preview-block">
              <img id="preview"/>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default PostPictureModal;