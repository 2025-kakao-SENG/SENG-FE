import React from 'react';
import { CircleLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  loading: boolean; // 로딩 상태를 제어
  size?: number; // 스피너 크기 (기본값: 50)
  color?: string; // 스피너 색상 (기본값: "#DBAC4A")
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  size = 50,
  color = '#DBAC4A',
}) => {
  return (
    <div
      className={`${
        loading ? 'visible' : 'hidden'
      }`}
      style={{ }}
    >
      <CircleLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default LoadingSpinner;
