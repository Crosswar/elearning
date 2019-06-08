import * as React from 'react'

import { Button } from '@ibsel/admin/src/components'

import { AlertPayload } from '../DialogContext'
import Actions from './common/Actions'
import Body from './common/Body'
import Title from './common/Title'

type Props = AlertPayload & {
  closeDialog: () => void
}

const Alert = ({ title, body, okLabel, onOk, closeDialog }: Props) => (
  <>
    {title && <Title>{title}</Title>}

    {body && <Body>{body}</Body>}

    <Actions>
      <Button
        color={Button.Color.MAIN}
        onClick={() => {
          closeDialog()
          onOk && onOk()
        }}
      >
        {okLabel}
      </Button>
    </Actions>
  </>
)

Alert.defaultProps = {
  okLabel: 'Ok',
}

export default Alert
