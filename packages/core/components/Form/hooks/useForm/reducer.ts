import { ActionType, State, Action } from './constants'

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case ActionType.INIT: {
      return action.payload
    }
    case ActionType.SET_FIELD_VALUE: {
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value,
        },
      }
    }
    case ActionType.SET_FIELD_ERRORS: {
      const errors = {
        ...state.errors,
        [action.payload.field]: action.payload.errors,
      }

      return {
        ...state,
        errors: Object.entries(errors).reduce((prev, [field, errors]) => {
          if (!!errors && errors.length > 0) {
            return {
              ...prev,
              [field]: errors,
            }
          }

          return prev
        }, {}),
      }
    }
    case ActionType.SET_FIELD_DIRTY: {
      return {
        ...state,
        dirties: {
          ...state.dirties,
          [action.payload.field]: action.payload.dirty,
        },
      }
    }
  }
}

export default reducer
