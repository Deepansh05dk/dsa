/**
 * Progress & Bookmark persistence utilities for LeetCode 150 revision platform.
 * Synchronizes with localStorage and dispatches window events for real-time UI updates.
 */

const SOLVED_KEY = 'lc150_solved_problems';
const BOOKMARKED_KEY = 'lc150_bookmarked_problems';
const EVENT_NAME = 'lc150_progress_update';

function getStoredSet(key: string): Set<number> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveStoredSet(key: string, set: Set<number>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.warn('[Progress] Error saving to localStorage:', err);
  }
}

export const ProgressStore = {
  isSolved(problemId: number): boolean {
    return getStoredSet(SOLVED_KEY).has(problemId);
  },

  toggleSolved(problemId: number): boolean {
    const set = getStoredSet(SOLVED_KEY);
    const newState = !set.has(problemId);
    if (newState) {
      set.add(problemId);
    } else {
      set.delete(problemId);
    }
    saveStoredSet(SOLVED_KEY, set);
    return newState;
  },

  getSolvedIds(): number[] {
    return Array.from(getStoredSet(SOLVED_KEY));
  },

  getSolvedCount(): number {
    return getStoredSet(SOLVED_KEY).size;
  },

  isBookmarked(problemId: number): boolean {
    return getStoredSet(BOOKMARKED_KEY).has(problemId);
  },

  toggleBookmarked(problemId: number): boolean {
    const set = getStoredSet(BOOKMARKED_KEY);
    const newState = !set.has(problemId);
    if (newState) {
      set.add(problemId);
    } else {
      set.delete(problemId);
    }
    saveStoredSet(BOOKMARKED_KEY, set);
    return newState;
  },

  getBookmarkedIds(): number[] {
    return Array.from(getStoredSet(BOOKMARKED_KEY));
  },

  getBookmarkedCount(): number {
    return getStoredSet(BOOKMARKED_KEY).size;
  },

  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
  },
};
