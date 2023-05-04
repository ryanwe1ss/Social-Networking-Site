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
  "/api/feed",

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

  "/api/report-reasons",
  "/api/report-account",
  "/api/report-post",

  "/api/follow",
  "/api/unfollow",

  "/api/accept-follow",
  "/api/decline-follow",
  "/api/delete-connection",

  "/api/like",
  "/api/comment",
  "/api/favorite",
  "/api/post-likes",
  "/api/saved-posts",
  "/api/delete-post",

  "/api/chats",
  "/api/conversation",
  "/api/notifications",

  "/api/get-chats",
  "/api/get-conversation",
  "/api/create-chat",
  "/api/send-message",

  "/api/deactivate",
  "/api/delete"
];

const adminRoutes = [
  "/api/statistics",
  "/api/admin-permissions",

  "/api/profile-reports",
  "/api/post-reports",
];

module.exports = { allRoutes, userRoutes, adminRoutes };