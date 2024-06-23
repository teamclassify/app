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

async function update (id, data) {
  if (!id) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/usuarios/${id}`,
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

async function updateInfo ({ tipo }) {
  if (!tipo) return

  try {
    const token = await getToken()

    const res = await axios({
      url: `${URL}/usuarios/me`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: { tipo }
    })

    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const UsersService = {
  getAll,
  updateRols,
  update,
  updateInfo
}

export default UsersService
