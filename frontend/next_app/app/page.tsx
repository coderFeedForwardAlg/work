'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Page() {
    const totalTimeSeconts = 5;
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(totalTimeSeconts); // 50 minutes in seconds
    const audioRef = useRef(null);
    const [userId] = useState(() => {
        // Generate a random user ID on component mount
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    });
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const [completedSessions, setCompletedSessions] = useState([]);
    const [showBreakMessage, setShowBreakMessage] = useState(false);

    // useEffect(() => {
    //     let timer: any;
    //     let startTime: any;

    //     if (isRunning && timeLeft > 0) {
    //         startTime = Date.now();
    //         timer = setInterval(() => {
    //             const currentTime = Date.now();
    //             const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

    //             if (elapsedSeconds >= 1) {
    //                 // Update the timer based on actual elapsed time
    //                 setTimeLeft((prevTime) => {
    //                     const newTime = prevTime - elapsedSeconds;
    //                     return newTime > 0 ? newTime : 0;
    //                 });
    //                 // Reset the start time for the next interval
    //                 startTime = currentTime;
    //             }
    //         }, 100); // Check more frequently to improve accuracy
    //     } else if (isRunning && timeLeft === 0) {
    //         // Timer completed
    //         const endTime = new Date();

    //         // Play the bell sound
    //         if (audioRef.current) {
    //             audioRef.current.play().catch((error) => {
    //                 console.error('Error playing audio:', error);
    //             });
    //         }

    //         // Send data to the server
    //         const sessionData = {
    //             id: Math.random().toString(36).substring(2, 10),
    //             user_id: userId,
    //             start_datetime: sessionStartTime.toISOString(),
    //             end_datetime: endTime.toISOString(),
    //         };

    //         fetch('http://localhost:8082/add_work_sessions', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(sessionData),
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 console.log('Success:', data);
    //                 setCompletedSessions((prev) => [...prev, sessionData]);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });

    //         setIsRunning(false);
    //         setShowBreakMessage(true);
    //         setTimeout(() => setShowBreakMessage(false), 10000); // Hide break message after 10 seconds
    //     }

    //     return () => clearInterval(timer);
    // }, [isRunning, timeLeft, userId, sessionStartTime]);

    const formatTime = () => {
        //} (seconds) => {
        // const mins = Math.floor(seconds / 60);
        // const secs = seconds % 60;
        // return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const startTimer = () => {
        // setSessionStartTime(new Date());
        setIsRunning(true);
    };
    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(totalTimeSeconts);
        setShowBreakMessage(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-3xl font-bold text-indigo-600">WorkTracker</h1>
                        <nav className="flex space-x-4">
                            <span className="text-indigo-600 font-medium">Timer</span>
                            <Link
                                href="/history"
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                History
                            </Link>
                        </nav>
                    </div>
                    <div className="text-sm text-gray-500">
                        User ID: {userId.substring(0, 8)}...
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-6">
                {showBreakMessage && (
                    <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md animate-pulse">
                        <h2 className="text-xl font-semibold">Time to take a break!</h2>
                        <p>Great job completing your work session. Take some time to rest.</p>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Focus Timer
                    </h2>

                    <div className="flex justify-center mb-8">
                        <div className="text-7xl font-mono font-semibold text-indigo-700 bg-[#00000000]">
                            {/*formatTime(timeLeft) */}
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 mb-8">
                        {!isRunning && timeLeft === totalTimeSeconts ? (
                            <button
                                onClick={startTimer}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Start Session
                            </button>
                        ) : (
                            <>
                                {isRunning ? (
                                    <button
                                        onClick={pauseTimer}
                                        className="px-6 py-3 bg-amber-500 text-white rounded-lg shadow hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                    >
                                        Pause
                                    </button>
                                ) : (
                                    <button
                                        onClick={startTimer}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Resume
                                    </button>
                                )}
                                <button
                                    onClick={resetTimer}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Reset
                                </button>
                            </>
                        )}
                    </div>

                    <div className="text-center text-gray-600">
                        <p>Focus for 50 minutes, then take a break.</p>
                        <p className="text-sm mt-2">
                            Your work sessions are automatically tracked.
                        </p>
                    </div>
                </div>

                {completedSessions.length > 0 && (
                    <div className="mt-12 w-full max-w-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Recent Sessions
                        </h3>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <ul className="divide-y divide-gray-200">
                                {completedSessions.map((session, index) => (
                                    <li key={index} className="p-4 hover:bg-gray-50">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-indigo-600">
                                                Session #{completedSessions.length - index}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {/* new Date(
                      session.start_datetime,
                      ).toLocaleTimeString()}{' ' */}
                                                -
                                                {/* new Date(
                      session.end_datetime,
                      ).toLocaleTimeString() */}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                    <p>WorkTracker - Stay productive and maintain a healthy work-rest balance.</p>
                </div>
            </footer>

            {/* Hidden audio element for the bell sound */}
            <audio ref={audioRef} src="/bell.wav" preload="auto" />
        </div>
    );
}
