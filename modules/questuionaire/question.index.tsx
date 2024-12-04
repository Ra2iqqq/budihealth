import React, { useState, useEffect } from 'react';

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

const QuizApp: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch('NEXT_PUBLIC_POCKETBASE_BASE_URL'); // PocketBase API
      const data = await res.json();
      setQuestions(data.map((record: any) => ({
        id: record.id,
        question: record.question,
        options: record.options,
        correctAnswer: record.correctAnswer,
      })));
    }
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId: string, selectedIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedIndex }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let calculatedScore = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
  };

  if (score !== null) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Quiz Results</h1>
        <p className="text-lg text-center mt-4">
          You scored <span className="font-bold">{score}</span> out of{' '}
          <span className="font-bold">{questions.length}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Quiz Application</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {questions.map((q, index) => (
          <div key={q.id} className="p-4 border rounded">
            <h2 className="text-lg font-bold mb-4">{index + 1}. {q.question}</h2>
            {q.options.map((option, i) => (
              <label key={i} className="block mb-2">
                <input
                  type="radio"
                  name={q.id}
                  value={i}
                  checked={answers[q.id] === i}
                  onChange={() => handleAnswerChange(q.id, i)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizApp;
