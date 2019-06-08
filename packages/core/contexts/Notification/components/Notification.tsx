import * as React from 'react'
import { animated } from 'react-spring'
import { Spring, config } from 'react-spring/renderprops'
import styled from 'styled-components'

import { Color } from '../modules/constants'
import style, { StyleProps } from '../modules/style'

const Wrapper = styled(animated.div)`
  min-width: 250px;
  overflow: hidden;
`

const Inner = styled.div<StyleProps>`
  padding: 20px 15px;
  ${style};
`

type Props = {
  color: Color
  visible: boolean
  onHide?: () => void
  children: React.ReactNode
}

const Notification = (props: Props) => {
  const { color, visible, onHide, children } = props

  return (
    <Spring
      from={{
        height: 0,
        opacity: 0,
        marginBottom: 0,
      }}
      to={{
        height: visible ? 'auto' : 0,
        opacity: visible ? 1 : 0,
        marginBottom: visible ? 15 : 0,
      }}
      config={key => (key === 'height' ? config.gentle : config.default)}
      onRest={() => !visible && onHide && onHide()}
    >
      {style => (
        <Wrapper style={style}>
          <Inner color={color}>{children}</Inner>
        </Wrapper>
      )}
    </Spring>
  )
}

Notification.defaultProps = {
  color: Color.MAIN,
}

export default Notification
