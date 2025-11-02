export default function QuestionCard({ question, selectedOption, onSelect }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white">{question.question}</h3>

      <div className="grid gap-3">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;

          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`w-full text-left px-5 py-3 rounded-lg border 
                transition-all duration-200
                ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-indigo-400"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
