import type { VisualizerStep } from '../../types/visualizer';

/**
 * 1. Two Sum Simulation (Problem 1)
 */
export function simulateTwoSum(nums: number[], target: number): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const map = new Map<number, number>();

  steps.push({
    stepIndex: 0,
    title: 'Initialize Hash Map for Two Sum',
    description: `Target sum is ${target}. Starting with empty hash map. We will check for complement (target - nums[i]) at each element.`,
    codeLineHighlight: 2,
    variables: { target, arrayLength: nums.length, mapSize: 0 },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
    },
    hashMapState: { entries: [] },
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const complement = target - val;
    const hasComplement = map.has(complement);

    steps.push({
      stepIndex: steps.length,
      title: `Inspect Element nums[${i}] = ${val}`,
      description: `Need complement ${target} - ${val} = ${complement}. Checking if ${complement} is in the hash map.`,
      codeLineHighlight: 4,
      variables: { i, 'nums[i]': val, complement, foundInMap: hasComplement },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx === i ? 'active' : map.has(v) ? 'visited' : 'default',
        })),
        pointers: [{ label: 'i', index: i, color: '#38bdf8' }],
      },
      hashMapState: {
        entries: Array.from(map.entries()).map(([k, v]) => ({
          key: k,
          value: v,
          status: k === complement ? 'accessed' : 'default',
        })),
      },
    });

    if (hasComplement) {
      const matchIdx = map.get(complement)!;
      steps.push({
        stepIndex: steps.length,
        title: `Pair Found! nums[${matchIdx}] + nums[${i}] = ${target}`,
        description: `Found complement ${complement} at index ${matchIdx}! The two indices adding up to ${target} are [${matchIdx}, ${i}].`,
        codeLineHighlight: 6,
        variables: { index1: matchIdx, index2: i, sum: target, result: `[${matchIdx}, ${i}]` },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx === matchIdx || idx === i ? 'matched' : 'default',
          })),
          pointers: [
            { label: 'ans1', index: matchIdx, color: '#34d399' },
            { label: 'ans2', index: i, color: '#34d399' },
          ],
        },
        hashMapState: {
          entries: Array.from(map.entries()).map(([k, v]) => ({
            key: k,
            value: v,
            status: k === complement ? 'accessed' : 'default',
          })),
        },
      });
      return steps;
    }

    map.set(val, i);
    steps.push({
      stepIndex: steps.length,
      title: `Store in Map: ${val} -> Index ${i}`,
      description: `${complement} was not in map yet. Recording key ${val} with index ${i} for future lookups.`,
      codeLineHighlight: 8,
      variables: { insertedKey: val, insertedValue: i, mapSize: map.size },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx <= i ? 'visited' : 'default',
        })),
        pointers: [{ label: 'i', index: i, color: '#38bdf8' }],
      },
      hashMapState: {
        entries: Array.from(map.entries()).map(([k, v]) => ({
          key: k,
          value: v,
          status: k === val ? 'inserted' : 'default',
        })),
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: 'Scan Complete — No Valid Pair Found',
    description: `Traversed entire array. No two elements sum to target ${target}.`,
    codeLineHighlight: 10,
    variables: { result: 'None', target },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'eliminated' })),
    },
    hashMapState: {
      entries: Array.from(map.entries()).map(([k, v]) => ({
        key: k,
        value: v,
        status: 'default',
      })),
    },
  });

  return steps;
}

/**
 * 2. Valid Palindrome Simulation (Problem 125)
 */
export function simulateValidPalindrome(rawStr: string): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const s = rawStr.toLowerCase().replace(/[^a-z0-9]/g, '');
  const chars = s.split('');

  if (chars.length === 0) {
    return [
      {
        stepIndex: 0,
        title: 'Empty Filtered String',
        description: 'An empty string is trivially a valid palindrome.',
        variables: { isValid: true },
        arrayState: { elements: [{ value: '∅', status: 'matched' }] },
      },
    ];
  }

  let left = 0;
  let right = chars.length - 1;

  steps.push({
    stepIndex: 0,
    title: 'Initialize Two Pointers at String Boundaries',
    description: `Filtered alphanumeric string: "${s}" (length ${chars.length}). Left pointer at 0, Right pointer at ${right}.`,
    codeLineHighlight: 2,
    variables: { left, right, leftChar: chars[left], rightChar: chars[right] },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'default' })),
      pointers: [
        { label: 'L', index: left, color: '#38bdf8' },
        { label: 'R', index: right, color: '#a78bfa' },
      ],
    },
  });

  while (left < right) {
    const match = chars[left] === chars[right];

    steps.push({
      stepIndex: steps.length,
      title: `Compare s[${left}] ('${chars[left]}') with s[${right}] ('${chars[right]}')`,
      description: match
        ? `Characters match! Both are '${chars[left]}'. Invariant holds. Advancing left and decrementing right.`
        : `Mismatch! '${chars[left]}' !== '${chars[right]}'. String is NOT a palindrome.`,
      codeLineHighlight: 4,
      variables: { left, right, charL: chars[left], charR: chars[right], match },
      arrayState: {
        elements: chars.map((c, idx) => ({
          value: c,
          status: idx === left || idx === right ? (match ? 'comparing' : 'eliminated') : (idx < left || idx > right ? 'matched' : 'default'),
        })),
        pointers: [
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#a78bfa' },
        ],
      },
    });

    if (!match) {
      steps.push({
        stepIndex: steps.length,
        title: 'Result: Not a Valid Palindrome',
        description: `Encountered mismatched characters at index ${left} ('${chars[left]}') and ${right} ('${chars[right]}'). Returning false.`,
        codeLineHighlight: 6,
        variables: { isValid: false, failedAt: `indices ${left} and ${right}` },
        arrayState: {
          elements: chars.map((c, idx) => ({
            value: c,
            status: idx === left || idx === right ? 'eliminated' : 'default',
          })),
        },
      });
      return steps;
    }

    left++;
    right--;
  }

  steps.push({
    stepIndex: steps.length,
    title: 'Result: String is a Valid Palindrome!',
    description: 'Pointers crossed successfully. Every symmetric character pair was identical. Returning true.',
    codeLineHighlight: 8,
    variables: { isValid: true, length: chars.length },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'matched' })),
    },
  });

  return steps;
}

/**
 * 3. Container With Most Water (Problem 11)
 */
export function simulateContainerWithMostWater(heights: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;
  let bestLeft = 0;
  let bestRight = right;

  steps.push({
    stepIndex: 0,
    title: 'Initialize Two Pointers at Widest Boundary',
    description: `Array of ${heights.length} vertical heights. Left pointer at index 0, Right pointer at index ${right}. Max area initialized to 0.`,
    codeLineHighlight: 2,
    variables: { left, right, maxArea: 0 },
    arrayState: {
      elements: heights.map((h) => ({ value: h, status: 'default' })),
      pointers: [
        { label: 'L', index: left, color: '#38bdf8' },
        { label: 'R', index: right, color: '#a78bfa' },
      ],
    },
  });

  while (left < right) {
    const width = right - left;
    const hL = heights[left];
    const hR = heights[right];
    const currentHeight = Math.min(hL, hR);
    const area = width * currentHeight;
    const isNewMax = area > maxArea;

    if (isNewMax) {
      maxArea = area;
      bestLeft = left;
      bestRight = right;
    }

    steps.push({
      stepIndex: steps.length,
      title: `Compute Water Area: ${width} × min(${hL}, ${hR}) = ${area}`,
      description: `Width = ${width}, Limiting Height = min(${hL}, ${hR}) = ${currentHeight}. Water Area = ${area}.${
        isNewMax ? ` New maximum area found: ${maxArea}!` : ` Does not exceed current max (${maxArea}).`
      }`,
      codeLineHighlight: 4,
      variables: { left, right, width, heightL: hL, heightR: hR, area, maxArea },
      arrayState: {
        elements: heights.map((h, idx) => ({
          value: h,
          status: idx === left || idx === right ? 'active' : (idx > left && idx < right ? 'comparing' : 'default'),
        })),
        pointers: [
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#a78bfa' },
        ],
        window: { left, right },
      },
    });

    if (hL < hR) {
      left++;
    } else {
      right--;
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `Max Water Container Found: ${maxArea}`,
    description: `Optimal container bounded by indices [${bestLeft}, ${bestRight}] with heights ${heights[bestLeft]} and ${heights[bestRight]}. Max capacity is ${maxArea}.`,
    codeLineHighlight: 8,
    variables: { maxArea, bestLeft, bestRight },
    arrayState: {
      elements: heights.map((h, idx) => ({
        value: h,
        status: idx === bestLeft || idx === bestRight ? 'matched' : (idx > bestLeft && idx < bestRight ? 'active' : 'default'),
      })),
      pointers: [
        { label: 'Best L', index: bestLeft, color: '#34d399' },
        { label: 'Best R', index: bestRight, color: '#34d399' },
      ],
      window: { left: bestLeft, right: bestRight },
    },
  });

  return steps;
}

/**
 * 4. Best Time to Buy and Sell Stock (Problem 121)
 */
export function simulateBestTimeStock(prices: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  let minPrice = prices[0];
  let minPriceIdx = 0;
  let maxProfit = 0;
  let bestBuyIdx = 0;
  let bestSellIdx = 0;

  steps.push({
    stepIndex: 0,
    title: 'Initialize Stock Scan on Day 0',
    description: `Starting price on Day 0 is $${prices[0]}. Initializing minPrice = $${prices[0]}, maxProfit = $0.`,
    codeLineHighlight: 2,
    variables: { day: 0, price: prices[0], minPrice, maxProfit: 0 },
    arrayState: {
      elements: prices.map((p) => ({ value: `$${p}`, status: 'default' })),
      pointers: [{ label: 'Buy(0)', index: 0, color: '#34d399' }],
    },
  });

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    const profitIfSoldToday = currentPrice - minPrice;

    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      minPriceIdx = i;

      steps.push({
        stepIndex: steps.length,
        title: `Day ${i}: New Lowest Buying Price Found ($${currentPrice})`,
        description: `Current price $${currentPrice} is lower than prior minimum. Updated lowest buying price to $${currentPrice} at Day ${i}.`,
        codeLineHighlight: 4,
        variables: { day: i, currentPrice, newMinPrice: minPrice, maxProfit },
        arrayState: {
          elements: prices.map((p, idx) => ({
            value: `$${p}`,
            status: idx === i ? 'active' : (idx === bestBuyIdx ? 'matched' : 'default'),
          })),
          pointers: [
            { label: 'Min Buy', index: minPriceIdx, color: '#34d399' },
            { label: 'Day i', index: i, color: '#38bdf8' },
          ],
        },
      });
    } else {
      const isNewMaxProfit = profitIfSoldToday > maxProfit;
      if (isNewMaxProfit) {
        maxProfit = profitIfSoldToday;
        bestBuyIdx = minPriceIdx;
        bestSellIdx = i;
      }

      steps.push({
        stepIndex: steps.length,
        title: `Day ${i}: Evaluate Sell at $${currentPrice} (Profit: $${profitIfSoldToday})`,
        description: `Selling on Day ${i} at $${currentPrice} bought at $${minPrice} yields profit of $${profitIfSoldToday}.${
          isNewMaxProfit ? ` New peak profit record: $${maxProfit}!` : ` Lower than best profit ($${maxProfit}).`
        }`,
        codeLineHighlight: 6,
        variables: { day: i, sellPrice: currentPrice, buyPrice: minPrice, profitIfSoldToday, maxProfit },
        arrayState: {
          elements: prices.map((p, idx) => ({
            value: `$${p}`,
            status: idx === minPriceIdx ? 'matched' : idx === i ? (isNewMaxProfit ? 'active' : 'comparing') : 'default',
          })),
          pointers: [
            { label: 'Buy', index: minPriceIdx, color: '#34d399' },
            { label: 'Sell', index: i, color: '#fbbf24' },
          ],
        },
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `Optimal Transaction: Buy Day ${bestBuyIdx} ($${prices[bestBuyIdx]}), Sell Day ${bestSellIdx} ($${prices[bestSellIdx]})`,
    description: `Maximum possible profit is $${maxProfit}. Achieved by buying on Day ${bestBuyIdx} and selling on Day ${bestSellIdx}.`,
    codeLineHighlight: 8,
    variables: { maxProfit, buyDay: bestBuyIdx, sellDay: bestSellIdx },
    arrayState: {
      elements: prices.map((p, idx) => ({
        value: `$${p}`,
        status: idx === bestBuyIdx || idx === bestSellIdx ? 'matched' : 'default',
      })),
      pointers: [
        { label: 'Buy', index: bestBuyIdx, color: '#34d399' },
        { label: 'Sell', index: bestSellIdx, color: '#fbbf24' },
      ],
    },
  });

  return steps;
}

/**
 * 5. Binary Search Simulation (Problem 704, 35, 33, 74, 162)
 */
export function simulateBinarySearch(rawNums: number[], target: number): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const nums = [...rawNums].sort((a, b) => a - b);
  let low = 0;
  let high = nums.length - 1;

  steps.push({
    stepIndex: 0,
    title: `Initialize Binary Search for Target ${target}`,
    description: `Searching sorted array of ${nums.length} elements. Search space is [0, ${high}].`,
    codeLineHighlight: 2,
    variables: { low, high, target },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
      pointers: [
        { label: 'L', index: low, color: '#38bdf8' },
        { label: 'R', index: high, color: '#a78bfa' },
      ],
      window: { left: low, right: high },
    },
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = nums[mid];

    steps.push({
      stepIndex: steps.length,
      title: `Inspect Middle Element nums[${mid}] = ${midVal}`,
      description: `Midpoint index = floor((${low} + ${high}) / 2) = ${mid}. Comparing nums[${mid}] (${midVal}) with target ${target}.`,
      codeLineHighlight: 4,
      variables: { low, mid, high, midValue: midVal, target },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx === mid ? 'active' : (idx >= low && idx <= high ? 'comparing' : 'eliminated'),
        })),
        pointers: [
          { label: 'L', index: low, color: '#38bdf8' },
          { label: 'Mid', index: mid, color: '#fbbf24' },
          { label: 'R', index: high, color: '#a78bfa' },
        ],
        window: { left: low, right: high },
      },
    });

    if (midVal === target) {
      steps.push({
        stepIndex: steps.length,
        title: `Target Found at Index ${mid}!`,
        description: `nums[${mid}] == ${target}. Target located successfully in O(log n) time.`,
        codeLineHighlight: 6,
        variables: { foundIndex: mid, target, iterations: steps.length },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx === mid ? 'matched' : 'default',
          })),
          pointers: [{ label: 'Target', index: mid, color: '#34d399' }],
        },
      });
      return steps;
    }

    if (midVal < target) {
      steps.push({
        stepIndex: steps.length,
        title: `nums[${mid}] (${midVal}) < ${target} — Discard Left Half`,
        description: `Since array is sorted, target cannot exist in [${low}..${mid}]. Shifting search space to [${mid + 1}..${high}].`,
        codeLineHighlight: 8,
        variables: { newLow: mid + 1, high, target },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx <= mid ? 'eliminated' : (idx <= high ? 'default' : 'eliminated'),
          })),
          pointers: [
            { label: 'L', index: mid + 1, color: '#38bdf8' },
            { label: 'R', index: high, color: '#a78bfa' },
          ],
        },
      });
      low = mid + 1;
    } else {
      steps.push({
        stepIndex: steps.length,
        title: `nums[${mid}] (${midVal}) > ${target} — Discard Right Half`,
        description: `Since array is sorted, target cannot exist in [${mid}..${high}]. Shifting search space to [${low}..${mid - 1}].`,
        codeLineHighlight: 10,
        variables: { low, newHigh: mid - 1, target },
        arrayState: {
          elements: nums.map((v, idx) => ({
            value: v,
            status: idx >= mid ? 'eliminated' : (idx >= low ? 'default' : 'eliminated'),
          })),
          pointers: [
            { label: 'L', index: low, color: '#38bdf8' },
            { label: 'R', index: mid - 1, color: '#a78bfa' },
          ],
        },
      });
      high = mid - 1;
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: 'Search Complete — Target Not in Array',
    description: `Pointers crossed (low ${low} > high ${high}). Target ${target} does not exist in array. Insertion index would be ${low}.`,
    codeLineHighlight: 12,
    variables: { result: -1, insertPosition: low, target },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'eliminated' })),
    },
  });

  return steps;
}

/**
 * 6. Valid Parentheses Simulation (Problem 20)
 */
export function simulateValidParentheses(rawStr: string): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const s = rawStr.replace(/\s+/g, '');
  const chars = s.split('');
  const stack: string[] = [];
  const matching: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  steps.push({
    stepIndex: 0,
    title: 'Initialize Stack for Bracket Validation',
    description: `Input expression: "${s}". Stack initialized empty. Opening brackets will be pushed; closing brackets must match top.`,
    codeLineHighlight: 2,
    variables: { inputLength: chars.length, stackSize: 0 },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'default' })),
    },
    stackQueueState: { type: 'stack', items: [] },
  });

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const isOpening = char === '(' || char === '[' || char === '{';

    if (isOpening) {
      stack.push(char);
      steps.push({
        stepIndex: steps.length,
        title: `Index ${i}: Push '${char}' onto Stack`,
        description: `Encountered opening bracket '${char}'. Pushed onto stack. Stack depth is now ${stack.length}.`,
        codeLineHighlight: 4,
        variables: { index: i, char, action: 'push', stackDepth: stack.length },
        arrayState: {
          elements: chars.map((c, idx) => ({
            value: c,
            status: idx === i ? 'active' : (idx < i ? 'visited' : 'default'),
          })),
          pointers: [{ label: 'i', index: i, color: '#38bdf8' }],
        },
        stackQueueState: {
          type: 'stack',
          items: stack.map((item, idx) => ({
            value: item,
            status: idx === stack.length - 1 ? 'pushed' : 'default',
          })),
        },
      });
    } else {
      const top = stack.length > 0 ? stack[stack.length - 1] : null;
      const expected = matching[char];
      const match = top === expected;

      if (!match) {
        steps.push({
          stepIndex: steps.length,
          title: `Index ${i}: Mismatched Bracket '${char}'!`,
          description: top === null
            ? `Closing bracket '${char}' encountered, but stack is empty! Expression is invalid.`
            : `Closing bracket '${char}' does not match stack top '${top}' (expected '${expected}'). Expression is invalid.`,
          codeLineHighlight: 6,
          variables: { index: i, char, stackTop: top, isValid: false },
          arrayState: {
            elements: chars.map((c, idx) => ({
              value: c,
              status: idx === i ? 'eliminated' : 'default',
            })),
            pointers: [{ label: 'Error', index: i, color: '#ef4444' }],
          },
          stackQueueState: {
            type: 'stack',
            items: stack.map((item) => ({ value: item, status: 'default' })),
          },
        });
        return steps;
      }

      stack.pop();
      steps.push({
        stepIndex: steps.length,
        title: `Index ${i}: Matched '${expected}' with '${char}' — Pop from Stack`,
        description: `Closing bracket '${char}' matched stack top '${top}'. Popped matched pair. Stack depth is now ${stack.length}.`,
        codeLineHighlight: 8,
        variables: { index: i, matchedChar: char, popped: top, stackDepth: stack.length },
        arrayState: {
          elements: chars.map((c, idx) => ({
            value: c,
            status: idx === i ? 'matched' : (idx < i ? 'visited' : 'default'),
          })),
          pointers: [{ label: 'i', index: i, color: '#34d399' }],
        },
        stackQueueState: {
          type: 'stack',
          items: stack.map((item) => ({ value: item, status: 'default' })),
        },
      });
    }
  }

  const isValid = stack.length === 0;
  steps.push({
    stepIndex: steps.length,
    title: isValid ? 'Validation Successful: Valid Parentheses!' : 'Validation Failed: Unclosed Brackets on Stack',
    description: isValid
      ? 'All opening brackets were matched and closed in correct order. Stack is empty.'
      : `Scan ended, but ${stack.length} unmatched opening bracket(s) remain on stack. Expression is invalid.`,
    codeLineHighlight: 10,
    variables: { isValid, remainingInStack: stack.length },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: isValid ? 'matched' : 'eliminated' })),
    },
    stackQueueState: {
      type: 'stack',
      items: stack.map((item) => ({ value: item, status: 'default' })),
    },
  });

  return steps;
}

/**
 * 7. Kadane's Algorithm / Maximum Subarray (Problem 53, 918)
 */
export function simulateKadane(nums: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  let currentSum = nums[0];
  let maxSum = nums[0];
  let windowStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  steps.push({
    stepIndex: 0,
    title: 'Initialize Kadane Maximum Subarray Algorithm',
    description: `First element is ${nums[0]}. Initializing currentSum = ${nums[0]}, maxSum = ${nums[0]}.`,
    codeLineHighlight: 2,
    variables: { currentSum, maxSum, i: 0 },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
      pointers: [{ label: 'i', index: 0, color: '#38bdf8' }],
      window: { left: 0, right: 0 },
    },
  });

  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    const shouldReset = val > currentSum + val;

    if (shouldReset) {
      currentSum = val;
      windowStart = i;
    } else {
      currentSum += val;
    }

    const isNewMax = currentSum > maxSum;
    if (isNewMax) {
      maxSum = currentSum;
      bestStart = windowStart;
      bestEnd = i;
    }

    steps.push({
      stepIndex: steps.length,
      title: `Index ${i} (${val}): currentSum = ${currentSum}`,
      description: shouldReset
        ? `nums[${i}] (${val}) exceeds currentSum + nums[${i}] (${currentSum}). Resetting subarray window to start at ${i}.`
        : `Extending current subarray window [${windowStart}..${i}]. Cumulative sum is ${currentSum}.${
            isNewMax ? ` New maximum sum: ${maxSum}!` : ''
          }`,
      codeLineHighlight: 4,
      variables: { i, val, currentSum, maxSum, window: `[${windowStart}..${i}]` },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx >= windowStart && idx <= i ? (isNewMax ? 'matched' : 'active') : 'default',
        })),
        pointers: [
          { label: 'Start', index: windowStart, color: '#34d399' },
          { label: 'i', index: i, color: '#38bdf8' },
        ],
        window: { left: windowStart, right: i },
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Maximum Subarray Sum: ${maxSum}`,
    description: `Optimal contiguous subarray is [${bestStart}..${bestEnd}] with maximum sum = ${maxSum}.`,
    codeLineHighlight: 8,
    variables: { maxSum, bestStart, bestEnd },
    arrayState: {
      elements: nums.map((v, idx) => ({
        value: v,
        status: idx >= bestStart && idx <= bestEnd ? 'matched' : 'default',
      })),
      pointers: [
        { label: 'L', index: bestStart, color: '#34d399' },
        { label: 'R', index: bestEnd, color: '#34d399' },
      ],
      window: { left: bestStart, right: bestEnd },
    },
  });

  return steps;
}

/**
 * 8. 3Sum Simulation (Problem 15)
 */
export function simulateThreeSum(rawNums: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const nums = [...rawNums].sort((a, b) => a - b);
  const n = nums.length;
  const triplets: Array<[number, number, number]> = [];

  steps.push({
    stepIndex: 0,
    title: 'Sort Array and Initialize 3Sum Search',
    description: `Sorted array: [${nums.join(', ')}]. We fix pivot i, then use two pointers (left, right) to find pairs summing to -nums[i].`,
    codeLineHighlight: 2,
    variables: { arrayLength: n, sortedArray: `[${nums.join(', ')}]` },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
    },
  });

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = n - 1;

    steps.push({
      stepIndex: steps.length,
      title: `Fix Pivot nums[${i}] = ${nums[i]}`,
      description: `Target for two pointers is -(${nums[i]}) = ${-nums[i]}. Left pointer at ${left}, Right pointer at ${right}.`,
      codeLineHighlight: 4,
      variables: { pivotIndex: i, pivotValue: nums[i], targetPairSum: -nums[i], left, right },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx === i ? 'active' : (idx === left || idx === right ? 'comparing' : 'default'),
        })),
        pointers: [
          { label: 'Pivot', index: i, color: '#fbbf24' },
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#a78bfa' },
        ],
      },
    });

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        triplets.push([nums[i], nums[left], nums[right]]);
        steps.push({
          stepIndex: steps.length,
          title: `Triplet Found! [${nums[i]}, ${nums[left]}, ${nums[right]}] = 0`,
          description: `Sum of nums[${i}] + nums[${left}] + nums[${right}] == 0! Valid triplet recorded.`,
          codeLineHighlight: 6,
          variables: { triplet: `[${nums[i]}, ${nums[left]}, ${nums[right]}]`, totalTriplets: triplets.length },
          arrayState: {
            elements: nums.map((v, idx) => ({
              value: v,
              status: idx === i || idx === left || idx === right ? 'matched' : 'default',
            })),
            pointers: [
              { label: 'Pivot', index: i, color: '#fbbf24' },
              { label: 'L', index: left, color: '#34d399' },
              { label: 'R', index: right, color: '#34d399' },
            ],
          },
        });

        left++;
        right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        steps.push({
          stepIndex: steps.length,
          title: `Sum (${sum}) < 0 — Advance Left Pointer`,
          description: `nums[${i}] + nums[${left}] + nums[${right}] = ${sum} < 0. Need larger sum, moving left from ${left} to ${left + 1}.`,
          codeLineHighlight: 8,
          variables: { sum, left, right, action: 'left++' },
          arrayState: {
            elements: nums.map((v, idx) => ({
              value: v,
              status: idx === i ? 'active' : (idx === left || idx === right ? 'comparing' : 'default'),
            })),
            pointers: [
              { label: 'Pivot', index: i, color: '#fbbf24' },
              { label: 'L', index: left, color: '#38bdf8' },
              { label: 'R', index: right, color: '#a78bfa' },
            ],
          },
        });
        left++;
      } else {
        steps.push({
          stepIndex: steps.length,
          title: `Sum (${sum}) > 0 — Decrement Right Pointer`,
          description: `nums[${i}] + nums[${left}] + nums[${right}] = ${sum} > 0. Need smaller sum, moving right from ${right} to ${right - 1}.`,
          codeLineHighlight: 10,
          variables: { sum, left, right, action: 'right--' },
          arrayState: {
            elements: nums.map((v, idx) => ({
              value: v,
              status: idx === i ? 'active' : (idx === left || idx === right ? 'comparing' : 'default'),
            })),
            pointers: [
              { label: 'Pivot', index: i, color: '#fbbf24' },
              { label: 'L', index: left, color: '#38bdf8' },
              { label: 'R', index: right, color: '#a78bfa' },
            ],
          },
        });
        right--;
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    title: `3Sum Complete — Found ${triplets.length} Unique Triplet(s)`,
    description: triplets.length > 0
      ? `Identified all unique zero-sum triplets: ${triplets.map((t) => `[${t.join(', ')}]`).join(', ')}.`
      : 'No three elements sum to 0 in this array.',
    codeLineHighlight: 12,
    variables: { totalTriplets: triplets.length, result: JSON.stringify(triplets) },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: triplets.length > 0 ? 'matched' : 'eliminated' })),
    },
  });

  return steps;
}

/**
 * 9. Sliding Window - Longest Substring (Problem 3)
 */
export function simulateSlidingWindowSubstr(rawStr: string): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const s = rawStr.slice(0, 30);
  const chars = s.split('');
  const lastIndex = new Map<string, number>();
  let left = 0;
  let maxLen = 0;
  let bestStart = 0;
  let bestEnd = 0;

  steps.push({
    stepIndex: 0,
    title: 'Initialize Sliding Window on String',
    description: `Input string: "${s}" (length ${chars.length}). Window [left, right] starts at [0, 0].`,
    codeLineHighlight: 2,
    variables: { left: 0, right: 0, maxLen: 0 },
    arrayState: {
      elements: chars.map((c) => ({ value: c, status: 'default' })),
      pointers: [{ label: 'L,R', index: 0, color: '#38bdf8' }],
      window: { left: 0, right: 0 },
    },
    hashMapState: { entries: [] },
  });

  for (let right = 0; right < chars.length; right++) {
    const char = chars[right];
    const prevIdx = lastIndex.get(char);
    const isDuplicateInWindow = prevIdx !== undefined && prevIdx >= left;

    if (isDuplicateInWindow) {
      left = prevIdx + 1;
      steps.push({
        stepIndex: steps.length,
        title: `Duplicate '${char}' at Index ${right}! Shrink Left to ${left}`,
        description: `'${char}' was previously seen at index ${prevIdx} within current window. Shifting left pointer to ${left} to restore unique invariant.`,
        codeLineHighlight: 4,
        variables: { right, char, prevIdx, newLeft: left, currentWindowSize: right - left + 1 },
        arrayState: {
          elements: chars.map((c, idx) => ({
            value: c,
            status: idx === right || idx === prevIdx ? 'active' : (idx >= left && idx <= right ? 'comparing' : 'default'),
          })),
          pointers: [
            { label: 'L', index: left, color: '#38bdf8' },
            { label: 'R', index: right, color: '#fbbf24' },
          ],
          window: { left, right },
        },
        hashMapState: {
          entries: Array.from(lastIndex.entries()).map(([k, v]) => ({
            key: k,
            value: v,
            status: k === char ? 'accessed' : 'default',
          })),
        },
      });
    }

    lastIndex.set(char, right);
    const currentLen = right - left + 1;
    const isNewMax = currentLen > maxLen;
    if (isNewMax) {
      maxLen = currentLen;
      bestStart = left;
      bestEnd = right;
    }

    steps.push({
      stepIndex: steps.length,
      title: `Expand Window [${left}..${right}] — Substring: "${s.slice(left, right + 1)}"`,
      description: `Current window length is ${currentLen}.${isNewMax ? ` New maximum length: ${maxLen}!` : ` Max remains ${maxLen}.`}`,
      codeLineHighlight: 6,
      variables: { left, right, currentLen, maxLen, activeSubstring: `"${s.slice(left, right + 1)}"` },
      arrayState: {
        elements: chars.map((c, idx) => ({
          value: c,
          status: idx >= left && idx <= right ? (isNewMax ? 'matched' : 'active') : 'default',
        })),
        pointers: [
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#a78bfa' },
        ],
        window: { left, right },
      },
      hashMapState: {
        entries: Array.from(lastIndex.entries()).map(([k, v]) => ({
          key: k,
          value: v,
          status: k === char ? 'inserted' : 'default',
        })),
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Longest Unique Substring Found: Length ${maxLen}`,
    description: `Optimal non-repeating substring is "${s.slice(bestStart, bestEnd + 1)}" (indices [${bestStart}..${bestEnd}]).`,
    codeLineHighlight: 8,
    variables: { maxLen, substring: `"${s.slice(bestStart, bestEnd + 1)}"` },
    arrayState: {
      elements: chars.map((c, idx) => ({
        value: c,
        status: idx >= bestStart && idx <= bestEnd ? 'matched' : 'default',
      })),
      pointers: [
        { label: 'Best L', index: bestStart, color: '#34d399' },
        { label: 'Best R', index: bestEnd, color: '#34d399' },
      ],
      window: { left: bestStart, right: bestEnd },
    },
  });

  return steps;
}

/**
 * 10. Reverse Linked List Simulation (Problem 206)
 */
export function simulateReverseLinkedList(values: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const nodes = values.map((val, idx) => ({
    id: `node-${idx}`,
    value: val,
    nextId: idx < values.length - 1 ? `node-${idx + 1}` : null,
  }));

  steps.push({
    stepIndex: 0,
    title: 'Initialize Three Pointers: prev = null, curr = head',
    description: `Linked list with ${values.length} nodes: ${values.join(' -> ')} -> null. prev initialized to null, curr at head.`,
    codeLineHighlight: 2,
    variables: { prev: 'null', curr: values[0] ?? 'null' },
    linkedListState: {
      nodes: nodes.map((n, idx) => ({
        id: n.id,
        value: n.value,
        status: idx === 0 ? 'curr' : 'default',
        nextId: n.nextId,
      })),
    },
  });

  for (let i = 0; i < values.length; i++) {
    const currVal = values[i];
    const prevVal = i > 0 ? values[i - 1] : 'null';
    const nextVal = i < values.length - 1 ? values[i + 1] : 'null';

    steps.push({
      stepIndex: steps.length,
      title: `Node ${currVal}: Reverse Pointer to Point to ${prevVal}`,
      description: `Save next = curr.next (${nextVal}). Reverse curr.next = prev (${prevVal}). Advance prev to curr, curr to next.`,
      codeLineHighlight: 4,
      variables: { curr: currVal, prev: prevVal, next: nextVal },
      linkedListState: {
        nodes: nodes.map((n, idx) => ({
          id: n.id,
          value: n.value,
          status: idx === i ? 'curr' : (idx === i - 1 ? 'prev' : idx === i + 1 ? 'next' : idx < i ? 'visited' : 'default'),
          nextId: idx === 0 ? null : idx <= i ? `node-${idx - 1}` : (idx < values.length - 1 ? `node-${idx + 1}` : null),
        })),
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: 'List Reversal Complete — New Head is ' + values[values.length - 1],
    description: `All next pointers successfully inverted. New list order: ${[...values].reverse().join(' -> ')} -> null.`,
    codeLineHighlight: 8,
    variables: { newHead: values[values.length - 1], originalHead: values[0] },
    linkedListState: {
      nodes: nodes.map((n, idx) => ({
        id: n.id,
        value: n.value,
        status: 'visited',
        nextId: idx === 0 ? null : `node-${idx - 1}`,
      })),
    },
  });

  return steps;
}

/**
 * 11. 1D DP Climbing Stairs Simulation (Problem 70)
 */
export function simulateClimbingStairs(nInput: number): VisualizerStep[] {
  const n = Math.max(1, Math.min(nInput, 20));
  const steps: VisualizerStep[] = [];
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  steps.push({
    stepIndex: 0,
    title: 'Initialize DP Table for Climbing Stairs (n = ' + n + ')',
    description: `Base cases: dp[0] = 1 (ground), dp[1] = 1 (1 step). Invariant: dp[i] = dp[i-1] + dp[i-2].`,
    codeLineHighlight: 2,
    variables: { n, 'dp[0]': 1, 'dp[1]': 1 },
    dpTableState: {
      dimensions: '1D',
      values: [...dp],
      activeCell: 1,
      formula: 'dp[0]=1, dp[1]=1',
    },
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      stepIndex: steps.length,
      title: `Compute Step ${i}: dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}`,
      description: `To reach step ${i}, we can take a 1-step leap from step ${i - 1} or a 2-step leap from step ${i - 2}. Total distinct ways = ${dp[i]}.`,
      codeLineHighlight: 4,
      variables: { i, 'dp[i-1]': dp[i - 1], 'dp[i-2]': dp[i - 2], 'dp[i]': dp[i] },
      dpTableState: {
        dimensions: '1D',
        values: [...dp],
        activeCell: i,
        formula: `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      },
    });
  }

  steps.push({
    stepIndex: steps.length,
    title: `Result: ${dp[n]} Distinct Ways to Climb ${n} Stairs`,
    description: `Final answer stored at dp[${n}] = ${dp[n]}. Computed in O(n) time and O(n) space.`,
    codeLineHighlight: 6,
    variables: { answer: dp[n], n },
    dpTableState: {
      dimensions: '1D',
      values: [...dp],
      activeCell: n,
      formula: `Answer = dp[${n}] = ${dp[n]}`,
    },
  });

  return steps;
}

/**
 * 12. Universal Array Simulator (Fallback for ANY Array / Two Pointers problem)
 */
export function simulateUniversalArray(nums: number[], target?: number): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const n = nums.length;
  let left = 0;
  let right = n - 1;

  steps.push({
    stepIndex: 0,
    title: 'Initialize Array Algorithm Simulation',
    description: `Loaded array with ${n} elements. Initializing pointers at opposite ends.`,
    codeLineHighlight: 2,
    variables: { length: n, left, right, target: target ?? 'N/A' },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'default' })),
      pointers: [
        { label: 'L', index: left, color: '#38bdf8' },
        { label: 'R', index: right, color: '#a78bfa' },
      ],
    },
  });

  while (left <= right) {
    const valL = nums[left];
    const valR = nums[right];

    steps.push({
      stepIndex: steps.length,
      title: `Step ${steps.length}: Evaluate Elements at L=${left} (${valL}), R=${right} (${valR})`,
      description: `Examining pair [${valL}, ${valR}]. Maintaining algorithmic loop invariant.`,
      codeLineHighlight: 4,
      variables: { left, right, valueL: valL, valueR: valR },
      arrayState: {
        elements: nums.map((v, idx) => ({
          value: v,
          status: idx === left || idx === right ? 'active' : (idx < left || idx > right ? 'visited' : 'default'),
        })),
        pointers: [
          { label: 'L', index: left, color: '#38bdf8' },
          { label: 'R', index: right, color: '#a78bfa' },
        ],
        window: { left, right },
      },
    });

    left++;
    right--;
  }

  steps.push({
    stepIndex: steps.length,
    title: 'Algorithm Simulation Complete',
    description: `All ${n} elements processed across bounds. Final state confirmed.`,
    codeLineHighlight: 8,
    variables: { status: 'complete', processedElements: n },
    arrayState: {
      elements: nums.map((v) => ({ value: v, status: 'matched' })),
    },
  });

  return steps;
}
