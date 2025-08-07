// src/services/testRunner.js - Complete debug version
import { submitCode, waitForResult, LANGUAGE_IDS } from './judge0';
import { getTestCases } from './testCases';

class TestRunner {
  constructor() {
    this.isRunning = false;
  }

  // Helper function to convert JavaScript values to Python values
  convertToPythonValue(value) {
    console.log('Converting to Python:', value, typeof value);
    
    // Handle undefined and null first
    if (value === undefined) {
      console.log('Found undefined, converting to None');
      return 'None';
    }
    if (value === null) {
      console.log('Found null, converting to None');
      return 'None';
    }
    
    // Handle booleans
    if (value === true) return 'True';
    if (value === false) return 'False';
    
    // Handle strings
    if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;
    
    // Handle arrays
    if (Array.isArray(value)) {
      const converted = `[${value.map(v => this.convertToPythonValue(v)).join(', ')}]`;
      console.log('Converted array:', value, '->', converted);
      return converted;
    }
    
    // Handle objects
    if (typeof value === 'object' && value !== null) {
      const pairs = Object.entries(value).map(([k, v]) => 
        `"${k}": ${this.convertToPythonValue(v)}`
      );
      return `{${pairs.join(', ')}}`;
    }
    
    // Handle numbers and other primitives
    const converted = String(value);
    console.log('Converted primitive:', value, '->', converted);
    return converted;
  }

  // Generate test wrapper code that runs all test cases
  generateTestCode(userCode, problemName, language) {
    const cases = getTestCases(problemName);
    console.log('Test cases for', problemName, ':', cases);
    
    if (language === 'python') {
      return this.generatePythonTestCode(userCode, cases);
    } else if (language === 'javascript') {
      return this.generateJavaScriptTestCode(userCode, cases);
    }
    
    throw new Error(`Unsupported language: ${language}`);
  }

  generatePythonTestCode(userCode, testCases) {
    // Extract function name from user code
    const functionMatch = userCode.match(/def\s+(\w+)\s*\(/);
    const functionName = functionMatch ? functionMatch[1] : 'solution';
    console.log('Extracted function name:', functionName);
    
    let testCode = `${userCode}\n\n`;
    testCode += `import json\nresults = []\n\n`;
    
    testCases.forEach((testCase, index) => {
      console.log(`Processing test case ${index + 1}:`, testCase);
      
      const { input, expected } = testCase;
      console.log('Input:', input, 'Expected:', expected);
      
      let inputArgs;
      
      // Handle different input formats
      if (Array.isArray(input)) {
        console.log('Input is array with length:', input.length);
        if (input.length === 1) {
          // Single argument like [[1,2,3,1]] -> [1,2,3,1]
          console.log('Single argument case, input[0]:', input[0]);
          inputArgs = this.convertToPythonValue(input[0]);
        } else {
          // Multiple arguments like [[2,7,11,15], 9] -> [2,7,11,15], 9
          console.log('Multiple arguments case');
          inputArgs = input.map(arg => {
            console.log('Processing arg:', arg);
            return this.convertToPythonValue(arg);
          }).join(', ');
        }
      } else {
        console.log('Input is not array');
        inputArgs = this.convertToPythonValue(input);
      }
      
      console.log('Final inputArgs:', inputArgs);
      
      const expectedPython = this.convertToPythonValue(expected);
      console.log('Expected Python:', expectedPython);
      
      testCode += `try:\n`;
      testCode += `    result = ${functionName}(${inputArgs})\n`;
      testCode += `    expected = ${expectedPython}\n`;
      testCode += `    passed = result == expected\n`;
      testCode += `    results.append({\n`;
      testCode += `        "test": ${index + 1},\n`;
      testCode += `        "input": ${this.convertToPythonValue(input)},\n`;
      testCode += `        "expected": expected,\n`;
      testCode += `        "actual": result,\n`;
      testCode += `        "passed": passed\n`;
      testCode += `    })\n`;
      testCode += `except Exception as e:\n`;
      testCode += `    results.append({\n`;
      testCode += `        "test": ${index + 1},\n`;
      testCode += `        "input": ${this.convertToPythonValue(input)},\n`;
      testCode += `        "expected": ${expectedPython},\n`;
      testCode += `        "actual": f"Error: {str(e)}",\n`;
      testCode += `        "passed": False\n`;
      testCode += `    })\n\n`;
    });
    
    testCode += `print(json.dumps(results, indent=2))`;
    return testCode;
  }

  generateJavaScriptTestCode(userCode, testCases) {
    // Extract function name from user code
    const functionMatch = userCode.match(/function\s+(\w+)\s*\(/);
    const functionName = functionMatch ? functionMatch[1] : 'solution';
    
    let testCode = `${userCode}\n\n`;
    testCode += `const results = [];\n\n`;
    
    testCases.forEach((testCase, index) => {
      const { input, expected } = testCase;
      let inputArgs;
      
      // Handle different input formats
      if (Array.isArray(input)) {
        if (input.length === 1) {
          // Single argument
          inputArgs = JSON.stringify(input[0]);
        } else {
          // Multiple arguments
          inputArgs = input.map(arg => JSON.stringify(arg)).join(', ');
        }
      } else {
        inputArgs = JSON.stringify(input);
      }
      
      testCode += `try {\n`;
      testCode += `    const result = ${functionName}(${inputArgs});\n`;
      testCode += `    const expected = ${JSON.stringify(expected)};\n`;
      testCode += `    const passed = JSON.stringify(result) === JSON.stringify(expected);\n`;
      testCode += `    results.push({\n`;
      testCode += `        test: ${index + 1},\n`;
      testCode += `        input: ${JSON.stringify(input)},\n`;
      testCode += `        expected: expected,\n`;
      testCode += `        actual: result,\n`;
      testCode += `        passed: passed\n`;
      testCode += `    });\n`;
      testCode += `} catch (e) {\n`;
      testCode += `    results.push({\n`;
      testCode += `        test: ${index + 1},\n`;
      testCode += `        input: ${JSON.stringify(input)},\n`;
      testCode += `        expected: ${JSON.stringify(expected)},\n`;
      testCode += `        actual: "Error: " + e.message,\n`;
      testCode += `        passed: false\n`;
      testCode += `    });\n`;
      testCode += `}\n\n`;
    });
    
    testCode += `console.log(JSON.stringify(results, null, 2));`;
    return testCode;
  }

  // Main function to run tests
  async runTests(userCode, problemName, language) {
    if (this.isRunning) {
      throw new Error('Tests are already running');
    }

    this.isRunning = true;
    
    try {
      // Generate test wrapper code
      const testCode = this.generateTestCode(userCode, problemName, language);
      
      console.log('Generated test code:');
      console.log(testCode);
      console.log('=== END GENERATED CODE ===');
      
      // Submit to Judge0
      const languageId = LANGUAGE_IDS[language];
      if (!languageId) {
        throw new Error(`Unsupported language: ${language}`);
      }
      
      const token = await submitCode(testCode, languageId);
      
      // Wait for result
      const result = await waitForResult(token);
      
      // Process result
      return this.processResult(result);
      
    } catch (error) {
      console.error('Test execution error:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      this.isRunning = false;
    }
  }

  processResult(result) {
    console.log('Full Judge0 result:', result);
    console.log('Status:', result.status);
    console.log('Stdout:', result.stdout);
    console.log('Stderr:', result.stderr);
    
    // Status 3 = Accepted (successful execution)
    if (result.status.id === 3) {
      try {
        console.log('Trying to parse stdout as JSON...');
        const testResults = JSON.parse(result.stdout);
        console.log('Parsed test results:', testResults);
        return {
          success: true,
          results: testResults,
          summary: this.generateSummary(testResults)
        };
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        return {
          success: false,
          error: 'Failed to parse test results',
          stdout: result.stdout,
          stderr: result.stderr
        };
      }
    } else {
      // Handle compilation errors, runtime errors, etc.
      console.log('Execution failed with status:', result.status.description);
      return {
        success: false,
        error: result.status.description,
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output
      };
    }
  }

  generateSummary(testResults) {
    const passed = testResults.filter(r => r.passed).length;
    const total = testResults.length;
    
    return {
      passed,
      total,
      percentage: total > 0 ? Math.round((passed / total) * 100) : 0,
      allPassed: passed === total
    };
  }
}

export default new TestRunner();