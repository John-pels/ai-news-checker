import { analyzeArticle } from '@/utils/gemini-utils'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const result = await analyzeArticle(url)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error analyzing article:', error)
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
