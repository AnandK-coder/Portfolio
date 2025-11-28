'use client'

import { useState, useEffect } from 'react'

interface TypingEffectProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  loop?: boolean
}

export default function TypingEffect({ 
  strings, 
  typeSpeed = 50, 
  backSpeed = 30,
  loop = true 
}: TypingEffectProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentString = strings[currentStringIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentString.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          if (loop || currentStringIndex < strings.length - 1) {
            setCurrentStringIndex((prev) => (prev + 1) % strings.length)
          }
        }
      }
    }, isDeleting ? backSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentStringIndex, strings, typeSpeed, backSpeed, loop])

  return (
    <span>
      {currentText}
      <span className="terminal-cursor">|</span>
    </span>
  )
}

