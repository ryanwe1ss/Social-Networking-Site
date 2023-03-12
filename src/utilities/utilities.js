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

export function FetchPosts(profileId)
{
  return HttpGet(`/api/posts?id=${profileId}`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(posts => {
      return posts;
    });
}

export function UpdateProfile(body)
{
  return HttpPost(`/api/update`, body)
    .then((response) => { return response })
}

export function SearchAccounts(event, accountId)
{
  const searchQuery = event ? event.target.value : '';
  const names = [];

  return HttpGet(`/api/search?id=${accountId}&searchQuery=${searchQuery}`)
    .then((result) => {
      return result.json();
    })
    .then((users) => {
      users.map(user => {
        names.push({ value: user.id, text: user.username });
      
      }); return names;
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
    .then((response) => { return response })
}

export function UnfollowAccount(accountId, profileId)
{
  return HttpGet(`/api/unfollow?id=${accountId}&profileId=${profileId}`)
    .then((response) => { return response })
}

export function RemoveConnection(accountId, userId, type)
{
  return HttpGet(`/api/rmvconnection?id=${accountId}&userId=${userId}&type=${type}`)
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

export function RedirectPage(event, searchData)
{
  if (event.target.innerText.length > 0) {
    const accountId = searchData.find(n => n.text == event.target.innerText).value;
    window.location.href = `/profile?id=${accountId}`;
  }
}