import * as React from 'react'

export type NotificationValueType = {
  error: (message: string, duration?: number) => void
  success: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

const initialValue: NotificationValueType = {
  error: () => {},
  success: () => {},
  warning: () => {},
}

const NotificationContext = React.createContext<NotificationValueType>(
  initialValue
)

export default NotificationContext
