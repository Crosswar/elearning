declare module '*.png'
declare module '*.jpg'
declare module '*.json'
declare module '*.svg'

declare module '*.graphql' {
  const content: any
  export default content
}
