import type { VisualizerStep } from '../../types/visualizer';
import type { TrieVisualState } from '../../components/visualizer/renderers/TrieRenderer';

declare module '../../types/visualizer' {
  interface VisualizerStep {
    trieState?: TrieVisualState;
  }
}

export const TRIE_TRACES: Record<number, VisualizerStep[]> = {
  // Problem 208: Implement Trie (Prefix Tree)
  208: [
    {
      stepIndex: 0,
      title: 'Initialize Root Node of Prefix Trie',
      description: 'Root node represents empty string prefix "". Trie is ready to store words and query prefixes.',
      codeLineHighlight: 2,
      variables: { action: 'init', rootId: 'root', wordCount: 0 },
      trieState: {
        rootId: 'root',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'current', children: [] },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'insert("apple"): Build Prefix Path a -> p -> p -> l -> e',
      description: 'Traverse and create character nodes along the path. Mark terminal node "e" with isEndOfWord: true.',
      codeLineHighlight: 5,
      variables: { action: 'insert', word: 'apple', length: 5 },
      trieState: {
        rootId: 'root',
        activeWord: 'apple',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['a1'] },
          { id: 'a1', char: 'a', status: 'inserted', children: ['p1'] },
          { id: 'p1', char: 'p', status: 'inserted', children: ['p2'] },
          { id: 'p2', char: 'p', status: 'inserted', children: ['l1'] },
          { id: 'l1', char: 'l', status: 'inserted', children: ['e1'] },
          { id: 'e1', char: 'e', isEndOfWord: true, status: 'highlighted', children: [] },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'search("apple"): Exact Word Match Found (True)',
      description: 'Follow path a -> p -> p -> l -> e. Terminal node "e" has isEndOfWord === true. Return true.',
      codeLineHighlight: 8,
      variables: { action: 'search', word: 'apple', found: true },
      trieState: {
        rootId: 'root',
        searchWord: 'apple',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['a1'] },
          { id: 'a1', char: 'a', status: 'matched', children: ['p1'] },
          { id: 'p1', char: 'p', status: 'matched', children: ['p2'] },
          { id: 'p2', char: 'p', status: 'matched', children: ['l1'] },
          { id: 'l1', char: 'l', status: 'matched', children: ['e1'] },
          { id: 'e1', char: 'e', isEndOfWord: true, status: 'highlighted', children: [] },
        ],
      },
    },
    {
      stepIndex: 3,
      title: 'startsWith("app"): Prefix Exists (True)',
      description: 'Query prefix "app" follows valid nodes: a -> p -> p. Prefix is present in the dictionary. Return true.',
      codeLineHighlight: 12,
      variables: { action: 'startsWith', prefix: 'app', exists: true, timeComplexity: 'O(L)' },
      trieState: {
        rootId: 'root',
        searchWord: 'app',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['a1'] },
          { id: 'a1', char: 'a', status: 'matched', children: ['p1'] },
          { id: 'p1', char: 'p', status: 'matched', children: ['p2'] },
          { id: 'p2', char: 'p', status: 'highlighted', children: ['l1'] },
          { id: 'l1', char: 'l', status: 'default', children: ['e1'] },
          { id: 'e1', char: 'e', isEndOfWord: true, status: 'default', children: [] },
        ],
      },
    },
  ],

  // Problem 211: Design Add and Search Words Data Structure (Wildcard '.')
  211: [
    {
      stepIndex: 0,
      title: 'Initialize Word Dictionary Trie with Words "bad", "dad", "mad"',
      description: 'Three words sharing suffix "-ad" branched under root. Terminal "d" nodes marked as end of word.',
      codeLineHighlight: 2,
      variables: { wordsCount: 3, dictionary: '["bad", "dad", "mad"]' },
      trieState: {
        rootId: 'root',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['b', 'd', 'm'] },
          { id: 'b', char: 'b', status: 'default', children: ['a1'] },
          { id: 'a1', char: 'a', status: 'default', children: ['d1'] },
          { id: 'd1', char: 'd', isEndOfWord: true, status: 'default' },
          { id: 'd', char: 'd', status: 'default', children: ['a2'] },
          { id: 'a2', char: 'a', status: 'default', children: ['d2'] },
          { id: 'd2', char: 'd', isEndOfWord: true, status: 'default' },
          { id: 'm', char: 'm', status: 'default', children: ['a3'] },
          { id: 'a3', char: 'a', status: 'default', children: ['d3'] },
          { id: 'd3', char: 'd', isEndOfWord: true, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'search(".ad"): Wildcard Character Matches Multiple Branches',
      description: 'Encounter dot "." at index 0. Branching DFS tests "b", "d", and "m". All lead to valid suffixes.',
      codeLineHighlight: 6,
      variables: { query: '.ad', wildcardIndex: 0, branchMatches: 'b, d, m' },
      trieState: {
        rootId: 'root',
        searchWord: '.ad',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['b', 'd', 'm'] },
          { id: 'b', char: 'b', status: 'current', children: ['a1'] },
          { id: 'a1', char: 'a', status: 'default', children: ['d1'] },
          { id: 'd1', char: 'd', isEndOfWord: true, status: 'default' },
          { id: 'd', char: 'd', status: 'current', children: ['a2'] },
          { id: 'a2', char: 'a', status: 'default', children: ['d2'] },
          { id: 'd2', char: 'd', isEndOfWord: true, status: 'default' },
          { id: 'm', char: 'm', status: 'current', children: ['a3'] },
          { id: 'a3', char: 'a', status: 'default', children: ['d3'] },
          { id: 'd3', char: 'd', isEndOfWord: true, status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Wildcard Match Confirmed: "bad", "dad", and "mad" all match',
      description: 'First branch "bad" completes successfully with isEndOfWord === true. Return true.',
      codeLineHighlight: 9,
      variables: { query: '.ad', matchedWord: 'bad', result: true, timeComplexity: 'O(26^M)' },
      trieState: {
        rootId: 'root',
        searchWord: '.ad',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['b', 'd', 'm'] },
          { id: 'b', char: 'b', status: 'matched', children: ['a1'] },
          { id: 'a1', char: 'a', status: 'matched', children: ['d1'] },
          { id: 'd1', char: 'd', isEndOfWord: true, status: 'highlighted' },
          { id: 'd', char: 'd', status: 'default', children: ['a2'] },
          { id: 'a2', char: 'a', status: 'default', children: ['d2'] },
          { id: 'd2', char: 'd', isEndOfWord: true, status: 'default' },
          { id: 'm', char: 'm', status: 'default', children: ['a3'] },
          { id: 'a3', char: 'a', status: 'default', children: ['d3'] },
          { id: 'd3', char: 'd', isEndOfWord: true, status: 'default' },
        ],
      },
    },
  ],

  // Problem 212: Word Search II
  212: [
    {
      stepIndex: 0,
      title: 'Build Prefix Trie from Dictionary: ["oath", "pea", "eat", "rain"]',
      description: 'Load all target words into a Trie for multi-word simultaneous grid search pruning.',
      codeLineHighlight: 2,
      variables: { dictionarySize: 4, trieBuilt: true },
      trieState: {
        rootId: 'root',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['o', 'p', 'e', 'r'] },
          { id: 'o', char: 'o', status: 'default', children: ['a'] },
          { id: 'a', char: 'a', status: 'default', children: ['t'] },
          { id: 't', char: 't', status: 'default', children: ['h'] },
          { id: 'h', char: 'h', isEndOfWord: true, status: 'default' },
          { id: 'p', char: 'p', status: 'default' },
          { id: 'e', char: 'e', status: 'default' },
          { id: 'r', char: 'r', status: 'default' },
        ],
      },
    },
    {
      stepIndex: 1,
      title: 'DFS Grid Traversal Follows Trie Path "oath"',
      description: 'Grid cell (0, 0) matches "o", cell (0, 1) matches "a", cell (0, 2) matches "t", cell (1, 2) matches "h".',
      codeLineHighlight: 6,
      variables: { currentWord: 'oath', matchedPrefix: true },
      trieState: {
        rootId: 'root',
        activeWord: 'oath',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['o', 'p', 'e', 'r'] },
          { id: 'o', char: 'o', status: 'matched', children: ['a'] },
          { id: 'a', char: 'a', status: 'matched', children: ['t'] },
          { id: 't', char: 't', status: 'matched', children: ['h'] },
          { id: 'h', char: 'h', isEndOfWord: true, status: 'highlighted' },
          { id: 'p', char: 'p', status: 'default' },
          { id: 'e', char: 'e', status: 'default' },
          { id: 'r', char: 'r', status: 'default' },
        ],
      },
    },
    {
      stepIndex: 2,
      title: 'Word Found: Record "oath" and Prune Leaf Node to Optimize Search',
      description: 'Found word "oath" on board. Remove duplicate searches by clearing end-of-word flag or pruning node.',
      codeLineHighlight: 9,
      variables: { foundWords: '["oath", "eat"]', timeComplexity: 'O(M * N * 4^L)' },
      trieState: {
        rootId: 'root',
        nodes: [
          { id: 'root', char: 'ROOT', status: 'default', children: ['o', 'p', 'e', 'r'] },
          { id: 'o', char: 'o', status: 'matched', children: ['a'] },
          { id: 'a', char: 'a', status: 'matched', children: ['t'] },
          { id: 't', char: 't', status: 'matched', children: ['h'] },
          { id: 'h', char: 'h', isEndOfWord: true, status: 'highlighted' },
          { id: 'p', char: 'p', status: 'default' },
          { id: 'e', char: 'e', status: 'matched' },
          { id: 'r', char: 'r', status: 'default' },
        ],
      },
    },
  ],
};
