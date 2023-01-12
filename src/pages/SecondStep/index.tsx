import React, { useRef, useState } from 'react'
import { Container, Content } from './styles'
import { FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import Select from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom'
import { createUser } from 'sdk'

import { Input } from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../utils/getValidationErros'
import { toast } from 'react-toastify'

interface SecondStepFormData {
  email: string
}

const SecondStep: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { state } = useLocation()
  const navigate = useNavigate()

  const [newsletter, setNewsletter] = useState<{
    label: string
    value: 'daily' | 'weekly' | 'monthly'
  }>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: SecondStepFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('Digite seu e-mail').email('Digite um e-mail válido'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      if (newsletter) {
        setLoading(true)
        await createUser({ ...state, email: data.email, newsletter: newsletter?.value }).then(
          () => {
            setLoading(false)
          }
        )
        navigate(-1)
        setNewsletter(undefined)
        toast.success('Usuário cadastrado com sucesso :)', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return
      }
      toast.error('Selecione um período de newsletter', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err)
        formRef.current?.setErrors(erros)
        return
      }
      toast.error('Houve um erro inesperado, tente novamnete', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Finalize seu cadastro</h1>
          <Input name="email" icon={FiMail} placeholder="Seu e-mail" />
          <Select
            onChange={(choice) => {
              setNewsletter(
                choice as {
                  label: string
                  value: 'daily' | 'weekly' | 'monthly'
                }
              )
            }}
            value={newsletter}
            name="newsletter"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? '#ff9000' : '#312e38',
                textAlign: 'left',
                padding: 8,
                backgroundColor: '#232129',
                color: '#f4ede8',
                ':hover': {
                  borderColor: 'transparent',
                },
              }),
            }}
            className="basic-single"
            classNamePrefix="select"
            options={[
              { label: 'Diário', value: 'daily' },
              { label: 'Semanal', value: 'weekly' },
              { label: 'Mensal', value: 'monthly' },
            ]}
            placeholder="Escolha um período de Newsletter"
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: {
                ...theme.colors,
                primary: '#ff9000',
                primary25: '#ff9000',
                neutral0: '#232129',
                neutral80: '#f4ede8',
              },
            })}
          />
          <Button type="submit" disabled={loading}>
            Finalizar
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export { SecondStep }
