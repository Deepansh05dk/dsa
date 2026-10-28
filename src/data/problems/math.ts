import type { LeetCodeProblem } from '../../types/problem';

export const mathProblems: LeetCodeProblem[] = [
  {
    id: 9,
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    pattern: 'math',
    category: 'Math',
    statement: 'Given an integer x, return true if x is a palindrome, and false otherwise. Could you solve it without converting the integer to a string?',
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'String Conversion and Two-Pointer Equality Check',
      code: `function isPalindromeBrute(x: number): boolean {
  if (x < 0) return false;
  const s = x.toString();
  return s === s.split('').reverse().join('');
}`,
      complexity: {
        time: 'O(log10 N)',
        space: 'O(log10 N)'
      },
      explanation: 'Serializes integer to string, reverses string, and checks for equality.'
    },
    optimal: {
      name: 'Half-Integer Numeric Reversal',
      code: `function isPalindrome(x: number): boolean {
  // Negative numbers or numbers ending in 0 (except 0 itself) cannot be palindromes
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // When length is odd, discard the middle digit via revertedNumber / 10
  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
}`,
      complexity: {
        time: 'O(log10 N)',
        space: 'O(1)'
      },
      explanation: 'Reverses only the second half of the digits of x using modulo and division arithmetic. When x <= revertedNumber, half the number has been reversed. Compare x with revertedNumber directly in O(1) space without integer overflow.',
      whyOptimalIsPreferred: 'Meets the follow-up requirement of solving without string conversion, operating in pure O(1) space with zero risk of 32-bit integer overflow.',
      patternInvariant: 'Palindromic number symmetry: reversing the tail half of digits matches the remaining head half.'
    },
    defaultInputDescription: 'x = 121'
  },
  {
    id: 66,
    slug: 'plus-one',
    title: 'Plus One',
    difficulty: 'Easy',
    pattern: 'math',
    category: 'Math',
    statement: 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0\'s. Increment the large integer by one and return the resulting array of digits.',
    examples: [
      {
        input: 'digits = [1,2,3]',
        output: '[1,2,4]',
        explanation: 'The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4].'
      },
      {
        input: 'digits = [4,3,2,1]',
        output: '[4,3,2,2]'
      },
      {
        input: 'digits = [9]',
        output: '[1,0]'
      }
    ],
    constraints: [
      '1 <= digits.length <= 100',
      '0 <= digits[i] <= 9',
      'digits does not contain any leading 0\'s.'
    ],
    bruteForce: {
      name: 'BigInt Serialization and Increment',
      code: `function plusOneBrute(digits: number[]): number[] {
  const num = BigInt(digits.join('')) + 1n;
  return num.toString().split('').map(d => parseInt(d, 10));
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Converts array of digits to a string, parses as BigInt, increments by 1, and splits back into an array.'
    },
    optimal: {
      name: 'In-Place Backward Carry Ripple',
      code: `function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }

  // If all digits were 9, prepend 1
  return [1, ...digits];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1) auxiliary (O(N) when prepending 1)'
      },
      explanation: 'Walk backwards from the least significant digit. If current digit is less than 9, increment and return immediately. If it is 9, set to 0 and continue to propagate carry. If all digits were 9 (e.g. 999), return [1, 0, 0, 0].',
      whyOptimalIsPreferred: 'Modifies array in-place with early return in O(1) time for the common case where the last digit is not 9.',
      patternInvariant: 'Radix-10 addition carry terminates at the first non-9 digit from the right.'
    },
    defaultInputDescription: 'digits = [1, 2, 3]'
  },
  {
    id: 172,
    slug: 'factorial-trailing-zeroes',
    title: 'Factorial Trailing Zeroes',
    difficulty: 'Medium',
    pattern: 'math',
    category: 'Math',
    statement: 'Given an integer n, return the number of trailing zeroes in n!. Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.',
    examples: [
      {
        input: 'n = 3',
        output: '0',
        explanation: '3! = 6, no trailing zero.'
      },
      {
        input: 'n = 5',
        output: '1',
        explanation: '5! = 120, one trailing zero.'
      },
      {
        input: 'n = 0',
        output: '0'
      }
    ],
    constraints: [
      '0 <= n <= 10^4'
    ],
    bruteForce: {
      name: 'Compute Factorial and Count Trailing Zeroes',
      code: `function trailingZeroesBrute(n: number): number {
  let fact = 1n;
  for (let i = 2n; i <= BigInt(n); i++) fact *= i;
  let str = fact.toString();
  let count = 0;
  for (let i = str.length - 1; i >= 0 && str[i] === '0'; i--) count++;
  return count;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      },
      explanation: 'Calculates the full factorial using big integer arithmetic and counts consecutive zeros at the end.'
    },
    optimal: {
      name: 'Legendre\'s Formula (Factor of 5 Counting)',
      code: `function trailingZeroes(n: number): number {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}`,
      complexity: {
        time: 'O(log5 N)',
        space: 'O(1)'
      },
      explanation: 'Every trailing zero in n! is produced by a factor of 10 = 2 * 5. Factors of 2 are strictly more frequent than factors of 5. By Legendre\'s formula, count of 5s is floor(n/5) + floor(n/25) + floor(n/125) + ..., computing trailing zeroes in O(log5 N) time.',
      whyOptimalIsPreferred: 'Logarithmic O(log5 N) calculation that avoids integer overflow or factorial magnitude explosion.',
      patternInvariant: 'Trailing zero frequency equals the exponent of 5 in the prime factorization of n!.'
    },
    defaultInputDescription: 'n = 5'
  },
  {
    id: 69,
    slug: 'sqrtx',
    title: 'Sqrt(x)',
    difficulty: 'Easy',
    pattern: 'math',
    category: 'Math',
    statement: 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well. You must not use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.',
    examples: [
      {
        input: 'x = 4',
        output: '2',
        explanation: 'The square root of 4 is 2, so we return 2.'
      },
      {
        input: 'x = 8',
        output: '2',
        explanation: 'The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.'
      }
    ],
    constraints: [
      '0 <= x <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Linear Scan Increment',
      code: `function mySqrtBrute(x: number): number {
  let i = 0;
  while (i * i <= x) i++;
  return i - 1;
}`,
      complexity: {
        time: 'O(sqrt(X))',
        space: 'O(1)'
      },
      explanation: 'Tests every integer i from 0 upwards until i * i exceeds x.'
    },
    optimal: {
      name: 'Binary Search on Search Range [0, x]',
      code: `function mySqrt(x: number): number {
  if (x < 2) return x;

  let left = 2;
  let right = Math.floor(x / 2);
  let ans = 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}`,
      complexity: {
        time: 'O(log X)',
        space: 'O(1)'
      },
      explanation: 'Monotonic function f(k) = k^2 on range [0, x/2]. Binary search halves search space on each step, finding floor(sqrt(x)) in O(log x) iterations.',
      whyOptimalIsPreferred: 'Reduces time from O(sqrt(x)) to O(log x) by utilizing monotonicity of the quadratic curve.',
      patternInvariant: 'Binary search monotonic predicate: f(m) = m * m <= x partitions integer line into [true...true, false...false].'
    },
    defaultInputDescription: 'x = 8'
  },
  {
    id: 50,
    slug: 'powx-n',
    title: 'Pow(x, n)',
    difficulty: 'Medium',
    pattern: 'math',
    category: 'Math',
    statement: 'Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).',
    examples: [
      {
        input: 'x = 2.00000, n = 10',
        output: '1024.00000'
      },
      {
        input: 'x = 2.10000, n = 3',
        output: '9.26100'
      },
      {
        input: 'x = 2.00000, n = -2',
        output: '0.25000',
        explanation: '2^-2 = 1/2^2 = 1/4 = 0.25'
      }
    ],
    constraints: [
      '-100.0 < x < 100.0',
      '-2^31 <= n <= 2^31 - 1',
      'n is an integer.',
      'Either x is not zero or n > 0.',
      '-10^4 <= x^n <= 10^4'
    ],
    bruteForce: {
      name: 'Iterative Linear Multiplication',
      code: `function myPowBrute(x: number, n: number): number {
  if (n === 0) return 1;
  let p = Math.abs(n);
  let res = 1;
  for (let i = 0; i < p; i++) res *= x;
  return n < 0 ? 1 / res : res;
}`,
      complexity: {
        time: 'O(|N|)',
        space: 'O(1)'
      },
      explanation: 'Multiplies x by itself n times in a linear loop, which times out for large powers like 2^31.'
    },
    optimal: {
      name: 'Fast Exponentiation by Binary Squaring',
      code: `function myPow(x: number, n: number): number {
  let N = n;
  if (N < 0) {
    x = 1 / x;
    N = -N;
  }

  let result = 1;
  let currentProduct = x;

  while (N > 0) {
    if (N % 2 === 1) {
      result *= currentProduct;
    }
    currentProduct *= currentProduct;
    N = Math.floor(N / 2);
  }

  return result;
}`,
      complexity: {
        time: 'O(log |N|)',
        space: 'O(1)'
      },
      explanation: 'Binary exponentiation: square base x on each step and divide exponent N by 2. When the lowest bit of N is 1, multiply into result. Takes at most 32 multiplications for 32-bit powers.',
      whyOptimalIsPreferred: 'Exponentially accelerates computation from O(N) to O(log N) operations in O(1) space.',
      patternInvariant: 'Exponent halving property: x^n = (x^2)^(n/2) for even n, and x * (x^2)^((n-1)/2) for odd n.'
    },
    defaultInputDescription: 'x = 2.00000, n = 10'
  },
  {
    id: 149,
    slug: 'max-points-on-a-line',
    title: 'Max Points on a Line',
    difficulty: 'Hard',
    pattern: 'math',
    category: 'Math',
    statement: 'Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.',
    examples: [
      {
        input: 'points = [[1,1],[2,2],[3,3]]',
        output: '3'
      },
      {
        input: 'points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]',
        output: '4'
      }
    ],
    constraints: [
      '1 <= points.length <= 300',
      'points[i].length == 2',
      '-10^4 <= xi, yi <= 10^4',
      'All the points are unique.'
    ],
    bruteForce: {
      name: 'All Triplets Collinearity Check',
      code: `function maxPointsBrute(points: number[][]): number {
  const n = points.length;
  if (n <= 2) return n;
  let maxP = 2;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let count = 2;
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      for (let k = j + 1; k < n; k++) {
        const [x3, y3] = points[k];
        // Cross product for collinearity: (y2 - y1)*(x3 - x1) == (y3 - y1)*(x2 - x1)
        if ((y2 - y1) * (x3 - x1) === (y3 - y1) * (x2 - x1)) count++;
      }
      maxP = Math.max(maxP, count);
    }
  }
  return maxP;
}`,
      complexity: {
        time: 'O(N^3)',
        space: 'O(1)'
      },
      explanation: 'Evaluates every possible triplet of points using 2D cross product for collinearity.'
    },
    optimal: {
      name: 'Coprime Slope Fraction Hashing (GCD-Normalized)',
      code: `function maxPoints(points: number[][]): number {
  const n = points.length;
  if (n <= 2) return n;

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  let maxPointsOnLine = 1;

  for (let i = 0; i < n; i++) {
    const slopeCount = new Map<string, number>();
    let localMax = 0;

    for (let j = i + 1; j < n; j++) {
      let dx = points[j][0] - points[i][0];
      let dy = points[j][1] - points[i][1];

      // Normalize representation via GCD to avoid floating-point inaccuracies
      const g = gcd(Math.abs(dx), Math.abs(dy));
      dx = Math.floor(dx / g);
      dy = Math.floor(dy / g);

      // Standardize sign: ensure dx is positive or dy is positive when dx is 0
      if (dx < 0 || (dx === 0 && dy < 0)) {
        dx = -dx;
        dy = -dy;
      }

      const slopeKey = \`\${dy}/\${dx}\`;
      const count = (slopeCount.get(slopeKey) || 0) + 1;
      slopeCount.set(slopeKey, count);
      localMax = Math.max(localMax, count);
    }

    maxPointsOnLine = Math.max(maxPointsOnLine, localMax + 1);
  }

  return maxPointsOnLine;
}`,
      complexity: {
        time: 'O(N^2 * log(coordinateRange))',
        space: 'O(N)'
      },
      explanation: 'Fix each point i and calculate slopes with all other points j. Normalize slopes by dividing dx and dy by their GCD to avoid floating-point precision errors. Tally occurrences with a hash map in O(N^2) total time.',
      whyOptimalIsPreferred: 'Quadratic O(N^2) time using exact integer coprime fraction hashing, preventing floating-point precision false positives.',
      patternInvariant: 'Collinear points sharing an anchor point have identical coprime fraction slopes: dy / dx.'
    },
    defaultInputDescription: 'points = [[1, 1], [2, 2], [3, 3]]'
  }
];
