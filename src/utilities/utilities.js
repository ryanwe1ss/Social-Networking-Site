import { HttpPost } from "./http-service";
import { HttpGet } from "./http-service";

export function Login(username, password) {
  const body = {
    "username": username,
    "password": password,
  };

  return HttpPost('/api/login', body)
    .then((response) => { return response.text() });
}

export function Register(username, password) {
  const body = {
    "username": username,
    "password": password,
  };

  return HttpPost('/api/register', body)
    .then((response) => { return response.text() });
}

export function FetchProfile(accountId, profileId)
{
  return Promise.all([
    HttpGet(`/api/profile?id=${accountId}&profileId=${profileId}`),
    HttpGet(`/api/picture?id=${profileId}`),
  ])
  .then(([profile, picture]) => Promise.all([profile.json(), picture.blob()]))
  .then(([profile, picture]) => {
    if (profile.length > 0) {
      profile.map(a => a.username = "@" + a.username)
      return {
        profile: profile,
        picture: URL.createObjectURL(picture),
      };
    }
  })
  .catch(() => {
    window.location.href = "/";
  })
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
    })
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