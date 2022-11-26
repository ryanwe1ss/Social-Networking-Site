export function Login(username, password) {
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: 'include',
    body: JSON.stringify({
      "username": username,
      "password": password,
    }),
  })
  .then((response) => { return response.text() });
}

export function Register(username, password) {
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "username": username,
      "password": password,
    }),
  })
  .then((response) => { return response.text() });
}

export function FetchProfile(accountId, profileId)
{
  return Promise.all([
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/profile?id=${accountId}&profileId=${profileId}`, {
      method: 'GET',
      credentials: 'include',
    }),
    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/picture?id=${profileId}`, {
      method: 'GET',
      credentials: 'include',
    }),
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

export function UpdateProfile(accountId, name, gender, status, birthdate, school, concentration, email, phone_number, bio)
{
  const details = {
    "id": accountId,
    "name": name,
    "gender": gender,
    "status": status,
    "birthdate": birthdate,
    "school": school,
    "concentration": concentration,
    "email": email,
    "phone_number": phone_number,
    "bio": bio,
  };

  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/update?id=${accountId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(details),
  })
  .then((response) => {
    return response;
  });
}

export function SearchAccounts(event, accountId)
{
  const searchQuery = event ? event.target.value : '';
  const names = [];

  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/search?id=${accountId}&searchQuery=${searchQuery}`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((result) => { return result.json() })
  .then((users) => {
    users.map(user => {
      names.push({ value: user.id, text: user.username });
    
    }); return names;
  })
}

export function UploadProfilePicture(event, accountId)
{
  const httpRequest = new XMLHttpRequest();
  const formData = new FormData();

  httpRequest.withCredentials = true;
  httpRequest.open('POST', `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/update?id=${accountId}`);

  formData.append("data", event.target.files[0]);
  httpRequest.send(formData);
  
  return httpRequest;
}

export function FollowAccount(accountId, profileId)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/follow?id=${accountId}&profileId=${profileId}`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((response) => {
    return response;
  });
}

export function UnfollowAccount(accountId, profileId)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/unfollow?id=${accountId}&profileId=${profileId}`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((response) => {
    return response;
  });
}

export function RemoveConnection(accountId, userId, type)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/rmvconnection?id=${accountId}&userId=${userId}&type=${type}`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((response) => {
    return response;
  })
}

export function GetFollowers(profileId)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/followers?id=${profileId}`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((result) => {
    return result.json();
  })
  .then((followers) => {
    return followers;
  });
}

export function GetFollowing(profileId)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/following?id=${profileId}`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((result) => {
    return result.json();
  })
  .then((following) => {
    return following;
  });
}

export function Logout()
{
  fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/logout`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(() => {
    localStorage.clear();
    window.location.href = "/";
  })
}

export function RedirectPage(event, searchData)
{
  if (event.target.innerText.length > 0) {
    const accountId = searchData.find(n => n.text == event.target.innerText).value;
    window.location.href = `/profile?id=${accountId}`;
  }
}