import * as React from 'react'

import { GenericFieldState, Value, Constraints } from '../../modules/constants'
import Validation from '../../validation'
import { ActionType, State, Action } from './constants'
import { getUpdatedValues } from './helpers'
import reducer from './reducer'

type Config<T> = {
  constraints?: Constraints<T>
}

type Fields<T> = {
  [P in keyof T]: {
    value: any
    dirty: boolean
    errors: string[]
    onChange: (value: any) => void
    onBlur: () => void
  }
}

type Result<T> = State<T> & {
  isValid: boolean
  isDirty: boolean
  fields: Fields<T>
}

const useForm = <T extends GenericFieldState>(
  initialValues: Value<T>,
  { constraints = {} }: Config<T> = {}
): Result<T> => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<State<T>, Action<T>>
  >(reducer, {
    initialValues,
    values: initialValues,
    errors: Validation.validate(initialValues, constraints),
    dirties: {},
  })
  const { values, errors, dirties } = state

  React.useEffect(() => {
    const updatedValues = getUpdatedValues(state.initialValues, initialValues)

    if (Object.keys(updatedValues).length > 0) {
      const newValues = {
        ...state.initialValues,
        ...updatedValues,
      }

      dispatch({
        type: ActionType.INIT,
        payload: {
          initialValues: newValues,
          values: newValues,
          errors: Validation.validate(newValues, constraints),
          dirties: {},
        },
      })
    }
  }, [initialValues, state.initialValues])

  const onChange = React.useMemo(
    () => (field: string) => (value: any) => {
      dispatch({ type: ActionType.SET_FIELD_VALUE, payload: { field, value } })

      const fieldErrors = Validation.validate(
        { [field]: value },
        { [field]: constraints[field] }
      )

      dispatch({
        type: ActionType.SET_FIELD_ERRORS,
        payload: { field, errors: fieldErrors[field] || [] },
      })
    },
    [values, constraints]
  )

  const onBlur = React.useMemo(
    () => (field: string) => () => {
      dispatch({
        type: ActionType.SET_FIELD_DIRTY,
        payload: { field, dirty: true },
      })
    },
    []
  )

  // @ts-ignore
  const fields: Fields<T> = React.useMemo(
    () =>
      Object.entries(values).reduce(
        (prev, [field, value]) => ({
          ...prev,
          [field]: {
            value,
            dirty: dirties[field] || false,
            errors: errors[field] || [],
            onChange: onChange(field),
            onBlur: onBlur(field),
          },
        }),
        {}
      ),
    [values, dirties, errors]
  )

  const isValid = React.useMemo(() => Object.keys(errors).length === 0, [
    errors,
  ])

  const isDirty = React.useMemo(() => Object.keys(dirties).length > 0, [
    dirties,
  ])

  return {
    ...state,
    fields,
    isValid,
    isDirty,
  }
}

export default useForm
