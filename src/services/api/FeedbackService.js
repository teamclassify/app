import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll (filters = [], page = 0) {
  const token = await getToken()

  try {
    const filtersURL = filters.map((f) => `${f?.name}=${f?.value}`).join('&&')

    const res = await axios({
      url: `${URL}/anomalias?page=${page > 0 ? page - 1 : page}&${filtersURL}`,
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
      url: `${URL}/anomalias/${id}`,
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

async function create (data) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/retroalimentacion`,
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

async function update (data) {
  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/anomalias`,
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

async function getByLoan (id) {
  if (!id) {
    return null
  }

  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/retroalimentacion/${id}`,
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

const FeedbackService = {
  getAll,
  create,
  getById,
  update,
  getByLoan
}

export default FeedbackService
