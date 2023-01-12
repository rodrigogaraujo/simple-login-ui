import React, { useRef } from 'react'
import { Container, Content } from './styles'
import { FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../components/Input'
import Button from '../../components/Button'
import getValidationErros from '../../utils/getValidationErros'

interface FirstStepFormData {
  name: string
  age: number
}

const FirstStep: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const handleSubmit = async (data: FirstStepFormData) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Digite seu nome'),
        age: Yup.number()
          .test('Is positive?', 'Digite sua idade', (value) => {
            if (value && value > 0) return true
            return false
          })
          .required('Digite sua idade'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })
      navigate('/step-two', { state: data })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err)
        formRef.current?.setErrors(erros)
      }
    }
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Seu nome" />
          <Input name="age" placeholder="Sua idade" type="number" defaultValue={0} />
          <Button type="submit">Avançar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export { FirstStep }
