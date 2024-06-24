import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Select,
  Spinner,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { useLocation, useParams } from 'wouter'
import { useMutation, useQuery } from 'react-query'
import { IoMdSend } from 'react-icons/io'

import Wrapper from '@/components/Wrapper'
import useUser from '@/hooks/useUser'
import AnomaliesService from '../../services/api/AnomaliesService.js'
import LoansService from '../../services/api/LoansService.js'

function Anomalies () {
  const toast = useToast()
  const { user, loading } = useUser()
  const [, setLocation] = useLocation()
  const params = useParams()
  const id = params.id

  const { data, isLoading } = useQuery(['loan', id], () =>
    LoansService.getById(id)
  )

  const mutateCreate = useMutation((description) => {
    const promise = AnomaliesService.create({
      prestamo_id: data?.id,
      descripcion: description
    })

    toast.promise(promise, {
      success: { title: 'Anomalía enviada' },
      error: { title: 'Error al enviar la anomalía' },
      loading: { title: 'Enviando anomalía' }
    })

    return promise
  })

  if (!loading && !user) setLocation('/')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.description.value.trim()) {
      mutateCreate.mutate(e.target.description.value)
    }
  }

  return (
    <Wrapper>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Reportar Anomalía
        </Heading>

        {isLoading
          ? (
          <Spinner />
            )
          : (
          <>
            {data && (
              <Box rounded={'md'} p={4} bg={'white'}>
                <form onSubmit={handleSubmit}>
                  <FormControl mb={6}>
                    <label>Sala</label>
                    <Select mt={2} defaultValue={data.sala} isDisabled>
                      <option value={data.sala}>
                        {data.edificio} - {data.sala}
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <label>¿Cuál es el problema?</label>
                    <Textarea
                      mt={2}
                      minH={200}
                      isRequired
                      name={'description'}
                    />
                  </FormControl>

                  <Flex mt={6} justifyContent={'end'}>
                    <Button
                      colorScheme={'primary'}
                      leftIcon={<IoMdSend />}
                      type={'submit'}
                    >
                      Enviar
                    </Button>
                  </Flex>
                </form>
              </Box>
            )}
          </>
            )}
      </Box>
    </Wrapper>
  )
}

export default Anomalies
