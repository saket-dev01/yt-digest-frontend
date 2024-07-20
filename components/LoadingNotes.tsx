// components/LoadingNotes.tsx
'use client'

import { useState, useEffect } from 'react'

export default function LoadingNotes({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading notes...</div> // You can replace this with a more sophisticated loading animation
  }

  return <>{children}</>
}