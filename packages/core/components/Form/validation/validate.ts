import {
  GenericFieldState,
  ValidationRule,
  Value,
  Constraints,
  Errors,
} from '../modules/constants'

const validate = <T extends GenericFieldState>(
  values: Value<T>,
  constraints: Constraints<T>
): Errors<T> => {
  const errors: Errors<T> = {}

  Object.keys(constraints).forEach(field => {
    const value = values[field]
    const rules = constraints[field] || []

    const fieldErrors = rules
      .map((rule: ValidationRule) => rule(value))
      .filter((error: string | null) => !!error)

    if (fieldErrors.length > 0) {
      // @ts-ignore
      errors[field] = fieldErrors
    }
  })

  return errors
}

export default validate
