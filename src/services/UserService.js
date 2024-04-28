import config from '../config'

async function login (username, password) {
  const res = await fetch(`${config.API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()

  return data
}

async function getInfo (token) {
  const res = await fetch(`${config.API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token
    }
  })
  const data = await res.json()

  return data
}

const userService = {
  login,
  getInfo
}

export default userService
