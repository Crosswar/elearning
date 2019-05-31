import * as React from 'react'

import { getMediaState } from './modules/media'
import { setSidebarOpenedOnStorage } from './modules/storage'
import TemplateContext, { initialValue } from './TemplateContext'

type Props = {
  children: React.ReactNode
}

let resizeTimeout: number | undefined

const TemplateContainer = (props: Props) => {
  const { children } = props

  const [media, setMedia] = React.useState(initialValue.media)

  const [isSidebarOpened, setSidebarOpened] = React.useState(
    initialValue.isSidebarOpened
  )

  const [isMobileSidebarVisible, setMobileSidebarVisible] = React.useState(
    initialValue.isMobileSidebarVisible
  )

  const handleResize = () => {
    window.clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => {
      setMedia(getMediaState())
    }, 250)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const value = {
    media,
    isSidebarOpened,
    isMobileSidebarVisible,
    setSidebarOpened: (payload: boolean) => {
      setSidebarOpenedOnStorage(payload)

      setSidebarOpened(payload)
    },
    setMobileSidebarVisible: (payload: boolean) => {
      setMobileSidebarVisible(payload)
    },
  }

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  )
}

export default TemplateContainer
