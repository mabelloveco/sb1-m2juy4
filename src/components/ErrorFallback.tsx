import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-md w-full text-center">
        <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}