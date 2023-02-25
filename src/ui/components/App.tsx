import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    window.parent.postMessage({ pluginMessage: { type: 'DrawRectangles', payload: { count } } }, '*');
  };
  const handleInvalidClick = () => {
    window.parent.postMessage({ pluginMessage: { type: 'DrawRectangles', payload: { count: 'count' } } }, '*');
  };

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.target.value));
  };

  return (
    <div>
      <h1>App</h1>
      <input
        type="number"
        onChange={handleInputChanged}
        value={count}
      />
      <button
        type="button"
        onClick={handleClick}
      >
        Draw
      </button>
      <button
        type="button"
        onClick={handleInvalidClick}
      >
        Invalid
      </button>
    </div>
  );
};

export default App;
