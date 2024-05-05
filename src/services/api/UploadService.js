import axios from 'axios'
import { URL, handleAxiosError } from '.'
import { getToken } from './Auth'

async function create (file) {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const token = await getToken()
    const res = await axios({
      url: `${URL}/upload `,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    return res.data
  } catch (error) {
    return handleAxiosError(error)
  }
}

const UploadService = {
  create
}

export default UploadService
