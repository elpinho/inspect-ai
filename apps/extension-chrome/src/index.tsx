import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '@inspect-ai/ui-shared';
import { VERSION } from '@inspect-ai/shared';

const App = () => {
  return (
    <div className="p-4">
      <h1>Chrome Extension v{VERSION}</h1>
      <Button onClick={() => console.log('clicked')}>
        Click me
      </Button>
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
