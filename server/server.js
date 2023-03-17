// --------------- MODULES --------------- //

const { Login } = require("./handlers/auth/login");
const { Register } = require("./handlers/auth/register");

const { FetchProfile } = require("./handlers/get/fetch-profile");
const { FetchPicture } = require("./handlers/get/fetch-picture");
const { FetchThumbnail } = require("./handlers/get/fetch-thumbnail");
const { FetchFollowers } = require("./handlers/get/fetch-followers");
const { FetchFollowing } = require("./handlers/get/fetch-following");
const { FetchChats } = require("./handlers/get/fetch-chats");
const { FetchConversation } = require("./handlers/get/fetch-conversation");
const { FetchPosts } = require("./handlers/get/fetch-posts");
const { SearchAccounts } = require("./handlers/get/search-accounts");

const { UpdateProfile } = require("./handlers/update/update-profile");
const { UpdatePrivacy } = require("./handlers/update/update-privacy");
const { UpdateUsername } = require("./handlers/update/update-username");

const { UploadPost } = require("./handlers/interact/post");
const { FollowAccount } = require("./handlers/interact/follow");
const { UnfollowAccount } = require("./handlers/interact/unfollow");
const { RemoveConnection } = require("./handlers/interact/remove-connection");

const { CreateChat } = require("./handlers/communicate/create-chat");
const { SendMessage } = require("./handlers/communicate/send-message");

// --------------- EXPRESS --------------- //

const express = require("express");
const session = require("express-session");
const apiRouter = express();

apiRouter.use(function(request, result, next) {
  if (process.env.REACT_APP_ENDPOINT_PORT === "80") {
    result.setHeader(
      'Access-Control-Allow-Origin',
      process.env.REACT_APP_API_URL
    );
  } else {
    result.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_ENDPOINT_PORT}`
    );
  }
  result.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  result.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  result.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// --------------- SESSION --------------- //

apiRouter.use(express.json());
apiRouter.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret",
  cookie: {
    maxAge: 3600000,
  }
}));

// --------------- ROUTES --------------- //

apiRouter.get("/api/test", (request, result) => {
  result.send(request.headers);
});

apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/register", (request, result) => {
  Register(request, result);
});

apiRouter.get("/api/logout", (request) => {
  request.session.destroy();
});

apiRouter.post("/api/update", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } UpdateProfile(request, result);
});

apiRouter.get("/api/update-privacy", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } UpdatePrivacy(request, result);
});

apiRouter.get("/api/update-username", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } UpdateUsername(request, result);
});

apiRouter.post("/api/post", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } UploadPost(request, result);
});

apiRouter.get("/api/search", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } SearchAccounts(request, result);
});

apiRouter.get("/api/profile", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchProfile(request, result);
});

apiRouter.get("/api/picture", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchPicture(request, result);
});

apiRouter.get("/api/thumbnail", (request, result) => {
  FetchThumbnail(request, result);
});

apiRouter.get("/api/posts", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchPosts(request, result);
});

apiRouter.get("/api/follow", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FollowAccount(request, result);
});

apiRouter.get("/api/unfollow", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } UnfollowAccount(request, result);
});

apiRouter.get("/api/rmvconnection", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } RemoveConnection(request, result);
});

apiRouter.get("/api/followers", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchFollowers(request, result);
});

apiRouter.get("/api/following", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchFollowing(request, result);
});

apiRouter.get("/api/create-chat", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } CreateChat(request, result);
})

apiRouter.get("/api/get-chats", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchChats(request, result);
});

apiRouter.get("/api/get-conversation", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } FetchConversation(request, result);
});

apiRouter.post("/api/send-message", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } SendMessage(request, result);
});

apiRouter.listen(process.env.REACT_APP_API_PORT, () => {
  console.log(`API listening on port ${process.env.REACT_APP_API_PORT}`);
});