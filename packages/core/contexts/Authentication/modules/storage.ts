import storage from 'local-storage-fallback'

export const STORAGE_AUTH = '@IBSEL/AUTH'

type TokenOnStorageType = {
  accessToken: string | null
}

export const setTokensOnStorage = (payload: TokenOnStorageType) => {
  storage.setItem(STORAGE_AUTH, JSON.stringify(payload))
}

export const getTokensFromStorage = (): TokenOnStorageType => {
  const data = storage.getItem(STORAGE_AUTH)
  if (!data) {
    return {
      accessToken: null,
    }
  }

  return JSON.parse(data)
}

export const removeTokensFromStorage = () => {
  storage.removeItem(STORAGE_AUTH)
}
