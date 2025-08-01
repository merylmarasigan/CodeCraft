// src/data/problems.js

export const problemsData = {
    "Two Sum": {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
  
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  
  You can return the answer in any order.`,
      
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6", 
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] },
        { input: [[1, 2, 3, 4, 5], 9], expected: [3, 4] },
        { input: [[2, 5, 5, 11], 10], expected: [1, 2] }
      ],
      
      starterCode: {
        javascript: `function twoSum(nums, target) {
      // Your code here
      
  }
  
  // Test your function
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = twoSum(nums, target);
  console.log(JSON.stringify(result));`,
        
        python: `def two_sum(nums, target):
      # Your code here
      pass
  
  # Test your function
  nums = [2, 7, 11, 15]
  target = 9
  result = two_sum(nums, target)
  print(result)`,
        
        java: `import java.util.*;
  
  public class Solution {
      public int[] twoSum(int[] nums, int target) {
          // Your code here
          return new int[]{};
      }
      
      public static void main(String[] args) {
          Solution solution = new Solution();
          int[] nums = {2, 7, 11, 15};
          int target = 9;
          int[] result = solution.twoSum(nums, target);
          System.out.println(Arrays.toString(result));
      }
  }`
      }
    },
  
    "Contains Duplicate": {
      id: 2,
      title: "Contains Duplicate",
      difficulty: "Easy",
      description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
      
      examples: [
        {
          input: "nums = [1,2,3,1]",
          output: "true",
          explanation: "The element 1 appears at indices 0 and 3."
        },
        {
          input: "nums = [1,2,3,4]",
          output: "false", 
          explanation: "All elements are distinct."
        }
      ],
      
      testCases: [
        { input: [[1, 2, 3, 1]], expected: true },
        { input: [[1, 2, 3, 4]], expected: false },
        { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
        { input: [[1]], expected: false },
        { input: [[]], expected: false }
      ],
      
      starterCode: {
        javascript: `function containsDuplicate(nums) {
      // Your code here
      
  }
  
  // Test your function
  const nums = [1, 2, 3, 1];
  const result = containsDuplicate(nums);
  console.log(result);`,
        
        python: `def contains_duplicate(nums):
      # Your code here
      pass
  
  # Test your function
  nums = [1, 2, 3, 1]
  result = contains_duplicate(nums)
  print(result)`,
        
        java: `import java.util.*;
  
  public class Solution {
      public boolean containsDuplicate(int[] nums) {
          // Your code here
          return false;
      }
      
      public static void main(String[] args) {
          Solution solution = new Solution();
          int[] nums = {1, 2, 3, 1};
          boolean result = solution.containsDuplicate(nums);
          System.out.println(result);
      }
  }`
      }
    },
  
    "Valid Anagram": {
      id: 3,
      title: "Valid Anagram", 
      difficulty: "Easy",
      description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.
  
  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
      
      examples: [
        {
          input: 's = "anagram", t = "nagaram"',
          output: "true",
          explanation: "Both strings contain the same characters with the same frequency."
        },
        {
          input: 's = "rat", t = "car"',
          output: "false",
          explanation: "The strings contain different characters."
        }
      ],
      
      testCases: [
        { input: ["anagram", "nagaram"], expected: true },
        { input: ["rat", "car"], expected: false },
        { input: ["listen", "silent"], expected: true },
        { input: ["hello", "bello"], expected: false },
        { input: ["", ""], expected: true }
      ],
      
      starterCode: {
        javascript: `function isAnagram(s, t) {
      // Your code here
      
  }
  
  // Test your function
  const s = "anagram";
  const t = "nagaram";
  const result = isAnagram(s, t);
  console.log(result);`,
        
        python: `def is_anagram(s, t):
      # Your code here
      pass
  
  # Test your function
  s = "anagram"
  t = "nagaram"
  result = is_anagram(s, t)
  print(result)`,
        
        java: `import java.util.*;
  
  public class Solution {
      public boolean isAnagram(String s, String t) {
          // Your code here
          return false;
      }
      
      public static void main(String[] args) {
          Solution solution = new Solution();
          String s = "anagram";
          String t = "nagaram";
          boolean result = solution.isAnagram(s, t);
          System.out.println(result);
      }
  }`
      }
    }
  };
  
  // Helper function to get problem by title
  export const getProblemByTitle = (title) => {
    return problemsData[title] || null;
  };
  
  // Helper function to get all problem titles
  export const getAllProblemTitles = () => {
    return Object.keys(problemsData);
  };