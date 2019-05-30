import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

import THEME from '@ibsel/admin/src/styles/theme'

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.5rem;
    -webkit-font-smoothing: antialiased;
  }
  * {
    box-sizing: border-box;
    box-shadow: none;
    outline: none;
  }
  a {
    transition: color 200ms;
    color: ${({ theme }) => theme.colors.main};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => lighten(0.05)(theme.colors.main)};
    }
  }
  input, button {
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }
`

type Props = {
  children: React.ReactNode
}

const AppTheme = ({ children }: Props) => (
  <ThemeProvider theme={THEME}>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
)

export default AppTheme
