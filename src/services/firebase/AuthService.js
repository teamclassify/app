import {
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth, providerGoogle } from '../../config/firebase'

/**
 * Logs out the user.
 * @returns A promise that resolves to a ResponseFirebase object.
 */
const logoutUser = async () => {
  return auth
    .signOut()
    .then(() => {
      return {
        msg: 'Logout successfully',
        status: 200
      }
    })
    .catch((error) => {
      return {
        msg: 'Error to logout',
        status: 404,
        error: error.message
      }
    })
}

/**
 * Sign in with Google.
 * @returns A promise that resolves to a ResponseFirebase object.
 */
const signInGoogle = async () => {
  return signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential) {
        throw new Error('Error to login with google')
      }

      const token = credential.accessToken

      return {
        msg: 'User logged',
        data: { token, user: result.user },
        status: 200
      }
    })
    .catch((error) => {
      return {
        msg: 'User no logged',
        error: error.message,
        status: 404
      }
    })
}

export {
  logoutUser,
  signInGoogle
}
