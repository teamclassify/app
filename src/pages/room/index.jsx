import { useParams } from 'wouter'

import Wrapper from '@/components/Wrapper'
import RoomContent from './RoomContent'

function Room () {
  const params = useParams()
  const id = params.id

  return (
    <>
      <Wrapper>
        {id && <RoomContent id={id} /> }
      </Wrapper>
    </>
  )
}

export default Room
