'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LoadingSpinner,
  Progress,
} from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAnalyzeNews } from '@/hooks/useAnalyzeNews'
import { AlertTriangleIcon, GlobeIcon, InfoIcon } from 'lucide-react'

export function NewsAnalyzer() {
  const { handleSubmit, result, error, setUrl, loading, url } = useAnalyzeNews()

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter news article URL"
            required
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Analyze'}
          </Button>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6 flex">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result?.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fact Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Credibility Score</span>
                  <span>{result.factCheck.score}%</span>
                </div>
                <Progress value={result.factCheck.score} className="w-full" />
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {result.factCheck.details.map((detail, _) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Source Credibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={result.sourceCredibility} className="w-full" />
                <span>{result.sourceCredibility}%</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
              <GlobeIcon className="h-4 w-4" />
              <AlertTitle>Country</AlertTitle>
              <AlertDescription>{result.country}</AlertDescription>
            </Alert>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Language</AlertTitle>
              <AlertDescription>{result.language}</AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Tips for Identifying Fake News
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Check the source's credibility and reputation</li>
          <li>Look for unusual URLs or site names</li>
          <li>Pay attention to quality and formatting</li>
          <li>Check the author's credentials and sources</li>
          <li>Be wary of sensational or clickbait headlines</li>
          <li>Cross-reference with other reputable news sources</li>
          <li>
            Consider the cultural and political context of the news source
          </li>
          <li>Be aware of potential biases in international reporting</li>
        </ul>
      </div>
    </div>
  )
}
