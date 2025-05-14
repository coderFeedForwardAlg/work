'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WorkSession {
    id: string;
    user_id: string;
    start_datetime: string;
    end_datetime: string;
}

export default function HistoryPage() {
    const [workSessions, setWorkSessions] = useState<WorkSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mockData, setMockData] = useState(false);

    useEffect(() => {
        // Function to fetch work sessions
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Try to fetch from the API
                try {
                    const response: any = await fetch('http://localhost:8082/get_work_sessions')
                        .then((response) => response.text())
                        .then((text) => {
                            console.log('Raw API response:', text);
                            alert(`Raw API response: ${text}`);
                        })
                        .catch((err) => {
                            console.error('Debug fetch error:', err);
                            alert(`Debug fetch error: ${err.message}`);
                        });

                    const data = await response.json();
                    if (data && Array.isArray(data.payload)) {
                        setWorkSessions(data.payload);
                        setError(null);
                        return; // Exit if successful
                    } else {
                        console.warn('Unexpected data structure:', data);
                        throw new Error('Unexpected response format from API');
                    }

                    // If we get here, the fetch wasn't successful
                    throw new Error(`API request failed `);
                } catch (fetchError) {
                    console.error('Fetch error:', fetchError);

                    // If fetch fails and we're not already using mock data, switch to mock data
                    if (!mockData) {
                        console.log('Switching to mock data');
                        setMockData(true);
                        // Create some sample mock data
                        const mockSessions: WorkSession[] = [
                            {
                                id: 'mock1',
                                user_id: 'user123',
                                start_datetime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                                end_datetime: new Date().toISOString(),
                            },
                            {
                                id: 'mock2',
                                user_id: 'user123',
                                start_datetime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
                                end_datetime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                            },
                        ];

                        setWorkSessions(mockSessions);
                        setError('Using mock data. API connection failed.');
                    } else {
                        setError('Failed to load work sessions. API is unreachable.');
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [mockData]);

    // Calculate session duration in minutes
    const calculateDuration = (start: string, end: string): number => {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        return Math.round((endTime - startTime) / (1000 * 60));
    };

    // Format date for display
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Format time for display
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col"
            data-oid="2c:330f"
        >
            <header className="bg-white shadow-sm" data-oid="as7flz2">
                <div
                    className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center"
                    data-oid="_8p0hw5"
                >
                    <div className="flex items-center space-x-8" data-oid="es::upa">
                        <h1 className="text-3xl font-bold text-indigo-600" data-oid="tzohgqy">
                            WorkTracker
                        </h1>
                        <nav className="flex space-x-4" data-oid="jdy1emo">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                                data-oid="xxjxbja"
                            >
                                Timer
                            </Link>
                            <Link
                                href="/history"
                                className="text-indigo-600 font-medium"
                                data-oid="2rbv8ea"
                            >
                                History
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8" data-oid="ifc5yk9">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-oid="h7dmyv4">
                    <div className="flex justify-between items-center mb-6" data-oid="s5ul038">
                        <h2 className="text-2xl font-bold text-gray-800" data-oid="-71j.nb">
                            Work Session History
                        </h2>
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                setError(null);
                                setMockData(false); // Reset mock data flag to try real API again

                                // The useEffect will run again and try to fetch data
                            }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            data-oid="m8weipj"
                        >
                            Refresh Data
                        </button>
                    </div>

                    {mockData && (
                        <div
                            className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg"
                            data-oid="cuwax85"
                        >
                            <p className="font-medium" data-oid="2p6lwui">
                                ⚠️ Using sample data
                            </p>
                            <p className="text-sm mt-1" data-oid="0omzebh">
                                Could not connect to the API. Showing sample data for demonstration
                                purposes.
                            </p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="text-center py-8" data-oid="odzg9cx">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"
                                data-oid="2imrov1"
                            ></div>
                            <p className="mt-2 text-gray-600" data-oid="m55yrek">
                                Loading your work sessions...
                            </p>
                        </div>
                    ) : error && !mockData ? (
                        <div
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                            data-oid="j8ob.tw"
                        >
                            <h3 className="font-medium" data-oid="9ctlnke">
                                Error loading data
                            </h3>
                            <p className="mt-1" data-oid="35irw.8">
                                {error}
                            </p>
                            <div className="mt-3" data-oid="nqaym32">
                                <p className="text-sm" data-oid="3s5sw__">
                                    Try these troubleshooting steps:
                                </p>
                                <ul className="list-disc pl-5 text-sm mt-1" data-oid="d0:5e9f">
                                    <li data-oid="8-.mz-m">
                                        Check if the backend server is running at
                                        http://localhost:8082
                                    </li>
                                    <li data-oid="levat9-">
                                        Verify that the /get_work_sessions endpoint is working
                                        correctly
                                    </li>
                                    <li data-oid="5l-z930">
                                        Check browser console for more detailed error messages
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : workSessions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500" data-oid="zjb_tz_">
                            <p data-oid="5k4nhj6">
                                No work sessions found. Start a timer to track your work!
                            </p>
                            <Link
                                href="/"
                                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                data-oid="32q:vcj"
                            >
                                Go to Timer
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto" data-oid="3.1b9_q">
                            <table
                                className="min-w-full divide-y divide-gray-200"
                                data-oid="kqge-sc"
                            >
                                <thead className="bg-gray-50" data-oid="rfzwoko">
                                    <tr data-oid="st2o38d">
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            data-oid="2zdyfu:"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            data-oid=":k0-e_i"
                                        >
                                            Start Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            data-oid="cluj8_o"
                                        >
                                            End Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            data-oid="nldyr0."
                                        >
                                            Duration
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            data-oid="g_1m62t"
                                        >
                                            Session ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-gray-200"
                                    data-oid="c_q_5:i"
                                >
                                    {workSessions.map((session) => (
                                        <tr
                                            key={session.id}
                                            className="hover:bg-gray-50"
                                            data-oid=".h9bas8"
                                        >
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                data-oid="n6rrp.n"
                                            >
                                                {formatDate(session.start_datetime)}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                data-oid="6_xp3ap"
                                            >
                                                {formatTime(session.start_datetime)}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                data-oid="cc-5ago"
                                            >
                                                {formatTime(session.end_datetime)}
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                data-oid="kj:3m.u"
                                            >
                                                {calculateDuration(
                                                    session.start_datetime,
                                                    session.end_datetime,
                                                )}{' '}
                                                min
                                            </td>
                                            <td
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"
                                                data-oid="4.krqfz"
                                            >
                                                {session.id.substring(0, 8)}...
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-6" data-oid="tocyq68">
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm"
                    data-oid="e3l75d."
                >
                    <p data-oid="b31s6qe">
                        WorkTracker - Stay productive and maintain a healthy work-rest balance.
                    </p>
                </div>
            </footer>
        </div>
    );
}
