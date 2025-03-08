import { useState } from 'react';
import { questions } from './QuizQuestions';

interface IQuizQuestionState {
    currentQuestion: number;
    userAnswers: (number | null)[];
    score: number;
    isQuizOver: boolean;
}

const QuizGame = () => {
    const [quizState, setQuizState] = useState<IQuizQuestionState>({
        currentQuestion: 0,
        userAnswers: new Array(questions.length).fill(null), // Store answers per question
        score: 0,
        isQuizOver: false
    });

    const giveAnswer = (selectedAnswerIndex: number) => {
        const { currentQuestion, userAnswers } = quizState;

        // If the user has already answered this question, don't increase the score again
        const wasAlreadyAnswered = userAnswers[currentQuestion] !== null;
        const isAnswerCorrect = selectedAnswerIndex === questions[currentQuestion].answer;

        setQuizState((prev) => ({
            ...prev,
            userAnswers: prev.userAnswers.map((ans, index) =>
                index === currentQuestion ? selectedAnswerIndex : ans
            ),
            score: wasAlreadyAnswered
                ? prev.score
                : isAnswerCorrect
                ? prev.score + 1 
                : prev.score
        }));
    };

    const nextQuestion = () => {
        if (quizState.currentQuestion + 1 < questions.length) {
            setQuizState((prev) => ({
                ...prev,
                currentQuestion: prev.currentQuestion + 1
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
                currentQuestion: prev.currentQuestion - 1
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
                                disabled={quizState.userAnswers[quizState.currentQuestion] !== null} // Disable if answered
                                style={{
                                    background:
                                        quizState.userAnswers[quizState.currentQuestion] === i
                                            ? 'lightblue'
                                            : 'darkblue'
                                }}
                            >
                                {Eachanswer}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <button onClick={previousQuestion} disabled={quizState.currentQuestion === 0}>
                            Previous Question
                        </button>

                        <button onClick={nextQuestion} style={{ marginLeft: '10px' }}>
                            {quizState.currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        </button>
                    </div>
                </div>
            ) : (
                <p>Your Score: {quizState.score} / {questions.length}</p>
            )}
        </div>
    );
};

export default QuizGame;
