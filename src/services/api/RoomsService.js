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
  if (!id) return

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

async function getAllByBuilding (id) {
  if (!id) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/salas/building/${id}`,
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

const RoomsService = {
  getAll, getById, getAllByBuilding, update, create, remove
}

export default RoomsService
