import { NotifyPayload as ContextActionPayload } from '../NotificationContext'

type NotificationPayload = ContextActionPayload & {
  id: number
}

type Notification = NotificationPayload & {
  hidden: boolean
}

type State = Notification[]

export const initialState: State = []

export enum Action {
  CREATE = 'Notification/Create',
  HIDE = 'Notification/Hide',
  REMOVE = 'Notification/Remove',
}

type CreateNotificationAction = {
  type: Action.CREATE
  payload: NotificationPayload
}
type HideNotificationAction = { type: Action.HIDE; payload: { id: number } }
type RemoveNotificationAction = { type: Action.REMOVE; payload: { id: number } }
type Actions =
  | CreateNotificationAction
  | HideNotificationAction
  | RemoveNotificationAction

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case Action.CREATE: {
      return [
        ...state,
        {
          ...action.payload,
          hidden: false,
        },
      ]
    }
    case Action.HIDE: {
      return state.map(notification => {
        if (notification.id !== action.payload.id) {
          return notification
        }

        return {
          ...notification,
          hidden: true,
        }
      })
    }
    case Action.REMOVE: {
      return state.filter(notification => notification.id !== action.payload.id)
    }
    default:
      return state
  }
}
