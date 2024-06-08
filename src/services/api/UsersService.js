import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function getAll (filters = []) {
  const token = await getToken()

  try {
    const filtersURL = filters.map((f) => `${f?.name}=${f?.value}`).join('&&')

    const res = await axios({
      url: `${URL}/usuarios?${filtersURL}`,
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

async function updateRols (uid, rols) {
  const token = await getToken()

  try {
    const res = await axios({
      url: `${URL}/usuarios/rols`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: { uid, rols }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const UsersService = {
  getAll,
  updateRols
}

export default UsersService
