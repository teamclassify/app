import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll (query = null) {
  try {
    const res = await axios({
      url: `${URL}/sala-recursos${query ? `?${query}` : ''}`,
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
      url: `${URL}/sala-recursos/${id}`,
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
      url: `${URL}/sala-recursos/${id}`,
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
      url: `${URL}/sala-recursos`,
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
      url: `${URL}/sala-recursos/${id}`,
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

const RoomResourcesService = {
  getAll,
  getById,
  update,
  create,
  remove
}

export default RoomResourcesService
