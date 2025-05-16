import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    plan: 'free',
    questionsRemaining: 10,
    mockTestsRemaining: 1,
    features: {
      bookmarks: false,
      analytics: false,
      ads: true
    },
    lastReset: new Date().toISOString()
  });

  const checkQuota = () => subscription.plan === 'pro' || subscription.questionsRemaining > 0;

  const updateQuota = () => {
    if (subscription.plan === 'free') {
      setSubscription(prev => ({
        ...prev,
        questionsRemaining: Math.max(0, prev.questionsRemaining - 1)
      }));
    }
  };

  useEffect(() => {
    const checkAndResetQuota = () => {
      const lastReset = new Date(subscription.lastReset);
      const now = new Date();
      
      if (now.getDate() !== lastReset.getDate()) {
        setSubscription(prev => ({
          ...prev,
          questionsRemaining: 10,
          mockTestsRemaining: 1,
          lastReset: now.toISOString()
        }));
      }
    };

    checkAndResetQuota();
    const interval = setInterval(checkAndResetQuota, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [subscription.lastReset]);

  return (
    <SubscriptionContext.Provider value={{ subscription, setSubscription, checkQuota, updateQuota }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);