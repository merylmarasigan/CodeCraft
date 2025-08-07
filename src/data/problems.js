// src/services/testCases.js - Updated to match your problems.js format
export const testCases = {
  'Contains Duplicate': [
    { input: [[1, 2, 3, 1]], expected: true },
    { input: [[1, 2, 3, 4]], expected: false },
    { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    { input: [[1]], expected: false },
    { input: [[]], expected: false }
  ],
  'Two Sum': [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { input: [[3, 2, 4], 6], expected: [1, 2] },
    { input: [[3, 3], 6], expected: [0, 1] },
    { input: [[1, 2, 3, 4, 5], 9], expected: [3, 4] },
    { input: [[2, 5, 5, 11], 10], expected: [1, 2] }
  ],
  'Valid Anagram': [
    { input: ["anagram", "nagaram"], expected: true },
    { input: ["rat", "car"], expected: false },
    { input: ["listen", "silent"], expected: true },
    { input: ["hello", "bello"], expected: false },
    { input: ["", ""], expected: true }
  ]
};

// Helper function to get test cases for a specific problem
export const getTestCases = (problemName) => {
  return testCases[problemName] || [];
};