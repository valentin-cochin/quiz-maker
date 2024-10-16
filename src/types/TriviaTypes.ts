// src/types/TriviaTypes.ts

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface CategoriesApiResponse {
  trivia_categories: TriviaCategory[];
}

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestionsApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}
