import React, { useState } from 'react';
import { Check, X, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';

const EXISTING_USERNAMES = new Set([
  'car_enthusiast',
  'jdm_lover',
  'porsche_guy',
  'drift_king',
  'muscle_cars',
]);

export default function Register() {
  const { login } = useAuthStore();
  const { setLoginModalOpen } = useUIStore();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });

  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  let usernameTimeout: NodeJS.Timeout;
  const checkUsername = (username: string) => {
    if (username.length < 3) {
      setUsernameStatus('idle');
      setUsernameError('Username must be at least 3 characters');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameStatus('idle');
      setUsernameError('Username can only contain letters, numbers, dots, and underscores');
      return;
    }

    setUsernameStatus('checking');
    clearTimeout(usernameTimeout);

    usernameTimeout = setTimeout(() => {
      const isTaken = EXISTING_USERNAMES.has(username.toLowerCase());
      setUsernameStatus(isTaken ? 'taken' : 'available');
      setUsernameError(isTaken ? 'This username is already taken' : null);
    }, 500);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.toLowerCase();
    setFormData(prev => ({ ...prev, username }));
    checkUsername(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameStatus !== 'available' || isLoading) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome to Secret Auto Society!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUsernameIcon = () => {
    switch (usernameStatus) {
      case 'checking':
        return <Loader className="h-5 w-5 text-gray-400 animate-spin" />;
      case 'available':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'taken':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Secret Auto Society
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form fields remain the same */}
            <div>
              <button
                type="submit"
                disabled={usernameStatus !== 'available' || isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}