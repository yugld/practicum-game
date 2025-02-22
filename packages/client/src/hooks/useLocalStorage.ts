import { useEffect, useState } from 'react'

function getStorageValue(key: string, defaultValue: unknown) {
  // getting stored value
  let saved = localStorage.getItem(key)

  if (!saved) {
    localStorage.setItem(key, JSON.stringify(defaultValue))
    saved = localStorage.getItem(key)
  }

  const initial = JSON.parse(saved || '')
  return initial || defaultValue
}

export const useLocalStorage = (key: string, defaultValue: unknown) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
