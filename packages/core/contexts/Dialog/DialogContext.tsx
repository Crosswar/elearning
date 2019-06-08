import * as React from 'react'

export type DialogPayload = {
  id: string
  content: React.ReactElement<any>
}

export type DialogValueType = {
  dialog: (payload: DialogPayload) => void
}

const initialValue: DialogValueType = {
  dialog: () => {},
}

const DialogContext = React.createContext<DialogValueType>(initialValue)

export default DialogContext
