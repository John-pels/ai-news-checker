import type { TypingEffectProps } from '@/types'
import { useEffect, useState } from 'react'

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex])
      currentIndex++

      if (currentIndex === text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span className="typing-effect inline-block"> {displayedText} </span>
}
