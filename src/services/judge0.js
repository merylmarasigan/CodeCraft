// src/services/judge0.js (Fixed - Remove expected_output)
import axios from 'axios';

// Judge0 API Configuration
const JUDGE0_API_URL = process.env.REACT_APP_JUDGE0_API_URL;
const RAPIDAPI_KEY = process.env.REACT_APP_JUDGE0_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.REACT_APP_JUDGE0_RAPIDAPI_HOST;

// Language IDs that Judge0 uses to identify programming languages
export const LANGUAGE_IDS = {
  javascript: 63,  // Node.js
  python: 71,      // Python 3
  java: 62,        // Java 8
  cpp: 54,         // C++ (GCC 9.2.0)
  c: 50            // C (GCC 9.2.0)
};

// Create axios instance with default headers for all Judge0 requests
const judge0Api = axios.create({
  baseURL: JUDGE0_API_URL,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
    'Content-Type': 'application/json'
  }
});

// Function to submit code for execution (FIXED - removed expected_output)
export const submitCode = async (sourceCode, languageId, stdin = '') => {
  try {
    console.log('Submitting code:', { sourceCode, languageId });
    
    const response = await judge0Api.post('/submissions?wait=false', {
      source_code: sourceCode,              // Send as plain text
      language_id: languageId,              
      stdin: stdin                          // Send as plain text
      // REMOVED: expected_output - this was causing the "Wrong Answer" status
    });
    
    console.log('Submission response:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Error submitting code:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get the results of a code execution (no base64)
export const getSubmissionResult = async (token) => {
  try {
    const response = await judge0Api.get(`/submissions/${token}`);
    
    console.log('Submission result:', response.data);
    
    // Judge0 returns results as plain text when base64_encoded is not set
    const result = {
      ...response.data,
      stdout: response.data.stdout || '',
      stderr: response.data.stderr || '',
      compile_output: response.data.compile_output || ''
    };
    
    return result;
  } catch (error) {
    console.error('Error getting submission result:', error.response?.data || error.message);
    throw error;
  }
};

// Function to wait for code execution to complete
export const waitForResult = async (token, maxAttempts = 15) => {
  console.log('Waiting for result, token:', token);
  
  for (let i = 0; i < maxAttempts; i++) {
    const result = await getSubmissionResult(token);
    
    console.log(`Attempt ${i + 1}, Status:`, result.status);
    
    // Judge0 status codes:
    // 1 = In Queue, 2 = Processing, 3+ = Finished
    if (result.status.id > 2) {
      console.log('Execution completed:', result);
      return result;
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  throw new Error('Timeout waiting for result');
};