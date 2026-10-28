import type { LeetCodeProblem } from '../../types/problem';

export const trieProblems: LeetCodeProblem[] = [
  {
    id: 208,
    slug: 'implement-trie-prefix-tree',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    pattern: 'trie',
    category: 'Trie',
    statement: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class: Trie() Initializes the trie object. void insert(String word) Inserts the string word into the trie. boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise. boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.',
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"], [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: '[null, null, true, false, true, null, true]',
        explanation: 'Trie trie = new Trie(); trie.insert("apple"); trie.search("apple"); // return True; trie.search("app"); // return False; trie.startsWith("app"); // return True; trie.insert("app"); trie.search("app"); // return True'
      }
    ],
    constraints: [
      '1 <= word.length, prefix.length <= 2000',
      'word and prefix consist only of lowercase English letters.',
      'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'
    ],
    bruteForce: {
      name: 'Set Storage and Linear Prefix Scan',
      code: `class TrieBrute {
  private words = new Set<string>();
  insert(word: string): void { this.words.add(word); }
  search(word: string): boolean { return this.words.has(word); }
  startsWith(prefix: string): boolean {
    for (const w of this.words) {
      if (w.startsWith(prefix)) return true;
    }
    return false;
  }
}`,
      complexity: {
        time: 'insert: O(1), search: O(1), startsWith: O(N * L)',
        space: 'O(N * L)'
      },
      explanation: 'Stores words in a Hash Set. Checking startsWith requires scanning every word in the dictionary.'
    },
    optimal: {
      name: '26-Branch Character Prefix Tree',
      code: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd: boolean = false;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}`,
      complexity: {
        time: 'O(L) for all operations',
        space: 'O(N * L)'
      },
      explanation: 'Each node branches across 26 lowercase English letters. Word insertion, exact search, and prefix testing all execute in O(L) time where L is word length, independent of dictionary size.',
      whyOptimalIsPreferred: 'Guarantees O(L) prefix querying regardless of how many words are stored, eliminating costly linear dictionary scans.',
      patternInvariant: 'Prefix tree sharing: words with common prefixes share common path nodes down from the root.'
    },
    defaultInputDescription: 'insert("apple"), search("apple"), search("app"), startsWith("app")'
  },
  {
    id: 211,
    slug: 'design-add-and-search-words-data-structure',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    pattern: 'trie',
    category: 'Trie',
    statement: 'Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class: WordDictionary() Initializes the object. void addWord(word) Adds word to the data structure, it can be matched later. bool search(word) Returns true if there is any string in the data structure that matches word where dots \'.\' may be matched with any letter.',
    examples: [
      {
        input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"], [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: '[null,null,null,null,false,true,true,true]',
        explanation: 'WordDictionary wordDictionary = new WordDictionary(); wordDictionary.addWord("bad"); wordDictionary.addWord("dad"); wordDictionary.addWord("mad"); wordDictionary.search("pad"); // return False; wordDictionary.search("bad"); // return True; wordDictionary.search(".ad"); // return True; wordDictionary.search("b.."); // return True'
      }
    ],
    constraints: [
      '1 <= word.length <= 25',
      'word in addWord consists of lowercase English letters.',
      'word in search consist of \'.\' or lowercase English letters.',
      'There will be at most 2 dots in word for search queries.',
      'At most 10^4 calls will be made to addWord and search.'
    ],
    bruteForce: {
      name: 'List of Words Regex Matching',
      code: `class WordDictionaryBrute {
  private words: string[] = [];
  addWord(word: string): void { this.words.push(word); }
  search(word: string): boolean {
    const re = new RegExp('^' + word + '$');
    return this.words.some(w => re.test(w));
  }
}`,
      complexity: {
        time: 'addWord: O(1), search: O(N * L)',
        space: 'O(N * L)'
      },
      explanation: 'Appends words to a list and evaluates dynamic regexes against all elements on search.'
    },
    optimal: {
      name: 'Trie with Wildcard DFS Backtracking',
      code: `class DictNode {
  children: Map<string, DictNode> = new Map();
  isEnd: boolean = false;
}

class WordDictionary {
  private root: DictNode = new DictNode();

  addWord(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new DictNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    function dfs(node: DictNode, index: number): boolean {
      if (index === word.length) return node.isEnd;

      const char = word[index];
      if (char === '.') {
        for (const child of node.children.values()) {
          if (dfs(child, index + 1)) return true;
        }
        return false;
      } else {
        if (!node.children.has(char)) return false;
        return dfs(node.children.get(char)!, index + 1);
      }
    }

    return dfs(this.root, 0);
  }
}`,
      complexity: {
        time: 'O(L) for normal characters, O(26^D) for D wildcards',
        space: 'O(total characters)'
      },
      explanation: 'Store words in a Trie. On search, regular characters traverse child pointers in O(1). When a wildcard \'.\' is encountered, branch recursively through all existing child branches.',
      whyOptimalIsPreferred: 'Direct O(L) search for non-wildcard queries and bounded branching only across valid prefix children rather than testing entire dictionaries.',
      patternInvariant: 'Wildcard expansion on a Trie prunes instantly when child pointers do not exist in the dictionary.'
    },
    defaultInputDescription: 'addWord("bad"), addWord("dad"), search(".ad"), search("b..")'
  },
  {
    id: 212,
    slug: 'word-search-ii',
    title: 'Word Search II',
    difficulty: 'Hard',
    pattern: 'trie',
    category: 'Trie',
    statement: 'Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.',
    examples: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]'
      },
      {
        input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
        output: '[]'
      }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 12',
      'board[i][j] is a lowercase English letter.',
      '1 <= words.length <= 3 * 10^4',
      '1 <= words[i].length <= 10',
      'words[i] consists of lowercase English letters.',
      'All the strings of words are unique.'
    ],
    bruteForce: {
      name: 'Repeated Word Search DFS for Every Word',
      code: `function findWordsBrute(board: string[][], words: string[]): string[] {
  const m = board.length, n = board[0].length;
  function exist(word: string): boolean {
    function dfs(r: number, c: number, k: number): boolean {
      if (k === word.length) return true;
      if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[k]) return false;
      const tmp = board[r][c];
      board[r][c] = '#';
      const found = dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1);
      board[r][c] = tmp;
      return found;
    }
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (dfs(r, c, 0)) return true;
      }
    }
    return false;
  }
  return words.filter(w => exist(w));
}`,
      complexity: {
        time: 'O(W * M * N * 4^L)',
        space: 'O(L)'
      },
      explanation: 'Runs a full 2D grid DFS search for each individual word in the dictionary independently.'
    },
    optimal: {
      name: 'Simultaneous Multi-Word Trie DFS with Node Pruning',
      code: `class TrieNodeWS {
  children: Map<string, TrieNodeWS> = new Map();
  word: string | null = null;
}

function findWords(board: string[][], words: string[]): string[] {
  const root = new TrieNodeWS();

  // Build Trie from word list
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNodeWS());
      }
      node = node.children.get(char)!;
    }
    node.word = word;
  }

  const result: string[] = [];
  const m = board.length;
  const n = board[0].length;

  function dfs(r: number, c: number, parent: TrieNodeWS) {
    const char = board[r][c];
    const currNode = parent.children.get(char);
    if (!currNode) return;

    if (currNode.word !== null) {
      result.push(currNode.word);
      currNode.word = null; // Prevent duplicates
    }

    board[r][c] = '#'; // Mark visited
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] !== '#') {
        dfs(nr, nc, currNode);
      }
    }
    board[r][c] = char; // Restore

    // Optimization: prune leaf nodes
    if (currNode.children.size === 0) {
      parent.children.delete(char);
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (root.children.has(board[r][c])) {
        dfs(r, c, root);
      }
    }
  }

  return result;
}`,
      complexity: {
        time: 'O(M * N * 4 * 3^(L - 1))',
        space: 'O(W * L)'
      },
      explanation: 'Insert all words into a prefix Trie. Walk the grid once: a single DFS step simultaneously searches for all words sharing the current character prefix. When a word is matched, set node.word = null and prune dead leaves.',
      whyOptimalIsPreferred: 'Traverses the board only once for the entire dictionary instead of rerunning DFS W times, dramatically pruning invalid search paths in O(1) prefix checks.',
      patternInvariant: 'Prefix-driven search: terminate grid exploration as soon as the accumulated character sequence diverges from all dictionary prefixes.'
    },
    defaultInputDescription: 'board = 4x4 matrix, words = ["oath", "pea", "eat", "rain"]'
  }
];
