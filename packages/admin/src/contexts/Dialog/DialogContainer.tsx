import * as React from 'react'
import styled from 'styled-components'

import Alert from './components/Alert'
import Confirm from './components/Confirm'
import Dialog from './components/Dialog'
import { DialogType, Action, reducer, initialState } from './modules/reducer'
import DialogContext, { AlertPayload, ConfirmPayload } from './DialogContext'

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ visible }) => (visible ? 10 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Overlay = styled.div<{ visible: boolean }>`
  transition: all 100ms;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, ${({ visible }) => (visible ? 0.4 : 0)});
`

type Props = {
  children: React.ReactNode
}

const DialogContainer = (props: Props) => {
  const { children } = props

  const [dialogs, dispatch] = React.useReducer(reducer, initialState)

  const create = React.useMemo(
    () => (payload: DialogType) => {
      dispatch({
        payload,
        type: Action.CREATE,
      })
    },
    []
  )

  const hide = React.useMemo(
    () => (id: string) => {
      dispatch({
        payload: {
          id,
        },
        type: Action.HIDE,
      })
    },
    []
  )

  const hideAll = React.useMemo(
    () => () => {
      dispatch({
        type: Action.HIDE_ALL,
      })
    },
    []
  )

  const remove = React.useMemo(
    () => (id: string) => {
      dispatch({
        payload: {
          id,
        },
        type: Action.REMOVE,
      })
    },
    []
  )

  const removeAll = React.useMemo(
    () => () => {
      dispatch({
        type: Action.REMOVE_ALL,
      })
    },
    []
  )

  const close = React.useMemo(
    () => (id: string) => {
      hide(id)

      setTimeout(() => {
        remove(id)
      }, 150)
    },
    []
  )

  const closeAll = React.useMemo(
    () => () => {
      hideAll()

      setTimeout(() => {
        removeAll()
      }, 150)
    },
    []
  )

  const value = {
    alert: (payload: AlertPayload) => {
      const id = new Date().getTime().toString()

      create({
        id,
        visible: true,
        content: <Alert {...payload} closeDialog={() => close(id)} />,
      })
    },
    confirm: (payload: ConfirmPayload) => {
      const id = new Date().getTime().toString()

      create({
        id,
        visible: true,
        content: <Confirm {...payload} closeDialog={() => close(id)} />,
      })
    },
  }

  return (
    <>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>

      <Wrapper visible={dialogs.length > 0}>
        <Overlay
          visible={dialogs.filter(({ visible }) => visible).length > 0}
          onClick={closeAll}
        />

        {dialogs.map(dialog => (
          <Dialog key={dialog.id} visible={dialog.visible}>
            {dialog.content}
          </Dialog>
        ))}
      </Wrapper>
    </>
  )
}

export default DialogContainer
