import { HttpGet, HttpPost } from "./http-service";

export function FetchSession()
{
  return HttpGet('/api/session')
    .then((response) => {
      return response.json();
    })
    .then((session) => {
      return session;
    })
    .catch(() => {
      window.location.href = "/";
    })
}

export function PerformLogin(username, password) {
  const body = {
    "username": username,
    "password": password,
  };

  return HttpPost('/api/login', body)
    .then((response) => { return response.text() });
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

export function FetchProfile(profileId)
{
  return HttpGet(`/api/profile?profileId=${profileId}`)
    .then((profile) => {
      return profile.json();
    })
    .then((profile) => {
      if (profile.length > 0) {
        profile.map(a => a.username = "@" + a.username)
        return profile;
      }
    })
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

export function UploadPost(description, comment, like, image)
{
  const formData = new FormData();
  formData.append("data", image);

  return HttpPost(`/api/post?description=${description}&comment=${comment}&like=${like}`,
    formData, false, false
  
  ).then((response) => { return response });
}

export function DeletePost(postId)
{
  return HttpGet(`/api/delete-post?post=${postId}`)
    .then((response) => { return response });
}

export function SearchAccounts(event)
{
  const searchQuery = event.target.value;
  const accounts = [];

  if (searchQuery.length == 0) return Promise.resolve([]);

  return HttpGet(`/api/search?searchQuery=${searchQuery}`)
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

export function UploadProfilePicture(event)
{
  const formData = new FormData();
  formData.append("data", event.target.files[0]);

  return HttpPost(`/api/update`, formData, false, false)
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

export function DeleteConnection(userId, type)
{
  return HttpGet(`/api/delete-connection?userId=${userId}&type=${type}`)
    .then((response) => { return response });
}

export function GetFollowers(profileId)
{
  return HttpGet(`/api/followers?id=${profileId}`)
    .then((result) => { return result.json() })
    .then((followers) => { return followers });
}

export function GetFollowing(profileId)
{
  return HttpGet(`/api/following?id=${profileId}`)
    .then((result) => { return result.json() })
    .then((following) => { return following });
}

export function CreateChat(userId)
{
  return HttpGet(`/api/create-chat?userId=${userId}`)
    .then((response) => { return response });
}

export function GetChats()
{
  return HttpGet('/api/get-chats')
    .then((result) => { return result.json() })
    .then((chats) => { return chats });
}

export function GetConversation(userId)
{
  return HttpGet(`/api/get-conversation?userId=${userId}`)
    .then((result) => { return result.json() })
    .then((conversation) => { return conversation });
}

export function SendMessage(body)
{
  return HttpPost("/api/send-message", body)
    .then((response) => { return response });
}

export function Logout()
{
  HttpGet('/api/logout');
}

export function RedirectPage(profileId)
{
  window.location.href = `/profile?id=${profileId}`;
}