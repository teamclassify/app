import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAllLoans (year = 'total') {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/estadisticas/prestamos/total`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        year
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

async function getLoansByMonths (year = null) {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/estadisticas/prestamos/meses`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        year
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

async function getUsers () {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/estadisticas/usuarios`,
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

async function getFeedback (year = null) {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/estadisticas/feedback`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        year
      }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const StatsService = {
  getAllLoans,
  getLoansByMonths,
  getUsers,
  getFeedback
}

export default StatsService
