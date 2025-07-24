import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiGrid, FiList, FiBarChart2 } from 'react-icons/fi';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [projectsRes, tasksRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/projects`, { headers }),
        axios.get(`${API_BASE_URL}/api/tasks`, { headers })
      ]);

      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <nav className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FiGrid className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-300" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Flowject</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-200">Welcome, {user?.username}!</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100/60 dark:bg-blue-900/60 rounded-lg">
                <FiGrid className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100/60 dark:bg-green-900/60 rounded-lg">
                <FiList className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{tasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100/60 dark:bg-purple-900/60 rounded-lg">
                <FiBarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {projects.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700 transition-colors duration-300">
            <div className="p-6 border-b border-white/30 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center"><FiGrid className="mr-2" />Recent Projects</h3>
                <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"><FiGrid className="mr-1" />View all</Link>
              </div>
            </div>
            <div className="p-6">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between py-3 border-b border-white/30 dark:border-gray-700 last:border-b-0 transition-colors duration-300">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>{project.status}</span>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No projects yet</p>
              )}
            </div>
          </div>

          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700 transition-colors duration-300">
            <div className="p-6 border-b border-white/30 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center"><FiList className="mr-2" />Recent Tasks</h3>
                <Link to="/tasks" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"><FiList className="mr-1" />View all</Link>
              </div>
            </div>
            <div className="p-6">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between py-3 border-b border-white/30 dark:border-gray-700 last:border-b-0 transition-colors duration-300">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>{task.status}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition duration-200 font-medium shadow-md flex items-center"
          >
            <FiGrid className="mr-2" />Manage Projects
          </Link>
          <Link
            to="/tasks"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-3 rounded-lg transition duration-200 font-medium shadow-md flex items-center"
          >
            <FiList className="mr-2" />Manage Tasks
          </Link>
          <Link
            to="/analytics"
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-6 py-3 rounded-lg transition duration-200 font-medium shadow-md flex items-center"
          >
            <FiBarChart2 className="mr-2" />View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 