import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll () {
  try {
    const res = await axios({
      url: `${URL}/salas`,
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
  if (!id) return

  try {
    const res = await axios({
      url: `${URL}/salas/${id}`,
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

async function getAllByBuilding (id) {
  if (!id) return

  try {
    const res = await axios({
      url: `${URL}/salas/building/${id}`,
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

async function update (id, data) {
  if (!id) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas/${id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

async function create (data) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

async function remove (id) {
  if (!id) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas/${id}`,
      method: 'DELETE',
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

async function getAllAvailable (date, startHour, endHour) {
  if (!date) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas/disponibles`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        fecha: date,
        end_hour: endHour,
        start_hour: startHour
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const RoomsService = {
  getAll,
  getById,
  getAllByBuilding,
  update,
  create,
  remove,
  getAllAvailable
}

export default RoomsService
