import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = ({ window }: { window: any }) => {
      setIsMobile(window.width < 768) // Cambia el breakpoint si necesitás otro
    }

    // Set initial value
    const { width } = Dimensions.get('window')
    setIsMobile(width < 768)

    // Listen for dimension changes (rotaciones, etc.)
    const subscription = Dimensions.addEventListener('change', handleResize)

    // Clean up listener on unmount
    return () => {
      subscription.remove()
    }
  }, [])

  return isMobile
}
