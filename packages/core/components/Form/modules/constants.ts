export type GenericFieldState = {
  [field: string]: any
}

export type FieldsState<T, K> = { [P in keyof T]: K } | GenericFieldState

export type ValidationRule = (value: any) => string | null
export type Constraints<T> = FieldsState<T, ValidationRule[]>

export type Value<T> = FieldsState<T, any>
export type Dirty<T> = FieldsState<T, boolean>
export type Errors<T> = FieldsState<T, string[]>
