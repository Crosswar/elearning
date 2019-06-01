import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  padding: 15px 30px;
  border-top: 1px solid #e7e7e7;
`

const Copyright = styled.div`
  font-size: 14px;
  text-align: right;
`

const Footer = () => {
  const now = new Date()

  return (
    <Wrapper>
      <Copyright>
        © {now.getFullYear()} <a href='https://www.ibsel.com.br'>IBSEL</a>,
        Instituto Brasileiro de Saúde Euclides Leite
      </Copyright>
    </Wrapper>
  )
}

export default Footer
