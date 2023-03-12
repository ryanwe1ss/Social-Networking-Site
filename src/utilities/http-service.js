export function HttpPost(route, body, stringify=true, headers=true)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${route}`, {
    method: 'POST',
    credentials: 'include',
    headers: headers ? {'Content-Type': 'application/json'} : {},
    body: stringify ? JSON.stringify(body) : body,
  })
  .catch((error) => {
    console.log(`Please contact your administrator. ENV variables could be incorrect.\n${error}`)
  })
}

export function HttpGet(route)
{
  return fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${route}`, {
    method: 'GET',
    credentials: 'include',
  })
  .catch((error) => {
    console.log(`Please contact your administrator. ENV variables could be incorrect.\n${error}`)
  })
}