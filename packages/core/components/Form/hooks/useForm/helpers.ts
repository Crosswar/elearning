import { GenericFieldState, Value } from '../../modules/constants'

export const getUpdatedValues = <T extends GenericFieldState>(
  oldValues: Value<T>,
  newValues: Value<T>
): Partial<T> => {
  return Object.keys(oldValues).reduce((accumulator, key) => {
    if (oldValues[key] === newValues[key]) {
      return accumulator
    }

    return {
      ...accumulator,
      [key]: newValues[key],
    }
  }, {})
}
