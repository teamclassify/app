import { Avatar, Flex, Spinner } from '@chakra-ui/react'
import { Link } from 'wouter'

import useUser from '../hooks/useUser'

function UserAvatar () {
  const { user, loading } = useUser()

  return (
   <>
    {loading
      ? <Spinner />
      : <Flex>
        {
          user
            ? <>
                  <Flex alignItems="center">
                    <Avatar src={user.photo} size='2xl' />
                  </Flex>
            </>
            : <Link href='/login'>Iniciar sesion</Link>
        }
      </Flex>
      }
   </>
  )
}

export default UserAvatar
