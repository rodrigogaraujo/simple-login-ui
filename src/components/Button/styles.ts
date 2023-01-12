import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
    width: 100%;
    height: 56px;
    margin-top: 16px;
    padding: 16px 0;
    background: #ff9000;
    border: 0;
    border-radius: 10px;
    transition: background-color 0.2s;
    font-weight: 500;
    &:hover {
        background: ${shade(0.2, '#ff9000')};
    }
`
