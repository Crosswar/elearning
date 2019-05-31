import * as React from 'react'

import { Color } from './modules/constants'

export type NotifyPayload = {
  color?: Color
  duration?: number
  message: string
}

export type NotificationValueType = {
  notify: (payload: NotifyPayload) => void
}

const initialValue: NotificationValueType = {
  notify: () => {},
}

const NotificationContext = React.createContext<NotificationValueType>(
  initialValue
)

export default NotificationContext
