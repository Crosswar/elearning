import * as React from 'react'

type Props = {
  children: string
  className?: string
}

const MaterialIcon = ({ children, ...props }: Props) => {
  const className = props.className
    ? `material-icons ${props.className}`
    : 'material-icons'

  return <i className={className}>{children}</i>
}

export default MaterialIcon
