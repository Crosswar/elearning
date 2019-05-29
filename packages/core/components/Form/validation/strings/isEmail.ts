type Config = {
  message?: string
}

const isEmail = (config?: Config) => (value: string) => {
  const { message = 'Invalid e-mail address' } = config || {}

  const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  if (!isValid) {
    return message
  }

  return null
}

export default isEmail
