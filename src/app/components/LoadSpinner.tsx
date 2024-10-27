import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface LoadSpinnerProps {
    state?: boolean;
}

const LoadSpinner: React.FC<LoadSpinnerProps> = ({ state = false }) => {
  return (
    <div 
      className={`${
        state ? 'bg-white/90 visible' : 'bg-transparent invisible'
      } fixed inset-0 flex flex-col items-center justify-center gap-5 duration-200`} 
      aria-busy={state}
      aria-label="Loading"
    >
      <LoaderCircle className="animate-spin" />
      <span>Cargando...</span>
    </div>
  );
};

export default LoadSpinner;
