export default function DifficultySelect({ difficulty, setDifficulty }: {
  difficulty: string;
  setDifficulty: (value: string) => void;
}) {
  return (
    <select
      id="difficultySelect"
      className="border p-2 rounded"
      value={difficulty}
      onChange={e => setDifficulty(e.target.value)}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
}
