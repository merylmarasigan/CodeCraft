import '../styling/Home.css'
import '../styling/layout.css'
import '../styling/Practice.css'

import { supabase } from '../services/supabase';
import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const Practice = () => {
    const {title} = useParams();
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Sample problem data - you can fetch this from Supabase later
    const [problemData, setProblemData] = useState({
        title: title || 'Sample Problem',
        description: `
            Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.


            **Example 1:**
            Input: nums = [1,2,3,3]
            Output: true
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

            **Example 2:**
            Input: nums = [1,2,3,4], target = 6
            Output: false
                    `,
                    difficulty: 'Easy',
                    starterCode: {
                        javascript: `function twoSum(nums, target) {
                // Your code here
                
            }`,
            python: `def hasDuplicates(nums):
    # Your code here
    pass`,
            java: `public boolean hasDuplicates(int[] nums) {
    // Your code here
    
}`,
javascript: `function hasDuplicates(nums){
/*Your code here*/
}`
        }
    });

    // Set initial code when component mounts or language changes
    useEffect(() => {
        if (problemData.starterCode[language]) {
            setCode(problemData.starterCode[language]);
        }
    }, [language, problemData]);

    const handleEditorChange = (value) => {
        setCode(value || '');
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const runCode = async () => {
        setIsLoading(true);
        setOutput('Running code...');
        
        // Simulate code execution - replace with actual code execution service
        setTimeout(() => {
            setOutput(`Output for ${language}:\n\nCode executed successfully!\n\nTest Case 1: Passed\nTest Case 2: Passed\n\nTime: 0ms\nMemory: 42.3 MB`);
            setIsLoading(false);
        }, 2000);
    };

    const submitSolution = async () => {
        setIsLoading(true);
        
        // Here you would submit to your backend/judge system
        // For now, just simulate
        setTimeout(() => {
            setOutput(`Submission Results:\n\n✅ All test cases passed!\n\nRuntime: 68ms (Beats 85.23% of submissions)\nMemory: 44.1 MB (Beats 76.45% of submissions)\n\nCongratulations! Your solution has been accepted.`);
            setIsLoading(false);
        }, 3000);
    };

    const resetCode = () => {
        if (problemData.starterCode[language]) {
            setCode(problemData.starterCode[language]);
        }
    };

    return (
        <div className='practice-container'>
            <div className='problem-panel'>
                <div className='problem-header'>
                    <h1>{problemData.title}</h1>
                    <span className={`difficulty ${problemData.difficulty.toLowerCase()}`}>
                        {problemData.difficulty}
                    </span>
                </div>
                
                <div className='problem-description'>
                    <pre>{problemData.description}</pre>
                </div>
            </div>

            <div className='editor-panel'>
                <div className='editor-controls'>
                    <select 
                        value={language} 
                        onChange={handleLanguageChange}
                        className='language-selector'
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                    
                    <div className='editor-buttons'>
                        <button onClick={resetCode} className='btn btn-secondary'>
                            Reset
                        </button>
                        <button 
                            onClick={runCode} 
                            className='btn btn-primary'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Running...' : 'Run Code'}
                        </button>
                        <button 
                            onClick={submitSolution} 
                            className='btn btn-success'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>

                <div className='code-editor'>
                    <Editor
                    
                        // height="400px"
                        language={language}
                        value={code}
                        onChange={handleEditorChange}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 2,
                            wordWrap: 'on'
                        }}
                    />
                </div>

                <div className='output-panel'>
                    <h3>Output</h3>
                    <pre className='output-content'>
                        {output || 'Click "Run Code" to see output here...'}
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default Practice;