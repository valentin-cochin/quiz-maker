export default function CreateQuizButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      id="createBtn"
      className={`mt-4 px-4 py-2 rounded ${
        disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Create Quiz
    </button>
  );
}
