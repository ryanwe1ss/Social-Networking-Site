const { Login } = require("./handlers/user/login");
const { Register } = require("./handlers/user/register");

const { FetchProfile } = require("./handlers/functions/fetchprofile");
const { FetchPicture } = require("./handlers/functions/fetchpicture");
const { FetchThumbnail } = require("./handlers/functions/fetchthumbnail");
const { FetchPosts } = require("./handlers/functions/fetchposts");
const { UpdateProfile } = require("./handlers/functions/update");
const { UploadPost } = require("./handlers/functions/post");
const { SearchAccounts } = require("./handlers/functions/search");

const { FollowAccount } = require("./handlers/connections/follow.js");
const { UnfollowAccount } = require("./handlers/connections/unfollow.js");
const { RemoveConnection } = require("./handlers/connections/remove-connection");
const { GetFollowers } = require("./handlers/connections/getfollowers.js");
const { GetFollowing } = require("./handlers/connections/getfollowing.js");

const { CreateChat } = require("./handlers/chats/create-chat");
const { GetChats } = require("./handlers/chats/get-chats");
const { GetConversation } = require("./handlers/chats/get-conversation");
const { SendMessage } = require("./handlers/chats/send-message");

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
  
  } GetFollowers(request, result);
});

apiRouter.get("/api/following", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } GetFollowing(request, result);
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
  
  } GetChats(request, result);
});

apiRouter.get("/api/get-conversation", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } GetConversation(request, result);
});

apiRouter.post("/api/send-message", (request, result) => {
  if (request.session.user === undefined) {
    result.sendStatus(401);
    return;
  
  } SendMessage(request, result);
});

apiRouter.listen(process.env.REACT_APP_API_PORT);