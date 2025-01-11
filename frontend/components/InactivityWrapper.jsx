import React, { useState, useEffect } from 'react';

const InactivityWrapper = ({ 
  children,
  timeoutSeconds = 5, 
  onInactive,
  className = ""
}) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    const timeoutDuration = timeoutSeconds * 1000;
    const activities = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'focus'
    ];

    const updateLastActivity = () => {
      setLastActivity(Date.now());
      setIsInactive(false);
    };

    activities.forEach(activity => {
      document.addEventListener(activity, updateLastActivity);
    });

    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      
      if (timeSinceLastActivity >= timeoutDuration && !isInactive) {
        setIsInactive(true);
        if (onInactive) onInactive();
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setLastActivity(Date.now() - (timeoutDuration / 2));
      } else {
        updateLastActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      activities.forEach(activity => {
        document.removeEventListener(activity, updateLastActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(checkInactivity);
    };
  }, [timeoutSeconds, lastActivity, isInactive, onInactive]);

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default InactivityWrapper;