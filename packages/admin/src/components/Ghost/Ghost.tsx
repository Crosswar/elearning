import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0%{
    background-position: -468px 0
  }
  100%{
    background-position: 468px 0
  }
`

const Ghost = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${animation};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
`

export default Ghost
