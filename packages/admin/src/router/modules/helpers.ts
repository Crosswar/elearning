import { Route } from './constants'

export const routeTo = (route: Route, params: Object = {}): string =>
  Object.entries(params).reduce(
    // @ts-ignore
    (accumulator, [key, value]) => accumulator.replace(`:${key}`, value),
    route
  )
