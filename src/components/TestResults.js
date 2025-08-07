// src/components/TestResults.js
import React from 'react';
import '../styling/TestResults.css';

const TestResults = ({ results }) => {
  if (!results) {
    return (
      <div className="test-results-placeholder">
        <p>Click "Run Tests" to see results here</p>
      </div>
    );
  }

  if (!results.success) {
    return (
      <div className="test-results error">
        <h3>❌ Execution Error</h3>
        <div className="error-message">
          <strong>Error:</strong> {results.error}
        </div>
        
        {results.stderr && (
          <div className="error-details">
            <strong>Error Details:</strong>
            <pre>{results.stderr}</pre>
          </div>
        )}
        
        {results.compile_output && (
          <div className="error-details">
            <strong>Compilation Output:</strong>
            <pre>{results.compile_output}</pre>
          </div>
        )}
      </div>
    );
  }

  const { summary, results: testResults } = results;

  return (
    <div className="test-results success">
      <div className="summary">
        <h3>
          {summary.allPassed ? '✅' : '❌'} Test Results
        </h3>
        <div className="summary-stats">
          <span className={`score ${summary.allPassed ? 'all-passed' : 'some-failed'}`}>
            {summary.passed}/{summary.total} tests passed ({summary.percentage}%)
          </span>
        </div>
      </div>

      <div className="test-cases">
        {testResults.map((testCase, index) => (
          <div 
            key={index} 
            className={`test-case ${testCase.passed ? 'passed' : 'failed'}`}
          >
            <div className="test-header">
              <span className="test-number">Test {testCase.test}</span>
              <span className={`test-status ${testCase.passed ? 'passed' : 'failed'}`}>
                {testCase.passed ? '✅ PASS' : '❌ FAIL'}
              </span>
            </div>
            
            <div className="test-details">
              <div className="test-input">
                <strong>Input:</strong> 
                <code>{JSON.stringify(testCase.input)}</code>
              </div>
              
              <div className="test-expected">
                <strong>Expected:</strong> 
                <code>{JSON.stringify(testCase.expected)}</code>
              </div>
              
              <div className="test-actual">
                <strong>Actual:</strong> 
                <code className={testCase.passed ? 'correct' : 'incorrect'}>
                  {JSON.stringify(testCase.actual)}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {summary.allPassed && (
        <div className="success-message">
          🎉 Congratulations! All tests passed!
        </div>
      )}
    </div>
  );
};

export default TestResults;