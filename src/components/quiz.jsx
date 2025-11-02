import { useEffect } from "react";
import QuestionCard from "./question-card";

export default function Quiz({ state, dispatch }) {
	const currentIndex = state.index;
	const currQuestion = state.questions[currentIndex];
	const selectedOption = state.selectedOption;

	useEffect(() => {
		if (state.timeLeft > 0 && state.status === "active") {
			const timerId = setInterval(() => {
				dispatch({ type: "TIMER_TICK" });
			}, 1000);
			return () => clearInterval(timerId);
		}
		if (state.timeLeft === 0 && state.status === "active") {
			dispatch({ type: "TIMEOUT_SKIP" });
		}
	}, [state.timeLeft, state.status, state.index, dispatch]);
	function handleSelect(option) {
		dispatch({ type: "SELECT_ANS", payload: option });
	}

	return (
		<div className="w-full max-w-2xl mx-auto space-y-8 bg-slate-800/40 border border-slate-700 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
			{/* Header: Progress & Timer */}
			<div className="flex items-center justify-between mb-6">
				{/* Progress Section */}
				<div>
					<h2 className="text-xl font-semibold text-indigo-400">
						Question {currentIndex + 1} / {state.questions.length}
					</h2>
					<div className="w-40 bg-slate-700 rounded-full h-2 overflow-hidden mt-2">
						<div
							className="h-2 bg-indigo-500 transition-all duration-300"
							style={{
								width: `${
									((currentIndex + 1) / state.questions.length) * 100
								}%`,
							}}
						/>
					</div>
				</div>
				{/* Timer Section */}
				<div className="flex flex-col items-end">
					<span className="text-base font-medium text-slate-300">
						Time Left
					</span>
					<span className="text-2xl font-semibold text-indigo-400">
						{state.timeLeft}s
					</span>
				</div>
			</div>

			{/* Question card */}
			<QuestionCard
				question={currQuestion}
				selectedOption={selectedOption}
				onSelect={handleSelect}
			/>

			{/* Next Button */}
			<div className="flex justify-end pt-4">
				<button
					onClick={() => dispatch({ type: "NEXT_QUESTION" })}
					disabled={selectedOption === null || selectedOption === undefined}
					className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-md ${
						selectedOption !== null && selectedOption !== undefined
							? "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
							: "bg-slate-700 cursor-not-allowed"
					}`}
				>
					{currentIndex === state.questions.length - 1
						? "Finish Quiz"
						: "Next →"}
				</button>
			</div>
		</div>
	);
}
