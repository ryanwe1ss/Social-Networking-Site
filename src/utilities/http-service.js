const Backend_URL = process.env.REACT_APP_URL;
const Backend_Port = process.env.REACT_APP_USE_PORT_IN_URL == "true" ? `:${process.env.REACT_APP_API_PORT}` : '';

const FileServer_URL = process.env.REACT_APP_FILE_SERVER;
const FileServer_Port = process.env.REACT_APP_USE_PORT_IN_URL == "true" ? `:${process.env.REACT_APP_FILE_SERVER_PORT}` : '';

export function HttpPost(route, body, stringify=true, headers=true)
{
  return fetch(`${Backend_URL}${Backend_Port}${route}`, {
    method: 'POST',
    credentials: 'include',
    headers: headers ? {'Content-Type': 'application/json'} : {},
    body: stringify ? JSON.stringify(body) : body,
  })
  .catch((error) => {
    console.log(`Backend [POST] Request Failed. Ensure your ENV variables are correct.\n${error}`);
  });
}

export function HttpGet(route)
{
  return fetch(`${Backend_URL}${Backend_Port}${route}`, {
    method: 'GET',
    credentials: 'include',
  })
  .catch((error) => {
    console.log(`Backend [GET] Request Failed. Ensure your ENV variables are correct.\n${error}`);
  });
}

export function HttpPostFileServer(route, body, stringify=true, headers=true)
{
  return fetch(`${FileServer_URL}${FileServer_Port}${route}`, {
    method: 'POST',
    headers: headers ? {"token": localStorage.getItem("sessionToken")} : {},
    body: stringify ? JSON.stringify(body) : body,
  })
  .catch((error) => {
    console.log(`File Server [POST] Request Failed. Ensure your ENV variables are correct.\n${error}`)
  });
}

export function HttpGetFileServer(route)
{
  return fetch(`${FileServer_URL}${FileServer_Port}${route}`, {
    method: 'GET',
    headers: {"token": localStorage.getItem("sessionToken")},
  })
  .catch((error) => {
    console.log(`File Server [GET] Request Failed. Ensure your ENV variables are correct.\n${error}`);
  });
}