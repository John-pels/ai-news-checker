import { GoogleGenerativeAI } from '@google/generative-ai'
import { getFromCache, setInCache } from './cache'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

export async function analyzeArticle(url: string) {
  const cachedResult = getFromCache(url)
  if (cachedResult) {
    return cachedResult
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `
    Analyze the news article at this URL: ${url}
    
    Provide the following:
    1. A concise summary of the article (max 3 sentences)
    2. Fact-check the main claims in the article, providing a credibility score (0-100) and brief explanations
    3. Assess the credibility of the source (0-100)
    4. Identify the language of the article
    5. Determine the country of origin or primary focus of the news article
    
    Consider the global context and use reliable international sources for fact-checking when applicable.
    
    Format the response as a JSON object with the following structure:
    {
      "summary": "string",
      "factCheck": {
        "score": number,
        "details": ["string"]
      },
      "sourceCredibility": number,
      "language": "string",
      "country": "string"
    }

    Important: Provide only the JSON object in your response, without any additional text, formatting, or explanation.
  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  let text = response.text()

  try {
    // Attempt to clean the response
    text = text.replace(/```json\s*|\s*```/g, '') // Remove any markdown code blocks
    text = text.replace(/^\s*\{/, '{').replace(/\}\s*$/, '}') // Ensure the text starts with { and ends with }

    const parsedResult = JSON.parse(text)

    // Validate the structure of the parsed result
    if (
      !parsedResult.summary ||
      !parsedResult.factCheck ||
      !parsedResult.sourceCredibility ||
      !parsedResult.language ||
      !parsedResult.country
    ) {
      throw new Error('Invalid response structure')
    }
    setInCache(url, parsedResult)
    return parsedResult
  } catch (error) {
    console.error('Error parsing Gemini response:', error)
    throw new Error('Failed to parse the analysis result. Please try again.')
  }
}
