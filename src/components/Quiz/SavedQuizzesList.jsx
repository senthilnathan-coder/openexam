import React from 'react';

const SavedQuizzesList = ({ savedQuizzes }) => (
    <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Saved Quizzes</h3>
        <div className="space-y-4">
            {savedQuizzes.map((quiz) => (
                <div
                    key={quiz.id}
                    className="bg-white/5 rounded-xl p-4 flex justify-between items-center"
                >
                    <div>
                        <p className="text-white">Score: {quiz.score.toFixed(1)}%</p>
                        <p className="text-purple-200 text-sm">
                            {new Date(quiz.date).toLocaleDateString()}
                        </p>
                        {quiz.notes && (
                            <p className="text-purple-200 text-sm mt-2">{quiz.notes}</p>
                        )}
                    </div>
                    <button
                        onClick={() => { }}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"
                    >
                        Review
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default SavedQuizzesList;
