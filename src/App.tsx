import React from 'react';
import FadeIn from './components/FadeIn';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const text = 'Hello, GSAP fade-in animation!'; // 텍스트 상태

  return (
    <div className="">
      <FadeIn text={text} />
      <LoadingSpinner loading={true}/>
    </div>
  );
};

export default App;
