/**
 * Sample JavaScript questions with intentional bugs.
 * Each question has: id, title, description, buggyCode, hints, solution (for reference).
 */

export const jsQuestions = [
  {
    id: "q1",
    title: "Sum of Array",
    difficulty: "easy",
    description: "Fix the function so it returns the correct sum of all numbers in the array.",
    buggyCode: `function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log(sumArray([1, 2, 3, 4, 5])); // Expected: 15
`,
    hints: ["Check the loop condition. What is the last valid index of an array?"],
    solution: "Use i < arr.length instead of i <= arr.length (off-by-one).",
    expectedOutput: ["15"],
  },
  {
    id: "q2",
    title: "Double the Numbers",
    difficulty: "easy",
    description: "Fix the function so it returns a new array with each number doubled.",
    buggyCode: `function doubleNumbers(arr) {
  const result = [];
  arr.forEach((n) => {
    n * 2;
  });
  return result;
}

console.log(doubleNumbers([1, 2, 3])); // Expected: [2, 4, 6]
`,
    hints: ["forEach callback doesn't return a value to the outer array. You need to push something."],
    solution: "Push n * 2 into result: result.push(n * 2); or use map instead.",
    expectedOutput: ["[2, 4, 6]"],
  },
  {
    id: "q3",
    title: "Find Maximum",
    difficulty: "easy",
    description: "Fix the function so it returns the largest number in the array.",
    buggyCode: `function findMax(arr) {
  let max = 0;
  for (const num of arr) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}

console.log(findMax([-5, -2, -10])); // Expected: -2
`,
    hints: ["What if all numbers are negative? Is 0 the right initial value?"],
    solution: "Initialize max with arr[0] or -Infinity so it works for negative numbers.",
    expectedOutput: ["-2"],
  },
  {
    id: "q4",
    title: "Count Vowels",
    difficulty: "medium",
    description: "Fix the function so it returns the correct count of vowels (a, e, i, o, u) in the string.",
    buggyCode: `function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("HELLO World")); // Expected: 3
`,
    hints: ["Vowels can be uppercase too. Does 'aeiou' include 'E' or 'O'?"],
    solution: "Convert str to lowercase before checking: str.toLowerCase(), or add uppercase vowels to the vowels string.",
    expectedOutput: ["3"],
  },
  {
    id: "q5",
    title: "Delayed Log (Closure)",
    difficulty: "medium",
    description: "Fix the code so that after 1 second, it logs 0, 1, 2 (not 3, 3, 3).",
    buggyCode: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
`,
    hints: ["var is function-scoped. By the time the callback runs, what is the value of i?"],
    solution: "Use let instead of var so each iteration gets its own i, or wrap in an IIFE that captures i.",
    expectedOutput: ["0", "1", "2"],
  },
  {
    id: "q6",
    title: "Strict Equality",
    difficulty: "easy",
    description: "Fix the function so it returns true only when a and b are the same value and type.",
    buggyCode: `function isEqual(a, b) {
  return a == b;
}

console.log(isEqual(0, "0"));  // Should be false
console.log(isEqual(5, 5));    // Should be true
`,
    hints: ["== allows type coercion. How do you compare both value and type?"],
    solution: "Use === instead of == for strict equality.",
    expectedOutput: ["false", "true"],
  },
  {
    id: "q7",
    title: "Factorial",
    difficulty: "medium",
    description: "Fix the function so it returns the factorial of n (e.g. 5! = 120).",
    buggyCode: `function factorial(n) {
  let result = 1;
  for (let i = 2; i < n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5)); // Expected: 120
`,
    hints: ["The loop should include n. Should the condition be i < n or i <= n?"],
    solution: "Use i <= n so that n is included in the product.",
    expectedOutput: ["120"],
  },
  {
    id: "q8",
    title: "Reverse String",
    difficulty: "hard",
    description: "Fix the function so it returns the reversed string.",
    buggyCode: `function reverseString(str) {
  let reversed = "";
  for (let i = str.length; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString("hello")); // Expected: "olleh"
`,
    hints: ["What is str[str.length]? Valid indices are 0 to str.length - 1."],
    solution: "Start at str.length - 1: let i = str.length - 1.",
    expectedOutput: ["olleh"],
  },
];

// Helper: check if run output matches expected (compare log lines only, trimmed)
export function isOutputCorrect(output, expectedOutput) {
  if (!expectedOutput || !Array.isArray(expectedOutput) || expectedOutput.length === 0) return false;
  const logLines = output.filter((o) => o.type === "log").map((o) => o.line.trim());
  if (logLines.length !== expectedOutput.length) return false;
  return expectedOutput.every((expected, i) => {
    const actual = logLines[i];
    // Normalize: allow "[2, 4, 6]" to match "[2,4,6]"
    const norm = (s) => s.replace(/\s+/g, "");
    return norm(actual) === norm(expected.trim());
  });
}

// Helper function to get time limit in seconds based on difficulty
export function getTimeLimit(difficulty) {
  const timeLimits = {
    easy: 5 * 60,    // 5 minutes
    medium: 15 * 60, // 15 minutes
    hard: 30 * 60,   // 30 minutes
  };
  return timeLimits[difficulty] || 0;
}
