import { useReducer } from "react";
import StartScreen from "./startscreen";
import { questions } from "./questions.json";
import Results from "./result";
import Quiz from "./quiz";

import "./App.css";

export default function App() {
	const quizQuestions = [...questions];

	function getRandomQuestions(allQuestions, count = 10) {
		const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, count);
	}

	function reducer(state, action) {
		switch (action.type) {
			case "START_QUIZ":
				return {
					...state,
					status: "active",
					index: 0,
					score: 0,
					correctCount: 0,
					selectedOption: null,
					questions: getRandomQuestions(quizQuestions, 10),
					timeLeft: 10,
				};

			case "SELECT_ANS": {
				// const isCorrect =
				// action.payload === state.questions[state.index].correctOption;
				// const updatedScore = isCorrect ? state.score + 10 : state.score;
				return {
					...state,
					selectedOption: action.payload,
					// score: updatedScore,
				};
			}
			case "NEXT_QUESTION": {
				const isCorrect =
					state.selectedOption === state.questions[state.index].correctOption;
				const updatedScore = isCorrect ? state.score + 10 : state.score;
				const updatedCorrectCount = isCorrect
					? state.correctCount + 1
					: state.correctCount;
				const isLastQuestion = state.index === state.questions.length - 1;

				return {
					...state,
					score: updatedScore,
					correctCount: updatedCorrectCount,
					index: isLastQuestion ? state.index : state.index + 1,
					status: isLastQuestion ? "finished" : state.status,
					selectedOption: null,
					timeLeft: 10,
				};
			}
			case "RESTART_QUIZ":
				return {
					...initialState,
					questions: getRandomQuestions(quizQuestions, 10),
				};
			case "TIMER_TICK":
				return {
					...state,
					timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
				};

			case "TIMEOUT_SKIP": {
				const isLast = state.index === state.questions.length - 1;
				const isCorrect =
					state.selectedOption === state.questions[state.index].correctOption;
				const updatedScore = isCorrect ? state.score + 10 : state.score;
				const updatedCorrectCount = isCorrect
					? state.correctCount + 1
					: state.correctCount;

				return {
					...state,
					index: isLast ? state.index : state.index + 1,
					status: isLast ? "finished" : state.status,
					selectedOption: null,
					timeLeft: 10,
					score: updatedScore,
					correctCount: updatedCorrectCount,
				};
			}
			default:
				return state;
		}
	}

	const initialState = {
		status: "start",
		index: 0,
		score: 0,
		correctCount: 0,
		selectedOption: null,
		questions: getRandomQuestions(quizQuestions, 10),
		timeLeft: 10,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
			<div className="w-full max-w-md bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
				{/* Start Screen */}
				{state.status === "start" && (
					<StartScreen onStart={() => dispatch({ type: "START_QUIZ" })} />
				)}

				{/* QUIZ SCREEN */}
				{state.status === "active" && (
					<Quiz state={state} dispatch={dispatch} />
				)}

				{/* RESULT SCREEN */}
				{state.status == "finished" && (
					<Results
						quiz={state}
						onRestart={() => dispatch({ type: "RESTART_QUIZ" })}
					/>
				)}
			</div>
		</div>
	);
}
