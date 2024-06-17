import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll (filters = [], page = 0) {
  const token = await getToken()

  try {
    const filtersURL = filters.map((f) => `${f?.name}=${f?.value}`).join('&&')

    const res = await axios({
      url: `${URL}/prestamos?page=${page > 0 ? page - 1 : page}&${filtersURL}`,
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

async function getAllByUser (page = 0) {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/prestamos/user?page=${page > 0 ? page - 1 : page}`,
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

async function getAllPending () {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/prestamos/pending`,
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
  if (!id) {
    return null
  }

  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/prestamos/${id}`,
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
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/prestamos/${id}`,
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
      url: `${URL}/prestamos`,
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
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/prestamos/${id}`,
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

const LoansService = {
  getAll,
  getAllByUser,
  getById,
  update,
  create,
  remove,
  getAllPending
}

export default LoansService
