import type { LeetCodeProblem } from '../../types/problem';

export const bitManipulationProblems: LeetCodeProblem[] = [
  {
    id: 67,
    slug: 'add-binary',
    title: 'Add Binary',
    difficulty: 'Easy',
    pattern: 'bit-manipulation',
    category: 'Bit Manipulation',
    statement: 'Given two binary strings a and b, return their sum as a binary string.',
    examples: [
      {
        input: 'a = "11", b = "1"',
        output: '"100"'
      },
      {
        input: 'a = "1010", b = "1011"',
        output: '"10101"'
      }
    ],
    constraints: [
      '1 <= a.length, b.length <= 10^4',
      'a and b consist only of \'0\' or \'1\' characters.',
      'Each string does not contain leading zeros except for the zero itself.'
    ],
    bruteForce: {
      name: 'BigInt Binary Conversion',
      code: `function addBinaryBrute(a: string, b: string): string {
  const sum = BigInt('0b' + a) + BigInt('0b' + b);
  return sum.toString(2);
}`,
      complexity: {
        time: 'O(N + M)',
        space: 'O(N + M)'
      },
      explanation: 'Parses binary strings using built-in BigInt notation and serializes sum back to base-2.'
    },
    optimal: {
      name: 'Right-to-Left Carry Simulation',
      code: `function addBinary(a: string, b: string): string {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const result: string[] = [];

  while (i >= 0 || j >= 0 || carry !== 0) {
    let sum = carry;
    if (i >= 0) {
      sum += a.charCodeAt(i) - 48;
      i--;
    }
    if (j >= 0) {
      sum += b.charCodeAt(j) - 48;
      j--;
    }

    result.push((sum % 2).toString());
    carry = Math.floor(sum / 2);
  }

  return result.reverse().join('');
}`,
      complexity: {
        time: 'O(max(N, M))',
        space: 'O(max(N, M))'
      },
      explanation: 'Traverse backwards from the lowest significant bits with pointers i and j. Sum digits and carry: write sum % 2, propagate carry = Math.floor(sum / 2). Reverse result array at the end.',
      whyOptimalIsPreferred: 'Direct bitwise character streaming avoids arbitrary-precision BigInt dependencies or integer overflow limits.',
      patternInvariant: 'Bitwise full adder mechanics: sum bit is (a ^ b ^ carry), next carry is (a & b) | (carry & (a ^ b)).'
    },
    defaultInputDescription: 'a = "1010", b = "1011"'
  },
  {
    id: 190,
    slug: 'reverse-bits',
    title: 'Reverse Bits',
    difficulty: 'Easy',
    pattern: 'bit-manipulation',
    category: 'Bit Manipulation',
    statement: 'Reverse bits of a given 32 bits unsigned integer.',
    examples: [
      {
        input: 'n = 00000010100101000001111010011100',
        output: '964176192 (00111001011110000010100101000000)',
        explanation: 'The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.'
      }
    ],
    constraints: [
      'The input must be a binary string of length 32'
    ],
    bruteForce: {
      name: 'Binary String Manipulation',
      code: `function reverseBitsBrute(n: number): number {
  let bin = (n >>> 0).toString(2).padStart(32, '0');
  let rev = bin.split('').reverse().join('');
  return parseInt(rev, 2) >>> 0;
}`,
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      },
      explanation: 'Formats number to 32-character binary string, reverses the string, and parses back to integer.'
    },
    optimal: {
      name: 'Bitwise Shift & Mask Accumulation',
      code: `function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}`,
      complexity: {
        time: 'O(1) (exactly 32 iterations)',
        space: 'O(1)'
      },
      explanation: 'Loop 32 times. On each iteration, shift result left by 1 and append lowest bit of n (n & 1). Then shift n right logically (n >>>= 1). Coerce to unsigned 32-bit with >>> 0.',
      whyOptimalIsPreferred: 'Executes strictly in native 32-bit CPU registers with zero string allocations or parsing overhead.',
      patternInvariant: 'Bit reversal duality: shift extracted LSB into the MSB stream using left shifts.'
    },
    defaultInputDescription: 'n = 43261596 (32-bit register)'
  },
  {
    id: 191,
    slug: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'Easy',
    pattern: 'bit-manipulation',
    category: 'Bit Manipulation',
    statement: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).',
    examples: [
      {
        input: 'n = 11',
        output: '3',
        explanation: 'The input binary string 1011 has a total of three set bits.'
      },
      {
        input: 'n = 128',
        output: '1',
        explanation: 'The input binary string 10000000 has a total of one set bit.'
      },
      {
        input: 'n = 2147483645',
        output: '30'
      }
    ],
    constraints: [
      '1 <= n <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Check All 32 Bit Positions',
      code: `function hammingWeightBrute(n: number): number {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if ((n & (1 << i)) !== 0) count++;
  }
  return count;
}`,
      complexity: {
        time: 'O(1) (32 loops)',
        space: 'O(1)'
      },
      explanation: 'Tests every bit position from 0 to 31 against a 1-bit mask.'
    },
    optimal: {
      name: 'Brian Kernighan\'s Bit Clearance Algorithm',
      code: `function hammingWeight(n: number): number {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Clears the lowest set bit
    count++;
  }
  return count;
}`,
      complexity: {
        time: 'O(k) where k is number of 1-bits (at most 32)',
        space: 'O(1)'
      },
      explanation: 'The operation n & (n - 1) flips the lowest set bit to 0 and leaves all higher bits unchanged. The loop runs exactly once per 1-bit, making it proportional to the Hamming weight rather than total word length.',
      whyOptimalIsPreferred: 'Loop executes only k times (where k is the count of set bits) rather than always checking all 32 bits.',
      patternInvariant: 'Bit clearance invariant: n & (n - 1) isolates and unsets the lowest set 1-bit in O(1).'
    },
    defaultInputDescription: 'n = 11 (binary 1011)'
  },
  {
    id: 136,
    slug: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    pattern: 'bit-manipulation',
    category: 'Bit Manipulation',
    statement: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1'
      },
      {
        input: 'nums = [4,1,2,1,2]',
        output: '4'
      },
      {
        input: 'nums = [1]',
        output: '1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-3 * 10^4 <= nums[i] <= 3 * 10^4',
      'Each element in the array appears twice except for one element which appears only once.'
    ],
    bruteForce: {
      name: 'Hash Set Unpaired Tracking',
      code: `function singleNumberBrute(nums: number[]): number {
  const set = new Set<number>();
  for (const n of nums) {
    if (set.has(n)) set.delete(n);
    else set.add(n);
  }
  return Array.from(set)[0];
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Uses a hash set to insert seen numbers and remove when seen twice, violating constant space constraint.'
    },
    optimal: {
      name: 'XOR Bitwise Self-Cancellation',
      code: `function singleNumber(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'XOR has commutative and associative properties with self-inversion: a ^ a = 0 and a ^ 0 = a. Taking the cumulative XOR across all elements cancels out all duplicate pairs, leaving only the unique number in O(1) space.',
      whyOptimalIsPreferred: 'Meets the strict O(1) extra space requirement specified in the problem statement without any data structure allocations.',
      patternInvariant: 'XOR identity: duplicate numbers cancel each other out (x ^ x = 0), leaving only the odd-count element.'
    },
    defaultInputDescription: 'nums = [4, 1, 2, 1, 2]'
  },
  {
    id: 137,
    slug: 'single-number-ii',
    title: 'Single Number II',
    difficulty: 'Medium',
    pattern: 'bit-manipulation',
    category: 'Bit Manipulation',
    statement: 'Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    examples: [
      {
        input: 'nums = [2,2,3,2]',
        output: '3'
      },
      {
        input: 'nums = [0,1,0,1,0,1,99]',
        output: '99'
      }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-2^31 <= nums[i] <= 2^31 - 1',
      'Each element in nums appears exactly three times except for one element which appears once.'
    ],
    bruteForce: {
      name: 'Frequency Hash Map Counter',
      code: `function singleNumberIIBrute(nums: number[]): number {
  const counts = new Map<number, number>();
  for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);
  for (const [k, v] of counts) if (v === 1) return k;
  return -1;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      },
      explanation: 'Counts frequencies of all numbers in a Hash Map and returns the key with count == 1.'
    },
    optimal: {
      name: 'Digital Logic Finite State Counter (Ones and Twos)',
      code: `function singleNumber(nums: number[]): number {
  let ones = 0;
  let twos = 0;

  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }

  return ones;
}`,
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      },
      explanation: 'Implement a modulo-3 counter for each bit position using two bitboards ones and twos: state transitions from 0 -> 1 -> 2 -> 0. After processing all numbers, bits that appeared 3 times reset to 0, and bits that appeared once remain in ones.',
      whyOptimalIsPreferred: 'Linear O(N) execution that satisfies the strict O(1) space constraint without allocating frequency maps.',
      patternInvariant: 'Modulo-3 bit state machine: track bits appearing 1 time vs 2 times; on 3rd occurrence both reset to 0.'
    },
    defaultInputDescription: 'nums = [0, 1, 0, 1, 0, 1, 99]'
  },
  {
    id: 201,
    slug: 'bitwise-and-of-numbers-range',
    title: 'Bitwise AND of Numbers Range',
    difficulty: 'Medium',
    pattern: 'bit-manipulation',
    category: 'Bit Manipulation',
    statement: 'Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.',
    examples: [
      {
        input: 'left = 5, right = 7',
        output: '4'
      },
      {
        input: 'left = 0, right = 0',
        output: '0'
      },
      {
        input: 'left = 1, right = 2147483647',
        output: '0'
      }
    ],
    constraints: [
      '0 <= left <= right <= 2^31 - 1'
    ],
    bruteForce: {
      name: 'Iterative Range Bitwise AND',
      code: `function rangeBitwiseAndBrute(left: number, right: number): number {
  let res = left;
  for (let i = left + 1; i <= right; i++) {
    res &= i;
    if (res === 0) break;
  }
  return res;
}`,
      complexity: {
        time: 'O(right - left)',
        space: 'O(1)'
      },
      explanation: 'Iterates sequentially through all integers in range [left, right] applying bitwise AND.'
    },
    optimal: {
      name: 'Common Binary Prefix Bit Shift',
      code: `function rangeBitwiseAnd(left: number, right: number): number {
  let shiftCount = 0;

  // Shift right until left and right coincide at common prefix
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shiftCount++;
  }

  return left << shiftCount;
}`,
      complexity: {
        time: 'O(1) (at most 32 shifts)',
        space: 'O(1)'
      },
      explanation: 'Any bit position that changes between left and right will experience a 0 at least once in the range, causing that bit to become 0 in the final bitwise AND. The answer is simply the longest common binary prefix of left and right padded with trailing zeros.',
      whyOptimalIsPreferred: 'Completes in at most 32 operations in O(1) time, avoiding up to 2^31 iterations in large ranges.',
      patternInvariant: 'Bitwise AND over consecutive integers preserves only the shared most significant prefix; changing lower bits all resolve to zero.'
    },
    defaultInputDescription: 'left = 5, right = 7'
  }
];
