// src/components/quiz/QuizQuestions.tsx
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { QuizQuestionsApiResponse, TriviaQuestion } from "../../types/TriviaTypes.ts";
import { decodeHtmlEntities } from "../../utils/decodeHtmlEntities.ts";

const fetchQuizQuestions = async (category: string, difficulty: string) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch quiz questions");
  }
  const data: QuizQuestionsApiResponse = await response.json();
  return data.results;
};

export default function QuizQuestions({
  category,
  difficulty,
  setQuestions,
  selectedAnswers,
  setSelectedAnswers,
  onSubmit,
}: {
  category: string;
  difficulty: string;
  setQuestions: (questions: TriviaQuestion[]) => void;
  selectedAnswers: Record<number, string>;
  setSelectedAnswers: (answers: (prev: Record<number, string>) => Record<number, string>) => void;
  onSubmit: () => void;
}) {
  const {
    data: questions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quiz", category, difficulty],
    queryFn: () => fetchQuizQuestions(category, difficulty),
    enabled: !!category && !!difficulty,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const [shuffledAnswers, setShuffledAnswers] = useState<string[][]>([]);

  useEffect(() => {
    if (questions) {
      setQuestions(questions);
      const shuffled = questions.map((question: TriviaQuestion) =>
        [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
      );
      setShuffledAnswers(shuffled);
    }
  }, [questions, setQuestions]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev: Record<number, string>) => {
      const newAnswers = { ...prev, [questionIndex]: answer } as Record<number, string>;
      return newAnswers;
    });
  };

  if (isLoading) return <p>Loading quiz...</p>;
  if (isError) return <p>Error loading quiz.</p>;

  return (
    <div className="space-y-6">
      {questions?.map((question, index) => (
        <div key={index} className="p-4 border rounded">
          <h2 className="mb-2 font-semibold">{decodeHtmlEntities(question.question)}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {shuffledAnswers[index]?.map(answer => {
              const isUserAnswer = answer === selectedAnswers[index];

              return (
                <span
                  key={answer}
                  onClick={() => handleAnswerSelect(index, answer)}
                  className={`px-4 py-2 rounded border cursor-pointer ${
                    isUserAnswer ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {decodeHtmlEntities(answer)}
                </span>
              );
            })}
          </div>
        </div>
      ))}
      {questions && Object.keys(selectedAnswers).length === questions.length && (
        <button onClick={onSubmit} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Submit Quiz
        </button>
      )}
    </div>
  );
}
