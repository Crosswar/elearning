export type GenericFieldState = {
  [field: string]: any
}

type FieldsState<T, K> = { [P in keyof T]: K }
type OptionalFieldsState<T, K> = { [P in keyof T]?: K }

export type ValidationRule = (value: any) => string | null
export type Constraints<T> = OptionalFieldsState<T, ValidationRule[]>

export type Value<T> = FieldsState<T, any>
export type Dirty<T> = OptionalFieldsState<T, boolean>
export type Errors<T> = OptionalFieldsState<T, string[]>
