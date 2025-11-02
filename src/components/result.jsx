export default function Results({ quiz, onRestart }) {
	const { score, correctCount, questions } = quiz;

	return (
		<div className="text-center bg-slate-800/40 border border-slate-700 backdrop-blur-md p-10 rounded-2xl shadow-xl space-y-6 max-w-lg mx-auto">
			<h2 className="text-3xl font-bold text-indigo-400">🎉 Quiz Completed!</h2>

			<p className="text-lg text-slate-300">
				You got {correctCount} out of {questions.length} correct.
			</p>

			<p className="text-lg text-slate-300">
				You scored <span className="text-white font-semibold">{score}</span> /{" "}
				{questions.length * 10}
			</p>

			<div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
				<div
					className="h-3 bg-gradient-to-r from-green-400 to-indigo-500 transition-all duration-500"
					style={{
						width: `${Math.max((score / questions.length) * 100, 5)}%`,
					}}
				/>
			</div>

			<p className="text-sm text-slate-400 italic">
				{score === questions.length * 10
					? "Perfect score! You’re a legend! 🏆"
					: score >= (questions.length * 10) / 2
					? "Nice job! You did really well! 💪"
					: "Don’t worry — practice makes perfect! 🚀"}
			</p>

			<div className="flex justify-end pt-4">
				<button
					onClick={onRestart}
					className="px-6 py-3 mx-auto rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-md"
				>
					Restart Quiz
				</button>
			</div>
		</div>
	);
}
