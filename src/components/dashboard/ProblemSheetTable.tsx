import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Check,
  Bookmark,
} from 'lucide-react';
import type { LeetCodeProblem } from '../../types/problem';
import { PATTERNS } from '../../data/patterns';
import { ProgressStore } from '../../utils/progress';
import { getUrl } from '../../utils/url';

interface ProblemSheetTableProps {
  problems: LeetCodeProblem[];
}

export default function ProblemSheetTable({ problems }: ProblemSheetTableProps) {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedPattern, setSelectedPattern] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Solved' | 'Unsolved' | 'Bookmarked'>('All');
  const [solvedSet, setSolvedSet] = useState<Set<number>>(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSolvedSet(new Set(ProgressStore.getSolvedIds()));
    setBookmarkedSet(new Set(ProgressStore.getBookmarkedIds()));

    const unsub = ProgressStore.subscribe(() => {
      setSolvedSet(new Set(ProgressStore.getSolvedIds()));
      setBookmarkedSet(new Set(ProgressStore.getBookmarkedIds()));
    });
    return unsub;
  }, []);

  const handleToggleSolved = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    ProgressStore.toggleSolved(id);
  };

  const handleToggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    ProgressStore.toggleBookmarked(id);
  };

  const filteredProblems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return problems.filter((p) => {
      // Search filter
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.id.toString().includes(q) ||
        p.category.toLowerCase().includes(q);

      // Difficulty filter
      const matchesDiff =
        selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

      // Pattern filter
      const matchesPattern =
        selectedPattern === 'All' || p.pattern === selectedPattern;

      // Status filter
      let matchesStatus = true;
      if (selectedStatus === 'Solved') {
        matchesStatus = solvedSet.has(p.id);
      } else if (selectedStatus === 'Unsolved') {
        matchesStatus = !solvedSet.has(p.id);
      } else if (selectedStatus === 'Bookmarked') {
        matchesStatus = bookmarkedSet.has(p.id);
      }

      return matchesSearch && matchesDiff && matchesPattern && matchesStatus;
    });
  }, [problems, search, selectedDifficulty, selectedPattern, selectedStatus, solvedSet, bookmarkedSet]);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-[#34d399] bg-[#062817] border-[#059669]/30';
      case 'Medium':
        return 'text-[#fbbf24] bg-[#2a1b04] border-[#d97706]/30';
      case 'Hard':
        return 'text-[#f87171] bg-[#2d060a] border-[#dc2626]/30';
      default:
        return 'text-text-muted bg-[#141414] border-[#262626]';
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search, Difficulty Pills, Pattern Select, Status Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-xl bg-[#0c0c0c] border border-[#222222]">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-dim absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter problems by title, #ID, or pattern..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white placeholder:text-text-dim focus:outline-none focus:border-accent-cyan transition-colors"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Pills */}
          <div className="inline-flex p-0.5 rounded-lg bg-[#141414] border border-[#262626] text-xs">
            {(['All', 'Solved', 'Bookmarked'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-sans transition-colors ${
                  selectedStatus === status
                    ? 'bg-[#222222] text-white font-medium shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Difficulty Pills */}
          <div className="inline-flex p-0.5 rounded-lg bg-[#141414] border border-[#262626] text-xs">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-sans transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#222222] text-white font-medium shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Pattern Selector */}
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-[11px] font-sans text-text-muted focus:outline-none focus:border-accent-cyan cursor-pointer"
          >
            <option value="All">All Patterns ({PATTERNS.length})</option>
            {PATTERNS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} ({p.problemCount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-text-dim px-1">
        <span>
          Showing <strong className="text-white">{filteredProblems.length}</strong> of {problems.length} problems
        </span>
        <div className="flex items-center gap-3">
          <span className="text-accent-emerald">{solvedSet.size} Solved</span>
          <span>•</span>
          <span className="text-accent-amber">{bookmarkedSet.size} Bookmarked</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-[#222222] bg-[#080808] shadow-2xl">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#0e0e0e] border-b border-[#222222] text-text-muted font-mono uppercase tracking-wider text-[10px]">
            <tr>
              <th scope="col" className="py-3 px-3 w-10 text-center">Status</th>
              <th scope="col" className="py-3 px-2 w-8 text-center">★</th>
              <th scope="col" className="py-3 px-3 w-14">#ID</th>
              <th scope="col" className="py-3 px-4">Problem Title</th>
              <th scope="col" className="py-3 px-4">Pattern Category</th>
              <th scope="col" className="py-3 px-3">Difficulty</th>
              <th scope="col" className="py-3 px-4">Complexity</th>
              <th scope="col" className="py-3 px-4 text-right">Interactive Visualizer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#161616]">
            {filteredProblems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-text-muted text-xs">
                  No problems match the selected filters.
                </td>
              </tr>
            ) : (
              filteredProblems.map((problem) => {
                const isSolved = solvedSet.has(problem.id);
                const isBookmarked = bookmarkedSet.has(problem.id);

                return (
                  <tr
                    key={problem.id}
                    className="hover:bg-[#101010] transition-colors group"
                  >
                    {/* Solved Checkbox */}
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => handleToggleSolved(problem.id, e)}
                        aria-label={isSolved ? 'Mark unsolved' : 'Mark solved'}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all border ${
                          isSolved
                            ? 'bg-[#062817] text-[#34d399] border-[#059669]/50'
                            : 'bg-[#141414] text-transparent hover:text-text-dim border-[#262626] hover:border-[#383838]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </td>

                    {/* Bookmark Star */}
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(problem.id, e)}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        className={`transition-colors ${
                          isBookmarked
                            ? 'text-[#fbbf24]'
                            : 'text-text-dim hover:text-text-muted'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#fbbf24]' : ''}`} />
                      </button>
                    </td>

                    {/* Problem ID */}
                    <td className="py-3 px-3 font-mono text-text-dim">
                      #{problem.id}
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4 font-medium text-text-primary">
                      <a
                        href={getUrl(`/problem/${problem.id}/`)}
                        className="hover:text-white hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span>{problem.title}</span>
                      </a>
                    </td>

                    {/* Pattern */}
                    <td className="py-3 px-4">
                      <a
                        href={getUrl(`/patterns/${problem.pattern}/`)}
                        className="text-text-muted hover:text-accent-cyan transition-colors"
                      >
                        {problem.category}
                      </a>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono border ${getDifficultyBadge(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Complexity */}
                    <td className="py-3 px-4 font-mono text-[11px] text-text-dim">
                      <span className="text-accent-cyan">{problem.optimal.complexity.time}</span>
                      <span className="text-text-dim mx-1">/</span>
                      <span className="text-accent-purple">{problem.optimal.complexity.space}</span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <a
                        href={getUrl(`/problem/${problem.id}/`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium bg-[#141414] hover:bg-[#1e1e1e] text-text-primary hover:text-white border border-[#262626] hover:border-[#383838] transition-all"
                      >
                        <span>Walkthrough</span>
                        <span className="text-accent-emerald">▶</span>
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
