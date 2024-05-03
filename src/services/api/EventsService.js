import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll () {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/eventos`,
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

async function getAllByRoom (roomId) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/eventos/sala/${roomId}`,
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
      url: `${URL}/eventos/${id}`,
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

const EventsService = {
  getAll,
  getAllByRoom,
  getById
}

export default EventsService