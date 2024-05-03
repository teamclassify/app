import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll () {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas`,
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

async function getById (id) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas/${id}`,
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

const RoomsService = {
  getAll,
  getById
}

export default RoomsService
