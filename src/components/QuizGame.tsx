import React, { useState } from 'react';
import { questions } from './QuizQuestions';

interface IQuizQuestionState {
    isAnswered: boolean;
    currentQuestion: number;
    isCorrect: boolean | null;
    selectedAnswer: number | null;
    score: number;
    isQuizOver: boolean;
}

const QuizGame = () => {
    const [quizState, setQuizState] = useState<IQuizQuestionState>({
        isAnswered: false,
        currentQuestion: 0,
        isCorrect: null,
        selectedAnswer: null,
        score: 0,
        isQuizOver: false
    });

    const giveAnswer = (selectedAnswerIndex: number) => {
        if (quizState.isAnswered) return;

        const isAnswerCorrect = selectedAnswerIndex === questions[quizState.currentQuestion].answer;

        setQuizState((prev) => ({
            ...prev,
            isAnswered: true,
            isCorrect: isAnswerCorrect,
            selectedAnswer: selectedAnswerIndex,
            score: isAnswerCorrect ? prev.score + 1 : prev.score
        }));
    };

    const nextQuestion = () => {
        if (quizState.currentQuestion + 1 < questions.length) {
            setQuizState((prev) => ({
                ...prev,
                currentQuestion: prev.currentQuestion + 1,
                isAnswered: false,
                isCorrect: null,
                selectedAnswer: null
            }));
        } else {
            setQuizState((prev) => ({
                ...prev,
                isQuizOver: true
            }));
        }
    };
    const previousQuestion = () => {
        if (quizState.currentQuestion > 0) {
            setQuizState((prev) => ({
                ...prev,
                currentQuestion: prev.currentQuestion - 1,
                isAnswered: false,
                isCorrect: null,
                selectedAnswer: null
            }));
        }
    };

    return (
        <div>
            <h3>Oga Answer Question</h3>
            {!quizState.isQuizOver ? (
                <div>
                    <h2>{questions[quizState.currentQuestion].question}</h2>
                    <div>
                        {questions[quizState.currentQuestion].answers.map((Eachanswer, i) => (
                            <button
                                key={i}
                                onClick={() => giveAnswer(i)}
                                disabled={quizState.isAnswered}
                            >
                                {Eachanswer}
                            </button>
                        ))}
                    </div>
                    <button onClick={previousQuestion} disabled={quizState.currentQuestion === 0}>
                            Previous Question
                        </button>
                    {quizState.isAnswered && (
                        <button onClick={nextQuestion}>Next Question</button>
                    )}
                </div>
            ) : (
                <p>Your Score: {quizState.score} / {questions.length}</p>
            )}
        </div>
    );
};

export default QuizGame;
