import { HttpGet, HttpPost } from "./http-service";

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

export function FetchProfile(accountId, profileId)
{
  return HttpGet(`/api/profile?id=${accountId}&profileId=${profileId}`)
    .then((profile) => {
      return profile.json();
    })
    .then((profile) => {
      if (profile.length > 0) {
        profile.map(a => a.username = "@" + a.username)
        return profile;
      }
    })
    .catch(() => {
      window.location.href = "/";
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
  return HttpGet(`/api/post?id=${profileId}&post=${postId}`)
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

export function UpdateProfile(body)
{
  return HttpPost(`/api/update`, body)
    .then((response) => { return response });
}

export function UpdatePrivacy(accountId, isPrivate)
{
  return HttpGet(`/api/update-privacy?id=${accountId}&private=${isPrivate}`)
    .then((response) => { return response });
}

export function UpdateUsername(accountId, username)
{
  return HttpGet(`/api/update-username?id=${accountId}&username=${username}`)
    .then((response) => { return response });
}

export function UploadPost(accountId, description, comment, like, image)
{
  const formData = new FormData();
  formData.append("data", image);

  return HttpPost(`/api/post?id=${accountId}&description=${description}&comment=${comment}&like=${like}`,
    formData, false, false
  
  ).then((response) => { return response });
}

export function DeletePost(accountId, postId)
{
  return HttpGet(`/api/delete-post?id=${accountId}&post=${postId}`)
    .then((response) => { return response });
}

export function SearchAccounts(event, accountId)
{
  const searchQuery = event.target.value;
  const accounts = [];

  if (searchQuery.length == 0) return Promise.resolve([]);

  return HttpGet(`/api/search?id=${accountId}&searchQuery=${searchQuery}`)
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

export function UploadProfilePicture(event, accountId)
{
  const formData = new FormData();
  formData.append("data", event.target.files[0]);

  return HttpPost(`/api/update?id=${accountId}`, formData, false, false)
    .then((response) => { return response });
}

export function FollowAccount(accountId, profileId)
{
  return HttpGet(`/api/follow?id=${accountId}&profileId=${profileId}`)
    .then((response) => { return response });
}

export function UnfollowAccount(accountId, profileId)
{
  return HttpGet(`/api/unfollow?id=${accountId}&profileId=${profileId}`)
    .then((response) => { return response })
}

export function DeleteConnection(accountId, userId, type)
{
  return HttpGet(`/api/delete-connection?id=${accountId}&userId=${userId}&type=${type}`)
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

export function CreateChat(accountId, userId)
{
  return HttpGet(`/api/create-chat?id=${accountId}&userId=${userId}`)
    .then((response) => { return response });
}

export function GetChats(accountId)
{
  return HttpGet(`/api/get-chats?id=${accountId}`)
    .then((result) => { return result.json() })
    .then((chats) => { return chats })
    .catch(() => { window.location.href = "/" });
}

export function GetConversation(accountId, userId)
{
  return HttpGet(`/api/get-conversation?id=${accountId}&userId=${userId}`)
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
  HttpGet('/api/logout')
    .then(() => { localStorage.clear() })
}

export function RedirectPage(profileId)
{
  window.location.href = `/profile?id=${profileId}`;
}