import React, { useEffect, useState } from 'react';
import { Button } from '@inspect-ai/ui-shared';

interface ElementInfo {
  tag: string;
  pointCount: number;
  outerHTML: string;
  tagHTML: string;
}

export function Panel() {
  const [elementInfo, setElementInfo] = useState<ElementInfo | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listen for messages from the devtools script
    const port = chrome.runtime.connect({ name: 'devtools-panel' });
    port.onMessage.addListener((message) => {
      if (message.type === 'ELEMENT_INFO') {
        setElementInfo(message.payload);
      }
    });

    return () => {
      port.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (!elementInfo || !prompt.trim()) return;

    setIsLoading(true);
    setResponse(''); // Clear previous response

    // TODO: Send to API
    console.log('Analyzing with prompt:', prompt);

    // Simulate API call
    setTimeout(() => {
      setResponse('This is a sample response. Replace with actual API integration.');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Inspect AI</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 mb-6">
        <p className="text-sm text-blue-700">
          Select an element in the Elements panel to analyze its structure. Then enter your prompt
          and click Analyze to get AI insights.
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Your Prompt
          </label>
          <br />
          <textarea
            id="prompt"
            rows={4}
            className="w-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="bg-gray-50 rounded-lg mb-4">
            {elementInfo ? (
              <div className="d-flex align-items-center gap-2">
                <div className="flex-grow-1 d-flex align-items-center" style={{ minWidth: 0 }}>
                  <code
                    className="badge bg-light text-primary text-start font-monospace text-truncate"
                    style={{ maxWidth: '100%' }}
                  >
                    {elementInfo.tagHTML}
                  </code>
                </div>
                <div className="badge bg-light text-dark d-flex align-items-center gap-1">
                  <div
                    className="rounded-circle bg-secondary"
                    style={{ width: '6px', height: '6px' }}
                  ></div>
                  <span className="f w-medium">{elementInfo.pointCount}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No element selected</p>
            )}
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={!elementInfo || !prompt.trim() || isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>

      {response && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Analysis</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
}
