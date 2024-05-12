import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll () {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/usuarios`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const UsersService = {
  getAll
}

export default UsersService
