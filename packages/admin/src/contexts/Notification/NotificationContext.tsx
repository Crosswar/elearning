import * as React from 'react'

export type NotificationValueType = {
  error: (body: React.ReactNode, duration?: number) => void
  success: (body: React.ReactNode, duration?: number) => void
  warning: (body: React.ReactNode, duration?: number) => void
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
