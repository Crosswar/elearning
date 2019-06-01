import storage from 'local-storage-fallback'

export const STORAGE_IS_SIDEBAR_OPENED = '@IBSEL/IS_SIDEBAR_OPENED'

export const setSidebarOpenedOnStorage = (payload: boolean) => {
  storage.setItem(STORAGE_IS_SIDEBAR_OPENED, JSON.stringify(payload))
}

export const getIsSidebarOpenedFromStorage = (): boolean => {
  const isSidebarOpened = storage.getItem(STORAGE_IS_SIDEBAR_OPENED)

  return isSidebarOpened ? JSON.parse(isSidebarOpened) : true
}
