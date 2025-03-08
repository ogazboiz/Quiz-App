interface IQuizQuestion{
    question: string
    answers: string[]
    answer: number
} 

export interface IQuizQuestionState {
    isAnswered: boolean
    currentQuestion: number
    isCorrect: boolean  | null
    selectedAnswer: number | null
    score: number
    isQuizOver: boolean
}
export const questions: IQuizQuestion[] = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1,
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answer: 1,
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        answer: 0,
    },

]