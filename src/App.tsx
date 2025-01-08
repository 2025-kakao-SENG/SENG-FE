import React, { useEffect, useState } from 'react';
import FadeIn from './components/FadeIn';

const App: React.FC = () => {
  const [text, setText] = useState<string>(''); // 텍스트 상태

  useEffect(() => {
    // 백엔드 데이터 가져오기 시뮬레이션
    setTimeout(() => {
      setText('Hello, GSAP fade-in animation!');
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FadeIn text={text} />
    </div>
  );
};

export default App;
