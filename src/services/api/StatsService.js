import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAllLoans () {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/estadisticas/prestamos/total`,
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

async function getLoansByMonths () {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/estadisticas/prestamos/meses`,
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

const StatsService = {
  getAllLoans,
  getLoansByMonths,
  getUsers
}

export default StatsService
