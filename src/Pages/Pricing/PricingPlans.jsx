import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaCrown } from 'react-icons/fa';

const PricingPlans = () => {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      // Dummy API data
      const dummyPlans = {
        free: {
          name: "Free Trial",
          price: 0,
          billing: "10 days",
          features: [
            { text: "Daily Quiz Topic 1", included: true },
            { text: "10 Questions Daily", included: true },
            { text: "Basic Analytics", included: false },
            { text: "Ads Included", included: true },
          ],
          buttonText: "Start Free Trial",
          popular: false
        },
        pro: {
          name: "Pro Plan",
          price: 9.99,
          billing: "per month",
          yearlyPrice: 99.99,
          features: [
            { text: "Unlimited Questions", included: true },
            { text: "All Quiz Topics", included: true },
            { text: "Advanced Analytics", included: true },
            { text: "Ad-Free Experience", included: true },
            { text: "Priority Support", included: true },
          ],
          buttonText: "Go Pro",
          popular: true
        },
        perAttempt: {
          name: "Pay Per Attempt",
          price: 0.99,
          billing: "per attempt",
          features: [
            { text: "Single Quiz Access", included: true },
            { text: "PDF Download", included: true },
            { text: "24hr Access", included: true },
            { text: "No Subscription", included: true },
          ],
          buttonText: "Buy Credits",
          popular: false
        }
      };

      await new Promise(resolve => setTimeout(resolve, 500));
      setPlans(dummyPlans);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin text-purple-500 text-4xl">⚡</div>
      </div>
    );
  }

  // Update the grid to accommodate three plans
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-purple-900 px-4 py-16 flex items-center mt-22">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Choose Your Plan</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-200">Flexible options for every learner</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`relative p-6 rounded-xl ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg transform scale-105'
                  : 'bg-white/10 backdrop-blur hover:bg-white/20 transition-all'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4">
                  <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs font-bold text-gray-900">
                    MOST POPULAR
                  </span>
                </div>
              )}
              {key === 'perAttempt' && (
                <div className="absolute -top-3 right-4">
                  <span className="px-3 py-1 bg-green-400 rounded-full text-xs font-bold text-gray-900">
                    NEW
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-purple-200 ml-2">/{plan.billing}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <FaCheck className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-purple-100">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  plan.popular
                    ? 'bg-white text-purple-600 hover:bg-purple-50'
                    : key === 'perAttempt'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-purple-600/80 text-white hover:bg-purple-600'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;