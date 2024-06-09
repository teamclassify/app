import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth.js'

async function getAll () {
  try {
    const res = await axios({
      url: `${URL}/eventos`,
      method: 'GET',
      headers: {
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
    const res = await axios({
      url: `${URL}/eventos/sala/${roomId}`,
      method: 'GET',
      headers: {
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
    const res = await axios({
      url: `${URL}/eventos/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

async function update (id, asistencia) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/eventos/${id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: { asistencia }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const EventsService = {
  getAll,
  getAllByRoom,
  getById,
  update
}

export default EventsService
