import * as React from 'react'

export type DialogType = {
  id: string
  visible: boolean
  content: React.ReactNode
}

type State = DialogType[]

export const initialState: State = []

export enum Action {
  CREATE = 'Dialog/Create',
  HIDE = 'Dialog/Hide',
  HIDE_ALL = 'Dialog/Hide/All',
  REMOVE = 'Dialog/Remove',
  REMOVE_ALL = 'Dialog/Remove/All',
}

type CreateDialogAction = {
  type: Action.CREATE
  payload: DialogType
}
type HideDialogAction = { type: Action.HIDE; payload: { id: string } }
type HideAllDialogAction = { type: Action.HIDE_ALL }
type RemoveDialogAction = { type: Action.REMOVE; payload: { id: string } }
type RemoveAllDialogAction = { type: Action.REMOVE_ALL }
type Actions =
  | CreateDialogAction
  | HideDialogAction
  | HideAllDialogAction
  | RemoveDialogAction
  | RemoveAllDialogAction

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case Action.CREATE: {
      return [
        ...state,
        {
          ...action.payload,
          visible: true,
        },
      ]
    }
    case Action.HIDE: {
      return state.map(dialog => {
        if (dialog.id !== action.payload.id) {
          return dialog
        }

        return {
          ...dialog,
          visible: false,
        }
      })
    }
    case Action.HIDE_ALL: {
      return state.map(dialog => {
        return {
          ...dialog,
          visible: false,
        }
      })
    }
    case Action.REMOVE: {
      return state.filter(dialog => dialog.id !== action.payload.id)
    }
    case Action.REMOVE_ALL: {
      return []
    }
    default:
      return state
  }
}
