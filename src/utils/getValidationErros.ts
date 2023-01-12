import { ValidationError } from 'yup'

type Erros = Record<string, string>

export default function getValidationErros (err: ValidationError): Erros {
  const validatinoErrors: Erros = {}

  err.inner.forEach((error) => {
    validatinoErrors[error.path as string] = error.message
  })

  return validatinoErrors
}
