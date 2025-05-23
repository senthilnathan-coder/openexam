import React from 'react';
import { FaBookmark, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const SaveQuizModal = ({
    saveNotes,
    setSaveNotes,
    setShowSaveModal,
    isSaving,
    handleSaveQuiz,
}) => {
    const { user } = useAuth(); // ✅ Moved inside component
    const userId = user?._id;
    const token = JSON.parse(localStorage.getItem('auth'))?.token;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Save Quiz</h3>
                <textarea
                    value={saveNotes}
                    onChange={(e) => setSaveNotes(e.target.value)}
                    placeholder="Add notes about this quiz..."
                    className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
                    rows="4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setShowSaveModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveQuiz}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
                    >
                        {isSaving ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <FaBookmark />
                                <span>Save Quiz</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveQuizModal;
