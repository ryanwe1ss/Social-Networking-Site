import { HttpGet, HttpPost, HttpGetFileServer, HttpPostFileServer } from "./http-service";

export const thumbnailUrl =
  process.env.FILE_SERVER +
  (process.env.FS_API_USE_PORT_IN_URL == "true"
  ? `:${process.env.FILE_SERVER_PORT}` : '');

// ----- AUTHENTICATION ----- //
export function FetchSession(onHomeScreens=false)
{
  return HttpGet('/api/session')
    .then((response) => {
      return response.json();
    })
    .then((session) => {
      return session;
    })
    .catch(() => {
      if (!onHomeScreens) window.location.href = "/";
    })
}

export function PerformLogin(username, password) {
  const body = {
    "username": username,
    "password": password,
  };

  return HttpPost('/api/login', body)
    .then((response) => { return response.json() })
    .catch(() => { return {"status": 504} });
}

export function PerformRegister(username, password, confirm) {
  const body = {
    "username": username,
    "password": password,
    "confirm": confirm,
  };

  return HttpPost('/api/register', body)
    .then((response) => { return response });
}

export function Logout()
{
  localStorage.clear();
  HttpGet('/api/logout');
}

// ----- ADMIN GET REQUESTS ----- //
export function FetchStatistics()
{
  return HttpGet('/api/statistics')
    .then((response) => { return response.json() })
    .then((statistics) => { return statistics });
}

// ----- USER GET REQUESTS ----- //
export function FetchProfile(username)
{
  return HttpGet(`/api/profile?username=${username}`)
    .then((profile) => {
      return profile.json();
    })
    .then((profile) => {
      return profile;
    })
}

export function FetchFollowers(profileId)
{
  return HttpGet(`/api/followers?profileId=${profileId}`)
    .then((result) => { return result.json() })
    .then((followers) => { return followers });
}

export function FetchFollowing(profileId)
{
  return HttpGet(`/api/following?id=${profileId}`)
    .then((result) => { return result.json() })
    .then((following) => { return following });
}

export function FetchBlocked()
{
  return HttpGet('/api/blocked')
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((users) => {
      return users;
    });
}

export function FetchPicture(id) {
  return HttpGetFileServer(`/fs-api/profile-picture/${id}`)
    .then(picture => picture.blob())
    .then(picture => { return URL.createObjectURL(picture) });
}

// ----- FILE UPLOADS ----- //
export function UploadProfilePicture(event)
{
  const formData = new FormData();
  formData.append("data", event.target.files[0]);

  return HttpPostFileServer(`/fs-api/update-profile-picture`, formData, false)
    .then(response => { return response });
}

export function UploadPost(description, comment, like, image)
{
  const postContent = new FormData();
  postContent.append("image", image);
  postContent.append("description", description);
  postContent.append("comment", comment);
  postContent.append("like", like);

  return HttpPostFileServer('/fs-api/create-post', postContent, false)
    .then((response) => { return response });
}

// ----- POST GET REQUESTS ----- //
export function FetchFeed(limit=10)
{
  return HttpGet(`/api/feed?limit=${limit}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((posts) => {
      return posts;
    });
}

export function FetchPosts(profileId, limit=3)
{
  return HttpGet(`/api/posts?id=${profileId}&limit=${limit}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((posts) => {
      return posts;
    });
}

export function FetchSavedPosts()
{
  return HttpGet('/api/saved-posts')
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((posts) => {
      return posts;
    });
}

export function FetchPostPicture(profileId, postId) {
  return HttpGetFileServer(`/fs-api/post/${profileId}/${postId}`)
    .then(post => post.blob())
    .then(post => { return URL.createObjectURL(post) });
}

export function FetchPostContent(profileId, postName)
{
  return HttpGet(`/api/post/${profileId}/${postName}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((post) => {
      return post;
    });
}

export function FetchPostLikes(postId)
{
  return HttpGet(`/api/post-likes?post=${postId}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((likes) => {
      return likes;
    });
}

export function FetchProfileReports(searchQuery='')
{
  return HttpGet(`/api/profile-reports?searchQuery=${searchQuery}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((reports) => {
      return reports;
    });
}

export function FetchPostReports(searchQuery='')
{
  return HttpGet(`/api/post-reports?searchQuery=${searchQuery}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((reports) => {
      return reports;
    });
}

export function FetchCommentReports(searchQuery='')
{
  return HttpGet(`/api/comment-reports?searchQuery=${searchQuery}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((reports) => {
      return reports;
    });
}

export function FetchReportReasons()
{
  return HttpGet('/api/report-reasons')
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((reasons) => {
      return reasons;
    });
}

// ----- POST ACTIONS ----- //
export function LikePost(postId)
{
  return HttpGet(`/api/like?post=${postId}`)
    .then((response) => { return response });
}

export function CommentPost(postId, comment)
{
  return HttpGet(`/api/comment?post=${postId}&comment=${comment}`)
    .then((response) => { return response });
}

export function FavoritePost(postId)
{
  return HttpGet(`/api/favorite?post=${postId}`)
    .then((response) => { return response });
}

export function DeletePost(postId)
{
  return HttpGetFileServer(`/fs-api/delete-post/${postId}`)
    .then((response) => { return response });
}

// ----- NOTIFICATIONS ----- //
export function FetchNotifications(countOnly=false)
{
  return HttpGet(`/api/notifications${countOnly ? '?countOnly=true' : ''}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((notifications) => {
      return notifications;
    });
}

// ----- ACCOUNT ACTIONS ----- //
export function BlockAccount(accountId)
{
  return HttpGet(`/api/block?profileId=${accountId}`)
    .then((response) => { return response });
}

export function UnblockAccount(accountId)
{
  return HttpGet(`/api/unblock?profileId=${accountId}`)
    .then((response) => { return response });
}

export function FollowAccount(profileId)
{
  return HttpGet(`/api/follow?profileId=${profileId}`)
    .then((response) => { return response });
}

export function UnfollowAccount(profileId)
{
  return HttpGet(`/api/unfollow?profileId=${profileId}`)
    .then((response) => { return response })
}

export function AcceptFollowRequest(id, followerId)
{
  return HttpGet(`/api/accept-follow?id=${id}&followerId=${followerId}`)
    .then((response) => { return response });
}

export function DeclineFollowRequest(id, followerId)
{
  return HttpGet(`/api/decline-follow?id=${id}&followerId=${followerId}`)
    .then((response) => { return response });
}

export function ReportAccount(body)
{
  return HttpPost('/api/report-account', body)
    .then((response) => { return response });
}

export function ReportPost(body)
{
  return HttpPost('/api/report-post', body)
    .then((response) => { return response });
}

export function ReportComment(body)
{
  return HttpPost('/api/report-comment', body)
    .then((response) => { return response });
}

export function DeleteConnection(userId, type)
{
  return HttpGet(`/api/delete-connection?userId=${userId}&type=${type}`)
    .then((response) => { return response });
}

// ----- UPDATE ----- //
export function UpdateProfile(body)
{
  return HttpPost(`/api/update`, body)
    .then((response) => { return response });
}

export function UpdatePrivacy(isPrivate)
{
  return HttpGet(`/api/update-privacy?private=${isPrivate}`)
    .then((response) => { return response });
}

export function UpdatePublicMessaging(isPublicMessaging)
{
  return HttpGet(`/api/update-public-messaging?publicMessaging=${isPublicMessaging}`)
    .then((response) => { return response });
}

export function UpdateUsername(username)
{
  return HttpGet(`/api/update-username?username=${username}`)
    .then((response) => { return response });
}

export function UpdatePassword(password)
{
  return HttpGet(`/api/update-password?password=${password}`)
    .then((response) => { return response });
}

// ----- SEARCH ----- //
export function SearchAccounts(event, override=false, all=false)
{
  const searchQuery = event ? event.target.value : [];
  const accounts = [];

  if (searchQuery.length == 0 && !override) return Promise.resolve([]);
  return HttpGet(`/api/search-accounts?searchQuery=${searchQuery}${all ? '&all=true' : ''}`)
    .then((result) => {
      return result.json();
    })
    .then((users) => {
      users.map(user => {
        accounts.push({
          id: user.id,
          username: user.username,
        });
      });
      return accounts;
    }
  );
}

// ----- MESSAGING ----- //
export function FetchChats()
{
  return HttpGet('/api/get-chats')
    .then((result) => { return result.json() })
    .then((chats) => { return chats });
}

export function FetchConversation(userId)
{
  return HttpGet(`/api/get-conversation?userId=${userId}`)
    .then((result) => { return result.json() })
    .then((conversation) => { return conversation });
}

export function CreateChat(userId)
{
  return HttpGet(`/api/create-chat?userId=${userId}`)
    .then((response) => { return response });
}

export function SendMessage(body)
{
  return HttpPost('/api/send-message', body)
    .then((response) => { return response });
}

// ----- PERMISSIONS ----- //
export function CheckAdminPermissions()
{
  return HttpGet('/api/admin-permissions')
    .then((response) => { return response.json() })
    .then((permissions) => { return permissions });
}

// ----- DELETE ----- //
export function DeactivateAccount()
{
  return HttpGet('/api/deactivate')
    .then((response) => { return response });
}

export function DeleteAccount()
{
  return HttpGet('/api/delete')
    .then((response) => { return response });
}