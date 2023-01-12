import React from 'react'

import { Container } from './styles'

interface TooltipeProps {
  title: string
  className?: string
  children: any
}

const Tooltip: React.FC<TooltipeProps> = ({ title, className = '', children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

export { Tooltip }
