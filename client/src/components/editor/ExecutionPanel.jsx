// src/components/ExecutionPanel.jsx
import React from 'react';

const ExecutionPanel = ({
    input,
    setInput,
    output,
    isLoading,
    onRunCode,
    onAskAi,
}) => {
    return (
        <div className="executionPanel">
            <div className="io-container">
                <h3>Input</h3>
                <textarea
                    className="io-box"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your custom input here..."
                    disabled={isLoading}
                ></textarea>
            </div>
            <div className="io-container">
                <h3>Output</h3>
                <pre className="io-box output-box">
                    {isLoading ? 'Executing...' : output}
                </pre>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                <button className="btn whiteBtn" onClick={onAskAi}>
                    🤖 Ask AI
                </button>
                <button className="btn runBtn" onClick={onRunCode} disabled={isLoading}>
                    {isLoading ? 'Running...' : 'Run Code'}
                </button>
            </div>
        </div>
    );
};

export default ExecutionPanel;