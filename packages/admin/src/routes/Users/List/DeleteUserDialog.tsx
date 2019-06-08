import * as React from 'react'

import { Dialog } from '@ibsel/core/contexts'
import { Button } from '@ibsel/admin/src/components'

const ID = 'DeleteUserDialog'

type Props = {
  name: string
}

const DeleteUserDialog = ({ name }: Props) => (
  <>
    <Dialog.Title>Are you sure?</Dialog.Title>

    <Dialog.Text>
      You will not be able to recover this imaginary file!
    </Dialog.Text>

    <Dialog.Actions>
      <Button color={Button.Color.SUCCESS}>Yes, delete it!</Button>
      <Button color={Button.Color.DANGER}>Cancel</Button>
    </Dialog.Actions>
  </>
)

DeleteUserDialog.ID = ID

export default DeleteUserDialog
