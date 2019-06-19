import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Route } from '@ibsel/admin/src/router'

import UsersAdd from './UsersAdd'
import UsersEdit from './UsersEdit'

type Props = RouteComponentProps & {}

const UsersDetail = ({ match }: Props) => {
  if (match.path === Route.USERS_ADD) {
    return <UsersAdd />
  }

  return <UsersEdit />
}

export default UsersDetail
