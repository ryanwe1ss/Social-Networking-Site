import { useState, useRef } from 'react';
import { UploadPost } from '../../../../../utilities/routes';
import { ShowBoxDialog } from '../../../../../utilities/utilities';
import LoadingBar from '../../../../../components/LoadingBar/loading-bar';

function PostPictureModal(args)
{
  const [uploaded, setUploaded] = useState(false);
  
  const previewImageRef = useRef(null);
  const descriptionRef = useRef(null);
  const commentRef = useRef(null);
  const likeRef = useRef(null);
  const imageRef = useRef(null);

  function DisplayImage(event) {
    const image = event.target.files[0];

    if (image) {
      const reader = new FileReader();
      setUploaded(true);

      reader.onload = (event) => previewImageRef.current.src = event.target.result;
      reader.readAsDataURL(image);
    
    } else {
      previewImageRef.current.src = null;
      setUploaded(false);
    }
  }

  function HandlePostImage(event) {
    event.target.disabled = true;
    ShowBoxDialog('Uploading Post...');

    UploadPost(
      descriptionRef.current.value,
      commentRef.current.checked,
      likeRef.current.checked,
      imageRef.current.files[0]

    ).then((response) => {
      if (response.status == 200) {
        setTimeout(() => {
          args.setShowPostModal(false);
          location.reload();

        }, 1000);
      
      } else {
        ShowBoxDialog(
          response.status != 400
          ? 'Problem Uploading Post. Error: ' + response.status
          : 'Incorrect File Type. Please Upload an Image.'
        
          ); event.target.disabled = false;
      }
    });
  }
  
  return (
    <div className='modal'>
      <div className='modal-content'>
        <header>
          <h4>Post Picture</h4>
          <span onClick={() => args.setShowPostModal(false)} className='close'>&times;</span>
        </header><hr/>

        {args.posted ? <LoadingBar size='large' height={15}/> :

          <div className='post-block'>
            <div className='post-form'>
              <div className='row'>
                <div className='form-group'>
                  <input className='form-control' ref={descriptionRef} type='text' placeholder='Write a Description...'/><br/>
                  
                  <input type='checkbox' ref={commentRef} defaultChecked={true}/>
                  <label>&nbsp; Enable Commenting?</label>

                  <span className='gap'/>
                  
                  <input type='checkbox' ref={likeRef} defaultChecked={true}/>
                  <label>&nbsp; Enable Liking?</label>
                </div>
              </div>
            </div><hr/>

            <div className='post-image'>
              <div className='upload'>
                <input type='file' ref={imageRef} onChange={DisplayImage}/>
                <button
                  className='btn btn-secondary'
                  onClick={() => imageRef.current.click()}
                  >Select Image
                </button>
                <button
                  className='btn btn-secondary'
                  onClick={HandlePostImage}
                  disabled={!uploaded}
                  >Create Post
                </button>
              </div>
            </div>

            <div className='preview-block'>
              <img ref={previewImageRef}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default PostPictureModal;