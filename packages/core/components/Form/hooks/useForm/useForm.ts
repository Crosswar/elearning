import * as React from 'react'

import {
  GenericFieldState,
  Value,
  Errors,
  Dirty,
  Constraints,
} from '../../modules/constants'
import Validation from '../../validation'
import { ActionType, State, Action } from './constants'
import reducer from './reducer'

type SubmitFunction = <T>() => Promise<T>
type SubmitConfig<T> = {
  onSuccess?: (result: T) => void
  onError?: (error: Error) => void
}

type Config<T> = {
  constraints?: Constraints<T>
}

type Fields<T> = {
  [P in keyof T]: {
    value: any
    dirty: boolean
    errors: string[]
    onChange: Function
    onBlur: Function
  }
}

type Result<T> = {
  values: Value<T>
  errors: Errors<T>
  dirties: Dirty<T>
  isValid: boolean
  isDirty: boolean
  fields: Fields<T>
  isSubmitting: boolean
  handleSubmit: (
    submitFn: SubmitFunction,
    submitConfig: SubmitConfig<T>
  ) => void
}

const useForm = <T extends GenericFieldState>(
  initialValues: Value<T> = {},
  { constraints = {} }: Config<T> = {}
): Result<T> => {
  const initialState = {
    values: initialValues,
    errors: Validation.validate(initialValues, constraints),
    dirties: {},
    isSubmitting: false,
  }

  const [state, dispatch] = React.useReducer<React.Reducer<State<T>, Action>>(
    reducer,
    initialState
  )
  const { values, errors, dirties, isSubmitting } = state

  const onChange = React.useMemo(
    () => (field: string) => (value: any) => {
      dispatch({ type: ActionType.SET_FIELD_VALUE, payload: { field, value } })

      const fieldErrors = Validation.validate(values, constraints)

      dispatch({
        type: ActionType.SET_FIELD_ERRORS,
        payload: { field, errors: fieldErrors[field] || [] },
      })
    },
    []
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

  const isDirty = React.useMemo(() => Object.keys(dirties).length === 0, [
    dirties,
  ])

  const handleSubmit = React.useMemo(
    () => (
      submitFn: SubmitFunction,
      { onSuccess, onError }: SubmitConfig<T> = {}
    ) => async () => {
      if (isSubmitting) {
        return
      }

      dispatch({
        type: ActionType.SET_SUBMITTING,
        payload: true,
      })

      try {
        const result: T = await submitFn()

        dispatch({
          type: ActionType.SET_SUBMITTING,
          payload: false,
        })

        onSuccess && onSuccess(result)
      } catch (err) {
        onError && onError(err)

        dispatch({
          type: ActionType.SET_SUBMITTING,
          payload: false,
        })
      }
    },
    []
  )

  return {
    values,
    errors,
    dirties,
    fields,
    isValid,
    isDirty,
    isSubmitting,
    handleSubmit,
  }
}

export default useForm
