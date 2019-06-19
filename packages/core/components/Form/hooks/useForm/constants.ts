import {
  GenericFieldState,
  Value,
  Dirty,
  Errors,
} from '../../modules/constants'

export enum ActionType {
  INIT = 'INIT',
  SET_FIELD_VALUE = 'SET_FIELD_VALUE',
  SET_FIELD_ERRORS = 'SET_FIELD_ERRORS',
  SET_FIELD_DIRTY = 'SET_FIELD_DIRTY',
}

export type State<T extends GenericFieldState> = {
  initialValues: Value<T>
  values: Value<T>
  errors: Errors<T>
  dirties: Dirty<T>
}

export type InitAction<T extends GenericFieldState> = {
  type: ActionType.INIT
  payload: State<T>
}

export type SetFieldValueAction = {
  type: ActionType.SET_FIELD_VALUE
  payload: {
    field: string
    value: any
  }
}

export type SetFieldErrorsAction = {
  type: ActionType.SET_FIELD_ERRORS
  payload: {
    field: string
    errors: string[]
  }
}

export type SetFieldDirtyAction = {
  type: ActionType.SET_FIELD_DIRTY
  payload: {
    field: string
    dirty: boolean
  }
}

export type Action<T extends GenericFieldState> =
  | InitAction<T>
  | SetFieldValueAction
  | SetFieldErrorsAction
  | SetFieldDirtyAction
