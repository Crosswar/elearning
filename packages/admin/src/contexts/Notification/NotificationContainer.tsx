import * as React from 'react'
import styled from 'styled-components'

import Notification from './components/Notification'
import { Color } from './modules/constants'
import {
  NotificationType,
  Action,
  reducer,
  initialState,
} from './modules/reducer'
import NotificationContext from './NotificationContext'

const Wrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
`

type Props = {
  children: React.ReactNode
}

const NotificationContainer = (props: Props) => {
  const { children } = props

  const [notifications, dispatch] = React.useReducer(reducer, initialState)

  const create = React.useMemo(
    () => (payload: NotificationType) => {
      dispatch({
        payload,
        type: Action.CREATE,
      })
    },
    []
  )

  const hide = React.useMemo(
    () => (id: string) => {
      dispatch({
        payload: {
          id,
        },
        type: Action.HIDE,
      })
    },
    []
  )

  const remove = React.useMemo(
    () => (id: string) => {
      dispatch({
        payload: {
          id,
        },
        type: Action.REMOVE,
      })
    },
    []
  )

  const notify = React.useMemo(
    () => (body: React.ReactNode, color: Color, duration: number = 3000) => {
      const id = new Date().getTime().toString()
      const visible = true

      create({
        id,
        body,
        color,
        duration,
        visible,
      })

      setTimeout(() => {
        hide(id)
      }, duration)
    },
    []
  )

  const value = {
    error: (body: React.ReactNode, duration?: number) =>
      notify(body, Color.DANGER, duration),
    success: (body: React.ReactNode, duration?: number) =>
      notify(body, Color.SUCCESS, duration),
    warning: (body: React.ReactNode, duration?: number) =>
      notify(body, Color.WARNING, duration),
  }

  return (
    <>
      <NotificationContext.Provider value={value}>
        {children}
      </NotificationContext.Provider>

      <Wrapper>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onHide={() => remove(notification.id)}
          >
            {notification.body}
          </Notification>
        ))}
      </Wrapper>
    </>
  )
}

export default NotificationContainer
