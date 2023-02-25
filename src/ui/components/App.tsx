import React, { useState } from 'react';
import { Button, Disclosure, Input, Text, Tip, Title } from 'react-figma-plugin-ds';
import 'react-figma-plugin-ds/figma-plugin-ds.css';
import '@ui/styles/global.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    window.parent.postMessage({ pluginMessage: { type: 'DrawRectangles', payload: { count } } }, '*');
  };
  const handleInvalidClick = () => {
    window.parent.postMessage({ pluginMessage: { type: 'DrawRectangles', payload: { count: 'count' } } }, '*');
  };

  const handleInputChanged = (value: string) => {
    setCount(Number(value));
  };

  return (
    <div className="p-4">
      <Title
        size="xlarge"
        weight="bold"
      >
        Figma Plugin React Template
      </Title>

      <Disclosure
        label="Getting started"
        isDefaultExpanded
      >
        <Tip
          iconColor="black8"
          iconName="resolve"
        >
          Install
        </Tip>
        <Tip
          iconColor="black8"
          iconName="play"
        >
          Start
        </Tip>
        <Tip
          iconColor="black8"
          iconName="library"
        >
          Read the docs
        </Tip>
      </Disclosure>

      <div className="flex flex-col gap-8 bg-slate-100 rounded-md p-4">
        <div className="flex flex-col gap-2">
          <Text size="small">Create Rectangles</Text>
          <Input
            type="number"
            onChange={handleInputChanged}
            placeholder="Number of rectangles"
            defaultValue={0}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleClick}>Draw</Button>
          <Button
            isSecondary
            onClick={handleInvalidClick}
          >
            Invalid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
