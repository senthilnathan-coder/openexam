import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CustomPackageBuilder = ({ onClose }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [duration, setDuration] = useState(1);

  const topics = [
    { id: 1, name: 'Mathematics', price: 2.99 },
    { id: 2, name: 'Science', price: 2.99 },
    { id: 3, name: 'History', price: 1.99 },
    { id: 4, name: 'Geography', price: 1.99 },
    { id: 5, name: 'Computer Science', price: 3.99 }
  ];

  const calculateTotal = () => {
    const topicsTotal = selectedTopics.reduce((sum, topic) => sum + topic.price, 0);
    return (topicsTotal * duration).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Build Your Package</h3>
          <button onClick={onClose} className="text-purple-200 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-3">Select Topics</h4>
            <div className="grid grid-cols-2 gap-3">
              {topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopics(prev => 
                    prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
                  )}
                  className={`p-3 rounded-lg text-left ${
                    selectedTopics.includes(topic)
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-purple-200 hover:bg-white/20'
                  }`}
                >
                  <div className="font-medium">{topic.name}</div>
                  <div className="text-sm">${topic.price}/month</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Duration (months)</h4>
            <input
              type="range"
              min="1"
              max="12"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full"
            />
            <div className="text-purple-200 text-center">{duration} months</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between text-white mb-2">
              <span>Total</span>
              <span className="text-2xl font-bold">${calculateTotal()}</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:opacity-90 transition-all">
              Create Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPackageBuilder;