import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Practice from './components/Practice';
import Learn from './components/Learn';
import Topic from './components/Topic';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/practice/:title' element={<Practice/>} />
          <Route path='/learn/:title' element={<Learn/>} />
          <Route path='/topic/:title/:id' element={<Topic/>} />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { supabase } from './services/supabase';

// function App() {
//   const [connectionStatus, setConnectionStatus] = useState('Testing...');
//   const [testData, setTestData] = useState(null);
//   const [newMessage, setNewMessage] = useState('');

//   // Test connection on component mount
//   useEffect(() => {
//     testConnection();
//   }, []);

//   const testConnection = async () => {
//     try {
//       // Test 1: Basic connection
//       const { data, error } = await supabase
//         .from('test')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (error) {
//         setConnectionStatus(`❌ Connection failed: ${error.message}`);
//         return;
//       }

//       setConnectionStatus('✅ Connected to Supabase successfully!');
//       setTestData(data);

//     } catch (err) {
//       setConnectionStatus(`❌ Error: ${err.message}`);
//     }
//   };

//   const addTestMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const { data, error } = await supabase
//         .from('test')
//         .insert([{ message: newMessage }])
//         .select();

//       if (error) {
//         alert(`Error: ${error.message}`);
//         return;
//       }

//       alert('✅ Message added successfully!');
//       setNewMessage('');
//       testConnection(); // Refresh data

//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     }
//   };

//   return (
//     <div style={{ 
//       padding: '40px', 
//       maxWidth: '600px', 
//       margin: '0 auto',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       <h1>🧪 CodeCraft Supabase Connection Test</h1>
      
//       {/* Connection Status */}
//       <div style={{ 
//         padding: '20px', 
//         background: connectionStatus.includes('✅') ? '#d4edda' : '#f8d7da',
//         border: `1px solid ${connectionStatus.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
//         borderRadius: '5px',
//         marginBottom: '30px'
//       }}>
//         <h3>Connection Status:</h3>
//         <p style={{ margin: 0, fontSize: '16px' }}>{connectionStatus}</p>
//       </div>

//       {/* Environment Check */}
//       <div style={{ 
//         padding: '15px', 
//         background: '#e2e3e5', 
//         borderRadius: '5px',
//         marginBottom: '30px'
//       }}>
//         <h3>Environment Variables:</h3>
//         <p>Supabase URL: {process.env.REACT_APP_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
//         <p>Supabase Key: {process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
//       </div>

//       {/* Test Data Display */}
//       {testData && (
//         <div style={{ marginBottom: '30px' }}>
//           <h3>📊 Test Data from Database:</h3>
//           <div style={{ 
//             background: '#f8f9fa', 
//             padding: '15px', 
//             borderRadius: '5px',
//             border: '1px solid #dee2e6'
//           }}>
//             {testData.map((item, index) => (
//               <div key={item.id} style={{ 
//                 marginBottom: '10px',
//                 padding: '10px',
//                 background: 'white',
//                 borderRadius: '3px'
//               }}>
//                 <strong>#{item.id}:</strong> {item.message}
//                 <br />
//                 <small style={{ color: '#666' }}>
//                   Created: {new Date(item.created_at).toLocaleString()}
//                 </small>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Add Test Message */}
//       <div style={{ marginBottom: '30px' }}>
//         <h3>✍️ Add Test Message:</h3>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Enter a test message..."
//             style={{ 
//               flex: 1, 
//               padding: '10px', 
//               border: '1px solid #ccc',
//               borderRadius: '3px'
//             }}
//             onKeyPress={(e) => e.key === 'Enter' && addTestMessage()}
//           />
//           <button 
//             onClick={addTestMessage}
//             style={{ 
//               padding: '10px 20px', 
//               background: '#007bff', 
//               color: 'white',
//               border: 'none',
//               borderRadius: '3px',
//               cursor: 'pointer'
//             }}
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       {/* Next Steps */}
//       <div style={{ 
//         padding: '20px', 
//         background: '#fff3cd', 
//         border: '1px solid #ffeaa7',
//         borderRadius: '5px'
//       }}>
//         <h3>🚀 Next Steps:</h3>
//         <p>If you see "✅ Connected" above and can add messages, your Supabase setup is working!</p>
//         <p>You can now proceed to implement your full CodeCraft database schema from the README.</p>
//       </div>

//       {/* Refresh Button */}
//       <div style={{ marginTop: '20px', textAlign: 'center' }}>
//         <button 
//           onClick={testConnection}
//           style={{ 
//             padding: '10px 30px', 
//             background: '#28a745', 
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           🔄 Refresh Test
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;