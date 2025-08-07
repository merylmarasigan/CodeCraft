// src/components/Practice.js
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import TestResults from './TestResults';
import '../styling/Practice.css';

const Practice = () => {
    const { title } = useParams();
    const [testResults, setTestResults] = useState(null);

    // Convert problem title to proper camelCase function name
    const getFunctionName = (problemTitle) => {
        // Remove spaces and special chars, then convert to camelCase
        const words = problemTitle.split(/\s+/);
        const camelCase = words[0].toLowerCase() + 
                         words.slice(1).map(word => 
                             word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                         ).join('');
        return camelCase;
    };

    const handleTestResults = (results) => {
        setTestResults(results);
        console.log('Received test results:', results);
    };

    return (
        <div className='practice'>
            <div className='content'>
                <ProblemDescription title={title} />
                <CodeEditor 
                    functionName={getFunctionName(title)}
                    problemName={title}
                    onTestResults={handleTestResults}
                />
            </div>
            
            <div className='output-window'>
                <h2>Test Results</h2>
                <TestResults results={testResults} />
            </div>
        </div>
    );
};

export default Practice;