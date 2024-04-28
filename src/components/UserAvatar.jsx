import { Avatar, Flex, Spinner, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { Link } from 'wouter'

import useUser from '../hooks/useUser'

function UserAvatar () {
  const { user, loading, logout } = useUser()

  return (
   <>
    {loading
      ? <Spinner />
      : <Flex>
        {
          user
            ? <>
              <Menu>
                <MenuButton>
                  <Flex gap={1} alignItems="center">
                    <Avatar src={user.photo} size='sm' />
                    <MdArrowDropDown />
                  </Flex>
                </MenuButton>

                <MenuList p={0} fontSize="sm">
                  <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
                </MenuList>
              </Menu>
            </>
            : <Link href='/login'>Iniciar sesion</Link>
        }
      </Flex>
      }
   </>
  )
}

export default UserAvatar
