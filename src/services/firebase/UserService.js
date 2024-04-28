import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'

const USERS = 'users'

function getCurrentUser () {
  const currentUser = auth.currentUser

  if (!currentUser) throw new Error('Error to get current user')

  return {
    uid: currentUser.uid,
    name: currentUser.displayName || '',
    photo: currentUser.photoURL,
    email: currentUser.email
  }
}

async function getUser ({
  key,
  val
}) {
  try {
    const q = query(collection(db, USERS), where(key, '==', val))
    const docs = await getDocs(q)

    if (docs.size > 0) {
      let user = {}

      docs.forEach((doc) => {
        user = {
          uid: doc.id,
          ...doc.data()
        }
      })

      return {
        msg: 'User sussessfully get',
        data: user,
        status: 200
      }
    } else {
      return {
        error: 'no found user',
        status: 404
      }
    }
  } catch {
    return {
      error: 'you are not authorized',
      status: 401
    }
  }
}

export { getCurrentUser, getUser }
