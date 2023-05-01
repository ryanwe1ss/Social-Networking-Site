// Authentication Modules
const { Login } = require("./handlers/auth/login");
const { Register } = require("./handlers/auth/register");

// User Modules
const { FetchConversation } = require("./handlers/get/fetch-conversation");
const { FetchNotifications } = require("./handlers/get/fetch-notifications");
const { FetchReportReasons } = require("./handlers/get/fetch-report-reasons");
const { FetchFollowers } = require("./handlers/get/fetch-followers");
const { FetchFollowing } = require("./handlers/get/fetch-following");
const { FetchThumbnail } = require("./handlers/get/fetch-thumbnail");
const { SearchAccounts } = require("./handlers/get/search-accounts");
const { FetchPicture } = require("./handlers/get/fetch-picture");
const { FetchProfile } = require("./handlers/get/fetch-profile");
const { FetchBlocked } = require("./handlers/get/fetch-blocked");
const { FetchChats } = require("./handlers/get/fetch-chats");
const { FetchFeed } = require("./handlers/get/fetch-feed");
const { FetchPosts } = require("./handlers/get/fetch-posts");
const { FetchPost } = require("./handlers/get/fetch-post");

const { UpdateUsername } = require("./handlers/update/update-username");
const { UpdatePassword } = require("./handlers/update/update-password");
const { UpdatePrivacy } = require("./handlers/update/update-privacy");
const { UpdateProfile } = require("./handlers/update/update-profile");

const { BlockAccount } = require("./handlers/interact/block");
const { UnblockAccount } = require("./handlers/interact/unblock");
const { ReportAccount } = require("./handlers/interact/report-account");
const { ReportPost } = require("./handlers/interact/report-post");
const { UnfollowAccount } = require("./handlers/interact/unfollow");
const { FollowAccount } = require("./handlers/interact/follow");

const { AcceptFollowRequest } = require("./handlers/interact/accept-follow");
const { DeclineFollowRequest } = require("./handlers/interact/decline-follow");

const { UploadPost } = require("./handlers/interact/post");
const { CommentPost } = require("./handlers/interact/comment");
const { LikePost } = require("./handlers/interact/like");

const { DeleteConnection } = require("./handlers/delete/delete-connection");
const { DeletePost } = require("./handlers/delete/delete-post");

const { CreateChat } = require("./handlers/communicate/create-chat");
const { SendMessage } = require("./handlers/communicate/send-message");

const { DeactivateAccount } = require("./handlers/delete/deactivate-account");
const { DeleteAccount } = require("./handlers/delete/delete-account");

// Admin Modules
const { FetchStatistics } = require("./handlers/admin/fetch-statistics");
const { CheckAdminPermissions } = require("./handlers/admin/admin-permissions");

// Middleware
const { middleware } = require("./middleware/middleware");

// --------------- SESSION --------------- //
const express = require("express");
const session = require("express-session");
const apiRouter = express();

apiRouter.use(express.json());
apiRouter.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "token",
  cookie: {
    maxAge: 3600000,
  }
}));

// --------------- CORS --------------- //
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

// --------------- AUTHENTICATION ROUTES --------------- //
apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/register", (request, result) => {
  Register(request, result);
});

apiRouter.get("/api/logout", middleware, (request) => {
  request.session.destroy();
});

apiRouter.get("/api/session", middleware, (request, result) => {
  result.send(request.session.user);
});

// --------------- ADMIN ROUTES --------------- //
apiRouter.get("/api/statistics", middleware, (request, result) => {
  FetchStatistics(request, result);
});

// --------------- USER ROUTES --------------- //
apiRouter.post("/api/update", middleware, (request, result) => {
  UpdateProfile(request, result);
});

apiRouter.get("/api/update-privacy", middleware, (request, result) => {
  UpdatePrivacy(request, result);
});

apiRouter.get("/api/update-username", middleware, (request, result) => {
  UpdateUsername(request, result);
});

apiRouter.get("/api/update-password", middleware, (request, result) => {
  UpdatePassword(request, result);
});

apiRouter.post("/api/post", middleware, (request, result) => {
  UploadPost(request, result);
});

apiRouter.get("/api/search", middleware, (request, result) => {
  SearchAccounts(request, result);
});

apiRouter.get("/api/profile", middleware, (request, result) => {
  FetchProfile(request, result);
});

apiRouter.get("/api/blocked", middleware, (request, result) => {
  FetchBlocked(request, result);
});

apiRouter.get("/api/picture", middleware, (request, result) => {
  FetchPicture(request, result);
});

apiRouter.get("/api/thumbnail", middleware, (request, result) => {
  FetchThumbnail(request, result);
});

apiRouter.get("/api/post", middleware, (request, result) => {
  FetchPost(request, result);
});

apiRouter.get("/api/block", middleware, (request, result) => {
  BlockAccount(request, result);
});

apiRouter.get("/api/unblock", middleware, (request, result) => {
  UnblockAccount(request, result);
});

apiRouter.get("/api/comment", middleware, (request, result) => {
  CommentPost(request, result);
});

apiRouter.get("/api/like", middleware, (request, result) => {
  LikePost(request, result);
});

apiRouter.get("/api/feed", middleware, (request, result) => {
  FetchFeed(request, result);
});

apiRouter.get("/api/posts", middleware, (request, result) => {
  FetchPosts(request, result);
});

apiRouter.get("/api/notifications", middleware, (request, result) => {
  FetchNotifications(request, result);
});

apiRouter.get("/api/report-reasons", middleware, (request, result) => {
  FetchReportReasons(request, result);
});

apiRouter.post("/api/report-account", middleware, (request, result) => {
  ReportAccount(request, result);
});

apiRouter.post("/api/report-post", middleware, (request, result) => {
  ReportPost(request, result);
});

apiRouter.get("/api/follow", middleware, (request, result) => {
  FollowAccount(request, result);
});

apiRouter.get("/api/unfollow", middleware, (request, result) => {
  UnfollowAccount(request, result);
});

apiRouter.get("/api/accept-follow", middleware, (request, result) => {
  AcceptFollowRequest(request, result);
});

apiRouter.get("/api/decline-follow", middleware, (request, result) => {
  DeclineFollowRequest(request, result);
});

apiRouter.get("/api/delete-connection", middleware, (request, result) => {
  DeleteConnection(request, result);
});

apiRouter.get("/api/delete-post", middleware, (request, result) => {
  DeletePost(request, result);
});

apiRouter.get("/api/followers", middleware, (request, result) => {
  FetchFollowers(request, result);
});

apiRouter.get("/api/following", middleware, (request, result) => {
  FetchFollowing(request, result);
});

apiRouter.get("/api/create-chat", middleware, (request, result) => {
  CreateChat(request, result);
})

apiRouter.get("/api/get-chats", middleware, (request, result) => {
  FetchChats(request, result);
});

apiRouter.get("/api/get-conversation", middleware, (request, result) => {
  FetchConversation(request, result);
});

apiRouter.post("/api/send-message", middleware, (request, result) => {
  SendMessage(request, result);
});

apiRouter.get("/api/admin-permissions", middleware, (request, result) => {
  CheckAdminPermissions(request, result);
});

apiRouter.get("/api/deactivate", middleware, (request, result) => {
  DeactivateAccount(request, result);
});

apiRouter.get("/api/delete", middleware, (request, result) => {
  DeleteAccount(request, result);
});

apiRouter.listen(process.env.REACT_APP_API_PORT, () => {
  console.log(`API listening on port ${process.env.REACT_APP_API_PORT}`);
});