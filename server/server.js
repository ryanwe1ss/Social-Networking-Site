const { Login } = require("./login");
const { Register } = require("./register");
const { UpdateProfile } = require("./updateprofile");
const { SearchAccounts } = require("./search");
const { FetchProfile } = require("./fetchprofile");
const { FetchPicture } = require("./fetchpicture");
const { FetchThumbnail } = require("./fetchthumbnail");
const { FollowAccount } = require("./follow.js");
const { UnfollowAccount } = require("./unfollow.js");
const { GetFollowers } = require("./getfollowers.js");
const { GetFollowing } = require("./getfollowing.js");

const session = require("express-session");
const express = require("express");
const apiRouter = express();

apiRouter.use(express.json());
apiRouter.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret",
}));

apiRouter.use(function(request, result, next) {
  result.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`)
  result.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  result.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  result.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

apiRouter.get("/api/session", (request, result) => {
  if (request.session.user === undefined) {
    result.send("invalid");
  
  } else result.send("valid");
});

apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/register", (request, result) => {
  Register(request, result);
});

apiRouter.get("/api/logout", (request, result) => {
  request.session.destroy();
});

apiRouter.post("/api/update", (request, result) => {
  UpdateProfile(request, result);
});

apiRouter.get("/api/search", (request, result) => {
  SearchAccounts(request, result);
});

apiRouter.get("/api/profile", (request, result) => {
  FetchProfile(request, result);
});

apiRouter.get("/api/picture", (request, result) => {
  FetchPicture(request, result);
});

apiRouter.get("/api/thumbnail", (request, result) => {
  FetchThumbnail(request, result);
});

apiRouter.get("/api/follow", (request, result) => {
  FollowAccount(request, result);
});

apiRouter.get("/api/unfollow", (request, result) => {
  UnfollowAccount(request, result);
});

apiRouter.get("/api/followers", (request, result) => {
  GetFollowers(request, result);
});

apiRouter.get("/api/following", (request, result) => {
  GetFollowing(request, result);
});

apiRouter.listen(process.env.REACT_APP_SERVER_PORT);