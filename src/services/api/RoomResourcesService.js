import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll (query = null) {
  try {
    const res = await axios({
      url: `${URL}/recursos`,
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

async function getAllByRoom (query = null, id) {
  if (id === null) return

  try {
    const res = await axios({
      url: `${URL}/recursos/sala/${id}`,
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
      url: `${URL}/recursos/${id}`,
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

async function update (data) {
  if (!data) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/recursos/${data.id}`,
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
      url: `${URL}/recursos`,
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
      url: `${URL}/recursos/${id}`,
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

async function assignResource (data) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/recursos/sala`,
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

async function unassignResource (id) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/recursos/sala`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        id
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const RoomResourcesService = {
  getAll,
  getAllByRoom,
  getById,
  update,
  create,
  remove,
  assignResource,
  unassignResource
}

export default RoomResourcesService
