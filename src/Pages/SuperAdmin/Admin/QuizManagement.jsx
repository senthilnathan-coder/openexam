import React from 'react'

const quizzes = [
  {
    id: 1,
    title: 'JavaScript Basics',
    category: 'Programming',
    attempts: 156,
    avgScore: 78.5,
    status: 'Active'
  },
  {
    id: 2,
    title: 'React Fundamentals',
    category: 'Web Development',
    attempts: 89,
    avgScore: 82.3,
    status: 'Draft'
  }
]

const QuizManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quiz Management</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Create New Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{quiz.title}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${quiz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {quiz.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{quiz.category}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Attempts</p>
                <p className="text-lg font-semibold">{quiz.attempts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Score</p>
                <p className="text-lg font-semibold">{quiz.avgScore}%</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">Preview</button>
              <button className="text-green-600 hover:text-green-800">Edit</button>
              <button className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizManagement