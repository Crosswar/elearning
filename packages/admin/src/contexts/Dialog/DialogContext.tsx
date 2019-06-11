import * as React from 'react'

export type AlertPayload = {
  title?: string
  body?: React.ReactNode
  okLabel?: string
  onOk?: () => void
}

export type ConfirmPayload = {
  title?: string
  body?: React.ReactNode
  okLabel?: string
  cancelLabel?: string
  onOk?: () => void
  onCancel?: () => void
}

export type DialogValueType = {
  alert: (payload: AlertPayload) => void
  confirm: (payload: ConfirmPayload) => void
}

const initialValue: DialogValueType = {
  alert: () => {},
  confirm: () => {},
}

const DialogContext = React.createContext<DialogValueType>(initialValue)

export default DialogContext
