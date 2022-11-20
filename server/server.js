const { Session } = require("./session");
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

const express = require("express");
const apiRouter = express();

apiRouter.use(require("cors")({ origin: '*' }));
apiRouter.use(express.json());

apiRouter.get("/api/session", (request, result) => {
  Session(request, result);
});

apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/register", (request, result) => {
  Register(request, result);
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