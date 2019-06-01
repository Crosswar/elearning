import * as React from 'react'

import { getMediaState } from './modules/media'
import { getIsSidebarOpenedFromStorage } from './modules/storage'

export type TemplateValueType = {
  media: ReturnType<typeof getMediaState>
  isSidebarOpened: boolean
  isMobileSidebarVisible: boolean
  setSidebarOpened: (payload: boolean) => void
  setMobileSidebarVisible: (payload: boolean) => void
}

const media = getMediaState()
const isSidebarOpened = getIsSidebarOpenedFromStorage()

export const initialValue: TemplateValueType = {
  media,
  isSidebarOpened,
  isMobileSidebarVisible: false,
  setSidebarOpened: (payload: boolean) => {},
  setMobileSidebarVisible: (payload: boolean) => {},
}

const TemplateContext = React.createContext<TemplateValueType>(initialValue)

export default TemplateContext
