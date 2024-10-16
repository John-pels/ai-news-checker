import type { AnalysisResult } from '@/types'
import * as React from 'react'

export const useAnalyzeNews = () => {
  const [url, setUrl] = React.useState('')
  const [result, setResult] = React.useState<AnalysisResult | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze the article')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`)
      } else {
        setError(
          'An unexpected error occurred while analyzing the article. Please try again.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return { setUrl, error, loading, handleSubmit, result, url } as const
}
