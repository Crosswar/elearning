import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Route } from '@ibsel/admin/src/router'

import UserAdd from './UsersAdd'

type Props = RouteComponentProps & {}

const UsersDetail = ({ match }: Props) => {
  if (match.path === Route.USERS_ADD) {
    return <UserAdd />
  }

  return <div>@TODO</div>
}

export default UsersDetail
