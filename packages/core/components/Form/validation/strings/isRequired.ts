type Config = {
  message?: string
}

const isRequired = (config?: Config) => (value: string) => {
  const { message = 'This field is required' } = config || {}

  if (value === undefined || value === null || value.trim().length === 0) {
    return message
  }

  return null
}

export default isRequired
