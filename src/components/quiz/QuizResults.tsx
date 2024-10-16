import { TriviaQuestion } from "../../types/TriviaTypes";
import { decodeHtmlEntities } from "../../utils/decodeHtmlEntities.ts";

export default function QuizResults({ questions, selectedAnswers, onRestart }: {
  questions: TriviaQuestion[];
  selectedAnswers: Record<number, string>;
  onRestart: () => void;
}) {
  const correctAnswersCount = questions.reduce((acc, question, index) => {
    const isCorrect = selectedAnswers[index] === question.correct_answer;
    return isCorrect ? acc + 1 : acc;
  }, 0);

  const getScoreColor = () => {
    if (correctAnswersCount <= 1) return "text-red-500";
    if (correctAnswersCount <= 3) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quiz Results</h2>
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={index} className="p-4 border rounded">
            <h3 className="font-semibold">{decodeHtmlEntities(question.question)}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {[...question.incorrect_answers, question.correct_answer].sort().map(answer => {
                const isCorrect = answer === question.correct_answer;
                const isUserAnswer = answer === selectedAnswers[index];
                const isWrong = isUserAnswer && !isCorrect;

                return (
                  <span
                    key={answer}
                    className={`px-4 py-2 rounded border ${
                      isCorrect ? "bg-green-500 text-white" : isWrong ? "bg-red-500 text-white" : "bg-white text-black"
                    }`}
                  >
                    {decodeHtmlEntities(answer)}
                  </span>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
      <p className={`text-xl font-bold ${getScoreColor()}`}>
        Your Score: {correctAnswersCount} / {questions.length}
      </p>
      <button onClick={onRestart} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Restart Quiz
      </button>
    </div>
  );
}
