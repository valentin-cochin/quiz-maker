// src/pages/quiz/Quiz.tsx
import { useState } from "react";
import CategorySelect from "../../components/quiz/CategorySelect";
import DifficultySelect from "../../components/quiz/DifficultySelect";
import CreateQuizButton from "../../components/quiz/CreateQuizButton";
import QuizQuestions from "../../components/quiz/QuizQuestions";
import QuizResults from "../../components/quiz/QuizResults";
import { TriviaQuestion } from "../../types/TriviaTypes.ts";

export default function Quiz() {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  const handleCreateQuiz = () => {
    setQuizStarted(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCategory("");
    setDifficulty("easy");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {!quizStarted ? (
        <>
          <CategorySelect category={category} setCategory={setCategory} />
          <DifficultySelect difficulty={difficulty} setDifficulty={setDifficulty} />
          <CreateQuizButton onClick={handleCreateQuiz} disabled={!category} />
        </>
      ) : quizSubmitted ? (
        <QuizResults questions={questions} selectedAnswers={selectedAnswers} onRestart={handleRestartQuiz} />
      ) : (
        <QuizQuestions
          category={category}
          difficulty={difficulty}
          setQuestions={setQuestions}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          onSubmit={handleQuizSubmit}
        />
      )}
    </div>
  );
}
