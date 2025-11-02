export default function StartScreen({ onStart }) {
	return (
		<div className="text-center space-y-8 max-w-lg">
			{/* Header */}
			<header className="w-full text-center mb-8">
				<div className="flex flex-col items-center justify-center space-y-3">
					<h1 className="text-3xl font-extrabold text-white tracking-tight">
						⚡ React Quiz Challenge
					</h1>

					<p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
						Test your knowledge of React fundamentals and see how far you can
						go!
					</p>

					<div className="h-1 w-24 bg-indigo-600 rounded-full mt-2"></div>
				</div>
			</header>

			{/* Rules Section */}
			<div className="bg-slate-800/50 border border-slate-700 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-4">
				<h2 className="text-2xl font-semibold text-indigo-400">
					📜 Quiz Rules
				</h2>
				<ul className="text-left space-y-2 text-slate-300 text-sm leading-relaxed">
					<li>
						• You’ll get{" "}
						<span className="text-indigo-400 font-medium">10 questions</span> in
						total.
					</li>
					<li>
						• Each correct answer gives you{" "}
						<span className="text-green-400 font-medium">+10 points</span>.
					</li>
					<li>• You can’t go back once you answer — choose wisely!</li>
					<li>
						• You have{" "}
						<span className="text-yellow-400 font-medium">10 seconds</span> for
						each question.
					</li>
					<li>
						• Click{" "}
						<span className="text-indigo-400 font-medium">Start Quiz</span> when
						you’re ready.
					</li>
				</ul>
			</div>

			{/* Start Button */}
			<div className="flex justify-end pt-4">
				<button
					onClick={onStart}
					className="px-6 py-3 mx-auto rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-md"
				>
					Start Quiz
				</button>
			</div>
		</div>
	);
}
