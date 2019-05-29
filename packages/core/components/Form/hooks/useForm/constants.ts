import {
  GenericFieldState,
  Value,
  Dirty,
  Errors,
} from '../../modules/constants'

export enum ActionType {
  SET_FIELD_VALUE = 'SET_FIELD_VALUE',
  SET_FIELD_ERRORS = 'SET_FIELD_ERRORS',
  SET_FIELD_DIRTY = 'SET_FIELD_DIRTY',
  SET_SUBMITTING = 'SET_SUBMITTING',
}

export type State<T extends GenericFieldState> = {
  values: Value<T>
  errors: Errors<T>
  dirties: Dirty<T>
  isSubmitting: boolean
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

export type SetSubmittingAction = {
  type: ActionType.SET_SUBMITTING
  payload: boolean
}

export type Action =
  | SetFieldValueAction
  | SetFieldErrorsAction
  | SetFieldDirtyAction
  | SetSubmittingAction
