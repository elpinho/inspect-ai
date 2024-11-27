import React, { useEffect, useState } from 'react';
import { Button } from '@inspect-ai/ui-shared';

interface ElementInfo {
  tag: string;
  pointCount: number;
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
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-6 mb-0 fw-bold text-primary">
            <i className="bi bi-braces-asterisk me-2"></i>
            Inspect AI
          </h1>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="row mb-4">
        <div className="col">
          <div className="alert alert-primary d-flex align-items-center" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            <div>
              Select an element in the Elements panel to analyze its structure.
              Then enter your prompt and click Analyze to get AI insights.
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row mb-4">
        <div className="col">
          {/* Selected Element Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              {elementInfo ? (
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Selected Element</h6>
                  <h5 className="card-title d-flex align-items-center">
                    <code className="me-2">{elementInfo.tag}</code>
                    <span className="badge bg-primary rounded-pill">
                      {elementInfo.pointCount} points
                    </span>
                  </h5>
                </div>
              ) : (
                <p className="card-text text-muted fst-italic">
                  <i className="bi bi-hand-index me-2"></i>
                  No element selected
                </p>
              )}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-4">
            <label htmlFor="prompt" className="form-label fw-semibold">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="form-control"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={handleSubmit}
            disabled={!elementInfo || !prompt.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Analyzing...
              </>
            ) : (
              <>
                <i className="bi bi-lightning-charge-fill me-2"></i>
                Analyze
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response Section */}
      {response && (
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">
                  <i className="bi bi-robot me-2"></i>
                  Analysis
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text">{response}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
