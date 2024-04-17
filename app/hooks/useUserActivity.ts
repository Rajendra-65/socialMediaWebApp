'use client'
import { useState, useEffect } from 'react';

const useUserActivity = () => {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const handleActivity = () => {
            setIsActive(true); // User activity detected, set isActive to true
        };

        const handleInactivity = () => {
            setIsActive(false); // User inactivity detected, set isActive to false
        };

        // Add event listeners for user activity
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        // Add event listener for user inactivity
        window.addEventListener('visibilitychange', handleInactivity);
        window.addEventListener('blur', handleInactivity);

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('visibilitychange', handleInactivity);
            window.removeEventListener('blur', handleInactivity);
        };
    }, []);

    return isActive;
};

export default useUserActivity;
