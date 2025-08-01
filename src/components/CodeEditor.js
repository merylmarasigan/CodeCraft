// src/components/CodeEditor.js
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import '../styling/CodeEditor.css'


// { 
//     initialCode = '', 
//     language = 'javascript',
//     onCodeChange,
//     height = '500px' 
//   }
// const CodeEditor = (props) => {
//     const initialCode = props.initialCode;
//     const height = props.height;
//     const onCodeChange;
//   const [code, setCode] = useState(initialCode);

//   // Handle when user types in the editor
//   const handleEditorChange = (value) => {
//     setCode(value);
//     if (onCodeChange) {
//       onCodeChange(value);
//     }
//   };

//   return (
//     <div style={{ border: '1px solid #ccc', borderRadius: '4px' }} className='editor'>
//       <Editor
//         // height={height}
//         // defaultLanguage={language}
//         // defaultValue={initialCode}
//         // value={code}
//         onChange={handleEditorChange}
//         theme="vs-dark" // You can use 'light' or 'vs-dark'
//         options={{
//           fontSize: 14,
//           minimap: { enabled: false }, // Disable minimap for cleaner look
//           scrollBeyondLastLine: false,
//           automaticLayout: true, // Auto-resize when container changes
//           tabSize: 2,
//           wordWrap: 'on'
//         }}
//       />
//     </div>
//   );
// };
const CodeEditor = (props) => {
    const[language, setLanguage ] = useState('python')
    const[code, setCode] = useState('')
    const functionName= props.functionName;
    const templates = {
        "python": `def ${functionName}(parameters):\n   # Write your code here\n    pass`, 
        "javascript": `function ${functionName}(parameters){\n  //function body goes here\n}`
    }
    return(
        <div className='editor'>
            <div className='editor-controls'>
                <button> Run</button>
                <select
                    value={language} 
                    className='language-selector'
                    onChange={(e) => {setLanguage(e.target.value)}}
                >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                </select>
                
            </div>
           <Editor 
                height="100%"
                theme='vs-dark'
                defaultLanguage={language}
                defaultValue={templates[language]}
            />
        </div>
    )
}
export default CodeEditor;