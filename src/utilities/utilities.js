import { HttpGet, HttpPost } from "./http-service";

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
    .then((response) => { return response.json() });
}

export function PerformRegister(username, password, confirm) {
  const body = {
    "username": username,
    "password": password,
    "confirm": confirm,
  };

  return HttpPost('/api/register', body)
    .then((response) => { return response.text() });
}

export function Logout()
{
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
export function FetchProfile(profileId)
{
  return HttpGet(`/api/profile?profileId=${profileId}`)
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

export function FetchPicture(profileId) {
  return HttpGet(`/api/picture?id=${profileId}`)
    .then((picture) => {
      return picture.blob();
    })
    .then((picture) => {
      return URL.createObjectURL(picture);
    })
}

export function FetchThumbnail(id)
{
  return HttpGet(`/api/thumbnail?id=${id}`)
    .then((thumbnail) => {
      return thumbnail.blob();
    })
    .then((thumbnail) => {
      return URL.createObjectURL(thumbnail);
    })
}

// ----- FILE UPLOADS ----- //
export function UploadProfilePicture(event)
{
  const formData = new FormData();
  formData.append("data", event.target.files[0]);

  return HttpPost(`/api/update`, formData, false, false)
    .then((response) => { return response });
}

export function UploadPost(description, comment, like, image)
{
  const formData = new FormData();
  formData.append("data", image);

  return HttpPost(`/api/post?description=${description}&comment=${comment}&like=${like}`,
    formData, false, false
  
  ).then((response) => { return response });
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
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((posts) => {
      return posts;
    });
}

export function FetchPost(profileId, postId)
{
  return HttpGet(`/api/post?profileId=${profileId}&post=${postId}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((post) => {
      return post;
    })
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

export function DeletePost(postId)
{
  return HttpGet(`/api/delete-post?post=${postId}`)
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
  return HttpPost('/api/report', body)
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

  return HttpGet(`/api/search?searchQuery=${searchQuery}${all ? '&all=true' : ''}`)
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
    });
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

// ----- MISCELLANEOUS ----- //
export function RedirectPage(profileId)
{
  window.location.href = `/profile?id=${profileId}`;
}

// ----- DELETE ----- //
export function DeactivateAccount()
{
  return HttpGet('/api/deactivate')
    .then((response) => { return response });
}