import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_URL;

interface AnalyticsData {
  totalUsers: number;
  totalProjects: number;
  totalTasks: number;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/analytics`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const chartData = {
    labels: ['Users', 'Projects', 'Tasks'],
    datasets: [
      {
        label: 'Count',
        data: data ? [data.totalUsers, data.totalProjects, data.totalTasks] : [0, 0, 0],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // blue
          'rgba(16, 185, 129, 0.7)', // green
          'rgba(239, 68, 68, 0.7)',  // red
        ],
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
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
                <div className="text-4xl font-bold text-blue-600">{data.totalUsers}</div>
                <div className="text-gray-700 mt-2">Total Users</div>
              </div>
              <div className="bg-green-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600">{data.totalProjects}</div>
                <div className="text-gray-700 mt-2">Total Projects</div>
              </div>
              <div className="bg-red-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-red-600">{data.totalTasks}</div>
                <div className="text-gray-700 mt-2">Total Tasks</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <Bar data={chartData} options={chartOptions} height={120} />
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