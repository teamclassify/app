import { Avatar, Flex, Heading, Spinner } from '@chakra-ui/react'
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
                  <Flex alignItems="center" flexDirection='column'>
                    <Avatar src={user.photo} size='xl' />
                    <Heading pt={2} as='h1' fontSize='13px' textAlign='center' color='white'>{user.name}</Heading>
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
