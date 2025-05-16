import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, change, icon, data }) => {
  const isPositiveChange = change >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <span className="text-purple-500 text-xl">{icon}</span>
        </div>
        <span className={`text-sm font-semibold ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
          {isPositiveChange ? '+' : ''}{change}%
        </span>
      </div>
      
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <h2 className="text-2xl font-bold text-white">{value.toLocaleString()}</h2>
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositiveChange ? '#10B981' : '#EF4444'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatCard;