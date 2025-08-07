// src/components/CodeEditor.js - Fixed template bug
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import testRunner from '../services/testRunner';
import '../styling/CodeEditor.css'

const CodeEditor = ({functionName, problemName, onTestResults}) => {
    const[language, setLanguage ] = useState('python')
    const[code, setCode] = useState('')
    const [isTestRunning, setTestIsRunning]= useState(false);
   
    const getTemplate = (lang, funcName) => {
        const templates = {
            "python": `def ${funcName}(nums):\n   # Write your code here\n    pass`, 
            "javascript": `function ${funcName}(nums){\n  //function body goes here\n}`
        };
        return templates[lang] || '';
    }
    
    React.useEffect(() => {
        if(functionName){
            setCode(getTemplate(language, functionName)); // Fixed: using functionName correctly
        }
    },[language, functionName]);

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value
        setLanguage(newLanguage);
        console.log(`Language switched to: ${newLanguage}`); // Fixed: using newLanguage
    }
    
    const handleCodeChange = (value) => {
        setCode(value || '');
    }

    const runTests = async() => {
        if(!code.trim()){
            alert(`Please write some code first!`);
            return;
        }

        if(!problemName){
            alert(`Problem name is required to run tests!`);
            return; // Added return here
        }

        setTestIsRunning(true);

        try{
            console.log(`Running test for: ${problemName}`);
            console.log(`Function name: ${functionName}`);
            console.log(`Code: ${code}`);
            
            const results = await testRunner.runTests(code, problemName, language);

            //pass results back to parent component
            if(onTestResults){
                onTestResults(results);
            }

            console.log('Test results:', results);
        }catch(error){
            console.error('Error running tests: ', error);
            const errorResult = {
                success: false,
                error: error.message
            };

            if(onTestResults){
                onTestResults(errorResult)
            }
        }finally{
            setTestIsRunning(false);
        }
    }
    
    return(
        <div className='editor'>
            <div className='editor-controls'>
            <button 
                    onClick={runTests} 
                    disabled={isTestRunning || !code.trim()}
                    style={{
                        backgroundColor: isTestRunning ? '#6c757d' : '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: isTestRunning ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isTestRunning ? 'Running Tests...' : 'Run Tests'}
                </button>
                <select
                    value={language} 
                    className='language-selector'
                    onChange={handleLanguageChange}
                    disabled={isTestRunning}
                >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                </select>
                
            </div>
            <Editor 
                height="100%"
                theme='vs-dark'
                language={language}
                value={code}
                onChange={handleCodeChange}
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
    )
}
export default CodeEditor;