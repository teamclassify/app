import { useToast } from '@chakra-ui/react'
import { createContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'wouter'

import { auth } from '../config/firebase'
import { login } from '../services/api/Auth'
import {
  logoutUser,
  signInGoogle,
  signInWithEmail,
  signUpWithEmailAndPassword
} from '../services/firebase/AuthService'
import { formatEmail } from '../utils/formatUser'

export const UserContext = createContext()

export default function UserProvider ({ children }) {
  const [location, setLocation] = useLocation()
  const [loggedIn, setLoggedIn] = useState()
  const [accessToken, setAccessToken] = useState()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const toast = useToast()

  const registerWithEmail = async (email, password) => {
    setLoading(true)

    return signUpWithEmailAndPassword(email, password).then((res) => {
      setLoading(false)
      return res
    })
  }

  const loginWithEmail = async (email, password) => {
    setLoading(true)

    return signInWithEmail(email, password).then((res) => {
      setLoading(false)
      return res
    })
  }

  const loginWithGoogle = async () => {
    setLoading(true)

    return signInGoogle().then((res) => {
      setLoading(false)

      if (res.status === 404) {
        toast({
          title: 'Error',
          description: res.error,
          status: 'error',
          duration: 5000,
          isClosable: true
        })

        return
      }

      return res
    })
  }

  const isNotUser = () => {
    if (!user) return false

    return (
      user?.roles?.includes('admin') ||
      user?.roles?.includes('soporte_tecnico') ||
      user?.roles?.includes('vigilante')
    )
  }

  const isOnlyVigilant = () => {
    if (!user) return false

    return (
      user?.roles?.includes('vigilante') &&
      !user?.roles?.includes('admin') &&
      !user?.roles?.includes('soporte_tecnico')
    )
  }

  const logout = async () => {
    setLoading(true)

    return logoutUser()
      .then((res) => {
        if (res.status === 200) {
          setUser(null)
          setLocation('/')
          setLoading(false)
          setToken(null)
          setAccessToken(undefined)
          setLoggedIn(undefined)

          // reload page
          window.location.reload()
        }

        return res
      })
      .finally(() => setLoading(false))
  }

  /*
   * on login update or create user in firestore database
   */
  const handleLogin = async (userInfo) => {
    const response = await login(userInfo)

    if (!response.error) {
      if (location === '/') setLocation('/home')
      setUser({
        ...user,
        name: response.data.nombre,
        photo: response.data.photo,
        email: response.data.correo,
        uid: response.data.id,
        codigo: response.data.codigo,
        roles: response.data.roles,
        estado: response.data.estado,
        tipo: response.data.tipo
      })
    } else setUser(null)
  }

  console.log(token)

  useEffect(() => {
    // firebase auth
    const unsuscribeStateChanged = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // if (!user?.emailVerified) {
        //   setLocation('/verificar-email')
        //   return
        // }

        const userInfo = {
          email: user.email,
          uid: user.uid,
          name:
            user.displayName && user.displayName?.length > 0
              ? user.displayName
              : formatEmail(user.email || ''),
          photo: user.photoURL || '',
          roles: [],
          codigo: '',
          estado: 'INACTIVO',
          tipo: 'ESTUDIANTE',
          emailVerified: user.email === 'ingsistemas@ufps.edu.co' ? true : user.emailVerified
        }

        const token = await user.getIdToken(true)

        setAccessToken(token)
        setUser(userInfo)
        setLoggedIn(true)
      } else {
        setLoading(false)
        setLoggedIn(false)
      }
    })

    return () => {
      unsuscribeStateChanged()
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && user) {
        console.log(user)
        await handleLogin({
          nombre: user.name,
          correo: user.email,
          photo: user.photo
        })

        setToken(accessToken)
      }
      setLoading(false)
    }

    if (loggedIn !== undefined) fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, accessToken])

  const value = useMemo(() => {
    return {
      token,
      user,
      handleLogin,
      loginWithGoogle,
      logout,
      loading,
      registerWithEmail,
      loginWithEmail,
      isNotUser,
      isOnlyVigilant
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, loading])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
