import type { LeetCodeProblem } from '../../types/problem';

export const graphBfsProblems: LeetCodeProblem[] = [
  {
    id: 909,
    slug: 'snakes-and-ladders',
    title: 'Snakes and Ladders',
    difficulty: 'Medium',
    pattern: 'graph-bfs',
    category: 'Graph BFS',
    statement: 'You are given an n x n integer matrix board where the cells are labeled from 1 to n^2 in a Boustrophedon style starting from the bottom left of the board. You start on square 1. In each move, choose a destination square next with a label in the range [curr + 1, min(curr + 6, n^2)]. If next has a snake or ladder, you must move to the destination of that snake or ladder. Return the least number of moves required to reach square n^2. If it is not possible, return -1.',
    examples: [
      {
        input: 'board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]',
        output: '4',
        explanation: 'In the beginning, you start at square 1. Move to square 2 and take ladder to 15. Then move to 17 and take snake to 13. Then move to 14 and take ladder to 35. Then move to 36 (game complete) in 4 moves.'
      },
      {
        input: 'board = [[-1,-1],[-1,3]]',
        output: '1'
      }
    ],
    constraints: [
      'n == board.length == board[i].length',
      '2 <= n <= 20',
      'board[i][j] is either -1 or in the range [1, n^2].',
      'The squares labeled 1 and n^2 do not have any ladders or snakes.'
    ],
    bruteForce: {
      name: 'Recursive DFS with Path Pruning',
      code: `function snakesAndLaddersBrute(board: number[][]): number {
  const n = board.length;
  const target = n * n;
  let minMoves = Infinity;
  const visited = new Set<number>();

  function dfs(curr: number, moves: number) {
    if (moves >= minMoves) return;
    if (curr === target) { minMoves = Math.min(minMoves, moves); return; }
    visited.add(curr);

    for (let dice = 1; dice <= 6; dice++) {
      let next = curr + dice;
      if (next > target) break;
      const r = Math.floor((next - 1) / n);
      const row = n - 1 - r;
      const col = (r % 2 === 0) ? (next - 1) % n : n - 1 - ((next - 1) % n);
      if (board[row][col] !== -1) next = board[row][col];
      if (!visited.has(next)) dfs(next, moves + 1);
    }
    visited.delete(curr);
  }

  dfs(1, 0);
  return minMoves === Infinity ? -1 : minMoves;
}`,
      complexity: {
        time: 'O(6^(N^2))',
        space: 'O(N^2)'
      },
      explanation: 'Depth-first search exploring all branch combinations of 6 die rolls, which can revisit states exponentially.'
    },
    optimal: {
      name: 'Unweighted Shortest Path BFS Queue',
      code: `function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const target = n * n;

  function getCoords(square: number): [number, number] {
    const rowFromBottom = Math.floor((square - 1) / n);
    const r = n - 1 - rowFromBottom;
    const rem = (square - 1) % n;
    const c = (rowFromBottom % 2 === 0) ? rem : n - 1 - rem;
    return [r, c];
  }

  const queue: Array<[number, number]> = [[1, 0]];
  const visited = new Set<number>([1]);

  while (queue.length > 0) {
    const [curr, moves] = queue.shift()!;
    if (curr === target) return moves;

    for (let dice = 1; dice <= 6; dice++) {
      let next = curr + dice;
      if (next > target) break;

      const [r, c] = getCoords(next);
      if (board[r][c] !== -1) {
        next = board[r][c];
      }

      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, moves + 1]);
      }
    }
  }

  return -1;
}`,
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      },
      explanation: 'Model squares 1 to n^2 as graph vertices with directed edges of weight 1 for die rolls 1 to 6. BFS guarantees that the first time square n^2 is dequeued, it is along the strictly shortest path.',
      whyOptimalIsPreferred: 'Linear O(N^2) unweighted BFS traversal explores each square once, completely avoiding exponential DFS branching.',
      patternInvariant: 'BFS frontier expansion: in an unweighted graph, the first arrival at any state is guaranteed to be minimal distance.'
    },
    defaultInputDescription: 'board = 6x6 snakes and ladders grid'
  },
  {
    id: 433,
    slug: 'minimum-genetic-mutation',
    title: 'Minimum Genetic Mutation',
    difficulty: 'Medium',
    pattern: 'graph-bfs',
    category: 'Graph BFS',
    statement: 'A gene string can be represented by an 8-character long string, with choices from \'A\', \'C\', \'G\', and \'T\'. A genetic mutation occurs when one character changes in the gene string. Given two gene strings startGene and endGene and a gene bank bank, return the minimum number of mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1.',
    examples: [
      {
        input: 'startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]',
        output: '1'
      },
      {
        input: 'startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]',
        output: '2'
      }
    ],
    constraints: [
      'startGene.length == 8',
      'endGene.length == 8',
      '0 <= bank.length <= 10',
      'bank[i].length == 8',
      'startGene, endGene, and bank[i] consist of only [\'A\', \'C\', \'G\', \'T\'].'
    ],
    bruteForce: {
      name: 'Recursive DFS Path Traversal',
      code: `function minMutationBrute(startGene: string, endGene: string, bank: string[]): number {
  const bankSet = new Set(bank);
  if (!bankSet.has(endGene)) return -1;
  const visited = new Set<string>();
  let minMut = Infinity;

  function dfs(curr: string, count: number) {
    if (curr === endGene) { minMut = Math.min(minMut, count); return; }
    visited.add(curr);
    for (const b of bankSet) {
      if (!visited.has(b)) {
        let diff = 0;
        for (let i = 0; i < 8; i++) if (curr[i] !== b[i]) diff++;
        if (diff === 1) dfs(b, count + 1);
      }
    }
    visited.delete(curr);
  }
  dfs(startGene, 0);
  return minMut === Infinity ? -1 : minMut;
}`,
      complexity: {
        time: 'O(B!)',
        space: 'O(B)'
      },
      explanation: 'Recursively explores all permutations of mutations in the bank using DFS with backtracking.'
    },
    optimal: {
      name: 'Breadth-First Frontier Search',
      code: `function minMutation(startGene: string, endGene: string, bank: string[]): number {
  const bankSet = new Set<string>(bank);
  if (!bankSet.has(endGene)) return -1;

  const genes = ['A', 'C', 'G', 'T'];
  const queue: Array<[string, number]> = [[startGene, 0]];
  const visited = new Set<string>([startGene]);

  while (queue.length > 0) {
    const [current, steps] = queue.shift()!;
    if (current === endGene) return steps;

    for (let i = 0; i < 8; i++) {
      for (const char of genes) {
        if (char === current[i]) continue;
        const mutated = current.substring(0, i) + char + current.substring(i + 1);

        if (bankSet.has(mutated) && !visited.has(mutated)) {
          visited.add(mutated);
          queue.push([mutated, steps + 1]);
        }
      }
    }
  }

  return -1;
}`,
      complexity: {
        time: 'O(B * L * 4) = O(B)',
        space: 'O(B)'
      },
      explanation: 'Use BFS to find shortest mutation distance. At each step, generate all 8 * 3 = 24 single-character mutations. If in bank and unvisited, enqueue with steps + 1.',
      whyOptimalIsPreferred: 'BFS naturally discovers the shortest path on first encounter, exploring each valid bank state at most once.',
      patternInvariant: 'State space transition graph: edges exist between words with Hamming distance = 1; BFS finds shortest path.'
    },
    defaultInputDescription: 'startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA", "AACCGCTA", "AAACGGTA"]'
  },
  {
    id: 127,
    slug: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    pattern: 'graph-bfs',
    category: 'Graph BFS',
    statement: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter, and every si is in wordList. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.',
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5',
        explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.'
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: '0',
        explanation: 'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.'
      }
    ],
    constraints: [
      '1 <= beginWord.length <= 10',
      'endWord.length == beginWord.length',
      '1 <= wordList.length <= 5000',
      'wordList[i].length == beginWord.length',
      'beginWord, endWord, and wordList[i] consist of lowercase English letters.',
      'beginWord != endWord',
      'All the words in wordList are unique.'
    ],
    bruteForce: {
      name: 'Adjacency Matrix Graph Build & DFS',
      code: `function ladderLengthBrute(beginWord: string, endWord: string, wordList: string[]): number {
  const words = [beginWord, ...wordList];
  const n = words.length;
  const isNeighbor = (a: string, b: string) => {
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
    return diff === 1;
  };
  const visited = new Set<string>();
  let minLen = Infinity;

  function dfs(curr: string, len: number) {
    if (len >= minLen) return;
    if (curr === endWord) { minLen = Math.min(minLen, len); return; }
    visited.add(curr);
    for (const w of wordList) {
      if (!visited.has(w) && isNeighbor(curr, w)) dfs(w, len + 1);
    }
    visited.delete(curr);
  }

  dfs(beginWord, 1);
  return minLen === Infinity ? 0 : minLen;
}`,
      complexity: {
        time: 'O(N^2 * L + N!)',
        space: 'O(N)'
      },
      explanation: 'Builds full pairwise graph using O(N^2) comparisons and searches using recursive DFS with backtracking.'
    },
    optimal: {
      name: 'Bi-Directional / Single-Queue BFS with Word Deletion',
      code: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set<string>(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue: Array<[string, number]> = [[beginWord, 1]];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  while (queue.length > 0) {
    const [word, level] = queue.shift()!;
    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < 26; j++) {
        const char = alphabet[j];
        if (char === word[i]) continue;
        const neighbor = word.substring(0, i) + char + word.substring(i + 1);

        if (wordSet.has(neighbor)) {
          wordSet.delete(neighbor);
          queue.push([neighbor, level + 1]);
        }
      }
    }
  }

  return 0;
}`,
      complexity: {
        time: 'O(N * L * 26)',
        space: 'O(N * L)'
      },
      explanation: 'Use BFS. For each word, generate all 26 * L single-character variants and check presence in wordSet in O(1). Delete matched words from the set immediately to prevent revisits and eliminate explicit visited arrays.',
      whyOptimalIsPreferred: 'Linear in word set size O(N * L * 26) compared to quadratic graph construction O(N^2 * L); BFS guarantees minimal path length.',
      patternInvariant: 'Word deletion from hash set acts as instantaneous visited marking in BFS, guaranteeing shortest path with minimal memory.'
    },
    defaultInputDescription: 'beginWord = "hit", endWord = "cog", wordList = ["hot", "dot", "dog", "lot", "log", "cog"]'
  }
];
