import React, { useEffect, useCallback } from 'react'

export const useGlobalMouseDown = (callback: any) => {
  return useWindowEvent(`mousedown`, callback)
}
export const useWindowEvent = (event: string, callback: any) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}
