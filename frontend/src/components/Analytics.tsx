import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

Chart.register(ArcElement, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_URL;

interface UserAnalytics {
  total: number;
  completed: number;
  remaining: number;
  priorities: {
    high: number;
    medium: number;
    low: number;
  };
}

const Analytics: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState<UserAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user-analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [token]);

  const doughnutData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tasks by Priority',
        data: data ? [data.priorities.high, data.priorities.medium, data.priorities.low] : [0, 0, 0],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',   // red
          'rgba(251, 191, 36, 0.7)',  // yellow
          'rgba(16, 185, 129, 0.7)',  // green
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Your Task Analytics</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Dashboard</Link>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600">{data.total}</div>
                <div className="text-gray-700 mt-2">Total Tasks</div>
              </div>
              <div className="bg-green-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600">{data.completed}</div>
                <div className="text-gray-700 mt-2">Completed</div>
              </div>
              <div className="bg-yellow-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-yellow-600">{data.remaining}</div>
                <div className="text-gray-700 mt-2">Remaining</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks by Priority</h3>
              <div className="w-64 h-64">
                <Doughnut data={doughnutData} />
              </div>
              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                  <span className="text-gray-700">High: {data.priorities.high}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full bg-yellow-400"></span>
                  <span className="text-gray-700">Medium: {data.priorities.medium}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
                  <span className="text-gray-700">Low: {data.priorities.low}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-red-600">Failed to load analytics data.</div>
        )}
      </div>
    </div>
  );
};

export default Analytics; 