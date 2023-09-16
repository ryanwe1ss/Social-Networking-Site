require("dotenv").config({ path: "../../.env" });

const Backend_Url = process.env.REACT_APP_URL;
const Backend_Port = process.env.REACT_APP_BACKEND_USE_PORT_IN_URL == "true" ?
  `:${process.env.REACT_APP_API_PORT}` : '';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const express = require('express');
const formidable = require('formidable');

const fileApi = express();
fileApi.use(express.json());
sharp.cache(false);

// --------------- CORS --------------- //
fileApi.use(function(request, result, next) {
  result.setHeader(
    'Access-Control-Allow-Origin',
    `${Backend_Url}:${process.env.REACT_APP_ENDPOINT_PORT}`
  );
  result.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  result.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Token");
  next();
});

// --------------- ROUTES --------------- //
fileApi.post('/fs-api/register', (request, result) => {
  const id = request.body.id;

  fs.mkdir(`content/posts/${id}`, { recursive: true }, (error) => {
    if (error) result.sendStatus(403);
    else result.sendStatus(200);
  });
});

fileApi.get('/fs-api/post/:id/:fileName', (request, result) => {
  result.sendFile(path.join(__dirname, `./content/posts/${request.params.id}/${request.params.fileName}.png`));
});

fileApi.get('/fs-api/thumbnail/:id', (request, result) => {
  result.sendFile(path.join(__dirname, `./content/thumbnails/${request.params.id}.png`));
});

fileApi.get('/fs-api/profile-picture/:id', (request, result) => {
  result.sendFile(path.join(__dirname, `./content/images/${request.params.id}.png`));
});

fileApi.post('/fs-api/update-profile-picture', (request, result) => {
  const form = new formidable.IncomingForm();
  const sessionToken = request.headers.token;

  form.on("file", function (field, file) {
    fetch(`${Backend_Url}${Backend_Port}/api/update-profile-picture`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionToken
      },
    })
    .then(response => {
      if (response.status === 200) return response.json();
      else throw new Error(response.status);
    })
    .then(session => {
      const image = `content/images/${session.id}.png`;
      const thumbnail = `content/thumbnails/${session.id}.png`;

      fs.renameSync(file.filepath, image, (error) => {
        if (error) {
          console.log(`Error Updating Picture for ${session.username}`);
          return result.sendStatus(500);
        }
      });
      sharp(image)
      .resize(100, 100)
      .rotate()
      .toFile(thumbnail, (error) => {
        if (error) {
          console.log(`Error Updating Thumbnail for ${session.username}`);
          return result.sendStatus(500);
        }
      });

      result.sendStatus(200);
      console.log(`${session.username} has updated their profile picture: ${file.originalFilename}`);
    })
    .catch(error => {
      console.log("Error Fetching Resource for Updating Profile Picture: " + error.message);
      result.sendStatus(parseInt(error.message) || 500);
    });
  });
  form.parse(request);
});

fileApi.post('/fs-api/create-post', (request, result) => {
  const form = new formidable.IncomingForm();
  const sessionToken = request.headers.token;
  
  form.parse(request, (error, fields, file) => {
    const description = fields.description.replace(/['";\(\)]/g, '');
    const comment = fields.comment != 'true' && fields.comment != 'false' ? false : fields.comment;
    const like = fields.like != 'true' && fields.like != 'false' ? false : fields.like;

    // check if file (post) is an image
    if (!file.image.mimetype.includes('image')) {
      return result.sendStatus(400);
    }

    fetch(`${Backend_Url}${Backend_Port}/api/create-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionToken
      },
      body: JSON.stringify({
        description: description,
        comment: comment,
        like: like
      }),
    })
    .then(response => {
      if (response.status === 200) return response.json();
      else throw new Error(response.status);
    })
    .then(post => {
      fs.renameSync(
        file.image.filepath,
        `./content/posts/${post.session.id}/${post.fileName}.png`,
        
        (error) => {
          if (error) {
            console.log(`Error Uploading Post for ${post.session.id}`);
            return result.sendStatus(500);
          }
        }
      );
      result.sendStatus(200);
    })
    .catch(error => {
      console.log("Error Fetching Resource for Creating Post: " + error.message);
      result.sendStatus(parseInt(error.message) || 500);
    });
  });
});

fileApi.get('/fs-api/delete-post/:postId', (request, result) => {
  const sessionToken = request.headers.token;
  const postId = request.params.postId;

  fetch(`${Backend_Url}${Backend_Port}/api/delete-post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': sessionToken
    },
  })
  .then(response => {
    if (response.status === 200) return response.json();
    else throw new Error(response.status);
  })
  .then(post => {
    fs.unlinkSync(`./content/posts/${post.session.id}/${post.fileName}.png`, (error) => {
      if (error) {
        console.log(`Error Deleting Post for ${post.session.id}`);
        return result.sendStatus(500);
      }
    }); result.sendStatus(200);
  })
  .catch(error => {
    console.log("Error Fetching Resource for Deleting Post: " + error.message);
    result.sendStatus(parseInt(error.message) || 500);
  });
});

fileApi.listen(process.env.REACT_APP_FILE_SERVER_PORT, () => {
  console.log(`File Server API listening on port ${process.env.REACT_APP_FILE_SERVER_PORT}`);
});