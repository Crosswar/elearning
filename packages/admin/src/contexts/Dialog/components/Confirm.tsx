import * as React from 'react'

import { Button } from '@ibsel/admin/src/components'

import { ConfirmPayload } from '../DialogContext'
import Actions from './common/Actions'
import Body from './common/Body'
import Icon from './common/Icon'
import Title from './common/Title'

type Props = ConfirmPayload & {
  closeDialog: () => void
}

const Confirm = ({
  title,
  body,
  okLabel,
  cancelLabel,
  onOk,
  onCancel,
  closeDialog,
}: Props) => (
  <>
    <Icon />

    {title && <Title>{title}</Title>}

    {body && <Body>{body}</Body>}

    <Actions>
      <Button
        color={Button.Color.SUCCESS}
        onClick={() => {
          closeDialog()
          onOk && onOk()
        }}
      >
        {okLabel}
      </Button>
      <Button
        color={Button.Color.DANGER}
        onClick={() => {
          closeDialog()
          onCancel && onCancel()
        }}
      >
        {cancelLabel}
      </Button>
    </Actions>
  </>
)

Confirm.defaultProps = {
  icon: Icon.WARNING,
  okLabel: 'Ok',
  cancelLabel: 'Cancel',
}

export default Confirm
