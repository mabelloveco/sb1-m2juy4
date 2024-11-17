import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader className="h-8 w-8 text-red-600 animate-spin" />
    </div>
  );
}