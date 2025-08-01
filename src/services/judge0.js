import axios from 'axios';

// Judge0 API Configuration - using your environment variables
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

// Function to submit code for execution
export const submitCode = async (sourceCode, languageId, stdin = '', expectedOutput = '') => {
  try {
    const response = await judge0Api.post('/submissions', {
      source_code: btoa(sourceCode),        // Base64 encode the code
      language_id: languageId,              // Tell Judge0 what language this is
      stdin: btoa(stdin),                   // Input data for the program
      expected_output: btoa(expectedOutput) // What we expect the output to be
    });
    
    return response.data.token;
  } catch (error) {
    console.error('Error submitting code:', error);
    throw error;
  }
};

// Function to get the results of a code execution
export const getSubmissionResult = async (token) => {
  try {
    const response = await judge0Api.get(`/submissions/${token}`);
    
    // Judge0 returns results in base64, so we need to decode them
    const result = {
      ...response.data,
      stdout: response.data.stdout ? atob(response.data.stdout) : '',
      stderr: response.data.stderr ? atob(response.data.stderr) : '',
      compile_output: response.data.compile_output ? atob(response.data.compile_output) : ''
    };
    
    return result;
  } catch (error) {
    console.error('Error getting submission result:', error);
    throw error;
  }
};

// Function to wait for code execution to complete
export const waitForResult = async (token, maxAttempts = 10) => {
  for (let i = 0; i < maxAttempts; i++) {
    const result = await getSubmissionResult(token);
    
    // Judge0 status codes:
    // 1 = In Queue, 2 = Processing, 3+ = Finished
    if (result.status.id > 2) {
      return result;
    }
    
    // Wait 1 second before checking again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error('Timeout waiting for result');
};