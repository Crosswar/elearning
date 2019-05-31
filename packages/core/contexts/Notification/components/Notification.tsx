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
  hidden: boolean
  onHide?: () => void
  children: React.ReactNode
}

const Notification = (props: Props) => {
  const { color, hidden, onHide, children } = props

  return (
    <Spring
      from={{
        height: 0,
        opacity: 0,
        marginBottom: 0,
      }}
      to={{
        height: hidden ? 0 : 'auto',
        opacity: hidden ? 0 : 1,
        marginBottom: hidden ? 0 : '1rem',
      }}
      config={key => (key === 'height' ? config.gentle : config.default)}
      onRest={() => hidden && onHide && onHide()}
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
