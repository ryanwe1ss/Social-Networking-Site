const allRoutes = [
  "/api/login",
  "/api/register",
  "/api/logout",
  "/api/session",

  "/api/profile",
  "/api/search",
  
  "/api/thumbnail",
  "/api/picture",
  
  "/api/posts",
  "/api/post",

  "/api/followers",
  "/api/following",
]

const userRoutes = [
  "/api/update",
  "/api/update-privacy",
  "/api/update-username",
  "/api/update-password",

  "/api/block",
  "/api/unblock",
  "/api/blocked",

  "/api/report",
  "/api/follow",
  "/api/unfollow",

  "/api/accept-follow",
  "/api/decline-follow",
  "/api/delete-connection",

  "/api/comment",
  "/api/like",
  "/api/delete-post",

  "/api/chats",
  "/api/conversation",
  "/api/notifications",

  "/api/get-chats",
  "/api/get-conversation",
  "/api/create-chat",
  "/api/send-message",

  "/api/deactivate"
];

const adminRoutes = [
  "/api/statistics",
];

module.exports = { allRoutes, userRoutes, adminRoutes };