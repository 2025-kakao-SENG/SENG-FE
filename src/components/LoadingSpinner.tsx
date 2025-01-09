import React from 'react';
import { CircleLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  loading: boolean;
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  size = 50,
  color = '#DBAC4A',
}) => {
  return (
    <div className={`${loading ? 'visible' : 'hidden'}`}>
      <CircleLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default LoadingSpinner;
