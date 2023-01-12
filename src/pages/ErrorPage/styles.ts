import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  align-items: stretch;
  display: flex;
  height: 100vh;
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Content = styled.div`
  width: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${appearFromLeft} 1s;
  form {
    margin: 80px 0;
    max-width: 340px;
    text-align: center;
    width: 100%;
    h1 {
      margin-bottom: 24px;
    }
    a {
      display: block;
      margin-top: 24px;
      color: #f4ede8;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
          color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    display: block;
    color: #ff9000;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    svg {
        margin-right: 16px;
    }
    &:hover {
        color: ${shade(0.2, '#ff9000')};
    }
  }
`
