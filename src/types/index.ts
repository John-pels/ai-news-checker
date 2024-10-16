export interface FactCheck {
  score: number
  details: string[]
}
export interface AnalysisResult {
  summary: string
  factCheck: FactCheck
  sourceCredibility: number
  language: string
  country: string
}

export interface TypingEffectProps {
  text: string
  speed?: number
}
