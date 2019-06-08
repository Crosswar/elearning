import * as React from 'react'
import styled from 'styled-components'

import Notification from './components/Notification'
import { DEFAULT_DURATION } from './modules/constants'
import { Action, reducer, initialState } from './modules/reducer'
import NotificationContext, { NotifyPayload } from './NotificationContext'

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
    () => (payload: NotifyPayload) => {
      const notification = {
        ...payload,
        id: new Date().getTime().toString(),
      }

      dispatch({
        payload: notification,
        type: Action.CREATE,
      })

      return notification
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

  const value = {
    notify: (payload: NotifyPayload) => {
      const { id } = create(payload)

      setTimeout(() => {
        hide(id)
      }, payload.duration || DEFAULT_DURATION)
    },
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
            {notification.message}
          </Notification>
        ))}
      </Wrapper>
    </>
  )
}

export default NotificationContainer
