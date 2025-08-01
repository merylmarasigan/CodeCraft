import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import '../styling/Practice.css'
    const Practice = () => {
    const {title} = useParams();
    const [userCode, setUserCode] = useState('');

    //default starter code for different problems
    const getStarterCode = (problemTitle) => {
        const templates = {
            'Contains Duplicate': `function containsDuplicate(nums){
            /*Write your solution here*/
        }`
        };

        return templates[problemTitle];
    }

    const handleCodeChanges = (newCode) => {
        setUserCode(newCode);
    }

    // const handleRunCode = () => {
    //     console.log('Running code');
    //     alert('Code execution would happen here\nCheck your console for your code.');
    // }

    
    return (
        <div className='practice'>
            <div className='content'>
                <ProblemDescription title={title}/>
                <CodeEditor functionName={title.replace(/\s/g,'')}/>
            </div>
            <div className='output-window'>
                <h2> Output Results</h2>
            </div>
        </div>
    );
}
 
export default Practice;