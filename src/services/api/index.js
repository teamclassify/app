import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

const defaultError = {
  message: 'Internal Error',
  statusCode: 500,
  error: {
    message: 'Internal Error',
    statusCode: 500
  }
}

function handleAxiosError (error) {
  if (axios.isAxiosError(error)) {
    return error.response ? error.response.data : defaultError
  } else {
    return defaultError
  }
}

export { URL, defaultError, handleAxiosError }
