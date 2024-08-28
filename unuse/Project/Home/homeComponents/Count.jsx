import { useState, useEffect } from 'react';

const useCountdown = (sec, delay) => {
    const [count, setCount] = useState(sec);

    useEffect(() => {
        let timerId;
        if (delay > 0) {
            timerId = setTimeout(() => {
                startCountdown();
            }, delay * 1000);
        } else {
            startCountdown();
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [sec, delay]);

    const startCountdown = () => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount === 1) {
                    clearInterval(interval);
                    return sec;
                } else {
                    return prevCount - 1;
                }
            });
        }, 1000);
    };

    return count;
};

export default useCountdown;
