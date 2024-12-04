"use client"

import { useState, useEffect } from 'react'
import createClient from '@/utils/pocketbase/api'
import { quiz_questionsTypes } from '@/schema/quiz_questions'

const pb = createClient()

export default function QuizAnswerModule({ quizID }: { quizID: any }) {
    const [questions, setQuestions] = useState<quiz_questionsTypes[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({})
    const [showResults, setShowResults] = useState(false)

    const fetchQuestions = async () => {
        try {
            const records = await pb.collection('quiz_questions').getFullList<quiz_questionsTypes>({
                sort: '-created',
                filter: `quiz_id = "${quizID}"`
            });
            console.log(records)
            if (records) {
                setQuestions(records)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const handleAnswerSelect = (questionId: string, answerIndex: number) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }))
    }

    const handleSubmit = () => {
        setShowResults(true)
    }

    const calculateScore = () => {
        return questions.reduce((score, question) => {
            return score + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0)
        }, 0)
    }
    const getMentalHealthLevel = (combinedScore: number) => {
        if (combinedScore <= 9) return "Minimal Anxiety/Depression";
        if (combinedScore <= 19) return "Mild Anxiety/Depression";
        if (combinedScore <= 29) return "Moderate Anxiety/Depression";
        return "Severe Anxiety/Depression";
      };

    if (showResults) {
        const score = calculateScore()
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
                    <p className="text-xl text-center mb-6">
                        You scored {score} out of {questions.length}
                    </p>
                    <p className="text-xl text-center mb-6">
                        You are in the {getMentalHealthLevel(score)} level
                    </p>
                    <button
                        onClick={() => {
                            setShowResults(false)
                            setSelectedAnswers({})
                            setCurrentQuestion(0)
                        }}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Restart Question
                    </button>
                </div>
            </div>
        )
    }

    if (questions.length === 0) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">Loading questions...</div>
    }

    const question = questions[currentQuestion]

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1} of {questions.length}</h2>
                <p className="text-lg mb-6">{question.question}</p>
                <div className="space-y-4 mb-6">
                    {question.options.map((option: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(question.id, index)}
                            className={`w-full text-left p-3 rounded-md transition duration-300 ${selectedAnswers[question.id] === index
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestion === 0}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {currentQuestion < questions.length - 1 ? (
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                            disabled={selectedAnswers[question.id] === undefined}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(selectedAnswers).length !== questions.length}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
