'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'working' | 'error'>('unknown');
  const [dbStatus, setDbStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  // Test API connectivity on page load
  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch('/api/test');
        if (response.ok) {
          console.log('API test endpoint is working');
          setApiStatus('working');
          
          // Check database status
          const data = await response.json();
          console.log('API test response:', data);
          
          if (data.database && data.database.status === 'connected') {
            setDbStatus('connected');
          } else {
            setDbStatus('error');
          }
        } else {
          console.error('API test endpoint returned error:', response.status);
          setApiStatus('error');
        }
      } catch (err) {
        console.error('Error testing API connectivity:', err);
        setApiStatus('error');
      }
    };
    
    testApi();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    console.log('Form submitted with:', formData);

    // Check API status before attempting login
    if (apiStatus === 'error') {
      setError('API connectivity issue. Please try again later.');
      setLoading(false);
      return;
    }

    // Check DB status before attempting login
    if (dbStatus === 'error') {
      setError('Database connectivity issue. Please check your database configuration.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending request to /api/auth/login');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Login failed');
      }

      console.log('Login successful, storing data and redirecting');
      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard or home page
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // For testing purposes, prefill with test user
  const fillTestUser = () => {
    setFormData({
      email: 'test@example.com',
      password: 'password123'
    });
  };

  // Run database setup
  const setupDatabase = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/setup');
      const data = await response.json();
      
      if (response.ok) {
        alert('Database setup successful! Test user created.');
        // Refresh API status
        window.location.reload();
      } else {
        alert(`Database setup failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert(`Error setting up database: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {(apiStatus === 'error' || dbStatus === 'error') && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {apiStatus === 'error' ? 'API connectivity issue detected.' : ''}
              {dbStatus === 'error' ? ' Database connectivity issue detected.' : ''}
              <div className="mt-2">
                <button 
                  onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                  className="text-red-700 underline font-medium"
                >
                  {showTroubleshooting ? 'Hide troubleshooting' : 'Show troubleshooting help'}
                </button>
              </div>
            </div>
          )}
          
          {showTroubleshooting && (
            <div className="mt-4 bg-gray-100 border border-gray-300 p-4 rounded text-sm">
              <h3 className="font-bold mb-2">Troubleshooting Steps:</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Check that your database is running</li>
                <li>Verify your environment variables in .env file</li>
                <li>
                  <button 
                    onClick={setupDatabase}
                    className="text-blue-600 underline"
                    disabled={loading}
                  >
                    Run database setup
                  </button>
                </li>
                <li>
                  <button 
                    onClick={fillTestUser}
                    className="text-blue-600 underline"
                  >
                    Fill test user credentials
                  </button>
                </li>
              </ol>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || apiStatus === 'error' || dbStatus === 'error'}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
} 