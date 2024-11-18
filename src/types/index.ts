export interface FactCheck {
  score: number;
  details:
    | string[]
    | {
        claim: string;
        credibility: string;
        explanation: string;
      }[];
}
export interface AnalysisResult {
  summary: string;
  factCheck: FactCheck;
  sourceCredibility: number;
  language: string;
  country: string;
}

export interface TypingEffectProps {
  text: string;
  speed?: number;
}
