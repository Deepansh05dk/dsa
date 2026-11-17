import { useState, useEffect } from 'react';
import {
  Layers,
  CheckCircle2,
  Bookmark,
  Search,
  Code2,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { PATTERNS } from '../../data/patterns';
import { ProgressStore } from '../../utils/progress';
import { getUrl } from '../../utils/url';

interface SidebarProps {
  currentPatternSlug?: string;
  currentProblemId?: number;
}

export default function Sidebar({ currentPatternSlug, currentProblemId }: SidebarProps) {
  const [solvedCount, setSolvedCount] = useState(0);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

  useEffect(() => {
    setSolvedCount(ProgressStore.getSolvedCount());
    setBookmarkedCount(ProgressStore.getBookmarkedCount());

    const unsub = ProgressStore.subscribe(() => {
      setSolvedCount(ProgressStore.getSolvedCount());
      setBookmarkedCount(ProgressStore.getBookmarkedCount());
    });
    return unsub;
  }, []);

  const totalProblems = 150;
  const progressPercent = Math.min(100, Math.round((solvedCount / totalProblems) * 100));

  const triggerSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    );
  };

  return (
    <aside className="w-full h-full flex flex-col bg-[#070707] border-r border-[#202020] text-text-secondary select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1c1c1c] flex items-center justify-between">
        <a href={getUrl('/')} className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-white text-black transition-transform group-hover:scale-105">
            <svg viewBox="0 0 75 65" height="13" width="15" fill="currentColor">
              <path d="M37.5 0L75 65H0z" />
            </svg>
          </div>
          <div>
            <span className="font-sans font-semibold text-sm tracking-tight text-white block leading-none">
              LeetCode 150
            </span>
            <span className="text-[10px] text-text-muted font-mono leading-none">
              Pattern Revision
            </span>
          </div>
        </a>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#141414] text-accent-cyan border border-[#262626]">
          150 Must-Solve
        </span>
      </div>

      {/* Quick Search Button (⌘K) */}
      <div className="p-3 border-b border-[#1c1c1c]">
        <button
          type="button"
          onClick={triggerSearch}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#0e0e0e] hover:bg-[#151515] text-text-muted hover:text-white border border-[#222222] hover:border-[#383838] transition-all text-xs font-sans group shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-text-dim group-hover:text-accent-cyan transition-colors" />
            <span>Quick search...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1a1a1a] border border-[#2a2a2a] text-text-dim">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Progress & Quick Links Section */}
      <div className="p-3 border-b border-[#1c1c1c] space-y-2">
        {/* Progress Card */}
        <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#1e1e1e] space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="flex items-center gap-1.5 text-text-primary font-medium text-[11px]">
              <TrendingUp className="w-3.5 h-3.5 text-accent-emerald" />
              <span>Revision Progress</span>
            </span>
            <span className="font-mono text-[11px] text-accent-emerald font-semibold">
              {solvedCount} / {totalProblems}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-[#181818] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-cyan to-accent-emerald transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(solvedCount > 0 ? 4 : 0, progressPercent)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-text-dim pt-0.5">
            <span>{progressPercent}% Complete</span>
            <span>{bookmarkedCount} Bookmarked</span>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-0.5 text-xs font-sans">
          <a
            href={getUrl('/')}
            className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-text-muted hover:text-white hover:bg-[#121212] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-text-dim" />
              <span>Overview</span>
            </span>
          </a>

          <a
            href={getUrl('/#problems')}
            className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-text-muted hover:text-white hover:bg-[#121212] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-text-dim" />
              <span>Problem Sheet</span>
            </span>
            <span className="text-[10px] font-mono text-text-dim px-1.5 py-0.2 rounded bg-[#161616]">
              150
            </span>
          </a>
        </nav>
      </div>

      {/* Pattern Catalog Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-dim">
          Algorithmic Patterns ({PATTERNS.length})
        </div>

        {PATTERNS.map((pattern) => {
          const isActive = currentPatternSlug === pattern.slug;
          return (
            <a
              key={pattern.slug}
              href={getUrl(`/patterns/${pattern.slug}/`)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-sans transition-all group ${
                isActive
                  ? 'bg-[#141414] text-white font-medium border border-[#2a2a2a]'
                  : 'text-text-muted hover:text-text-primary hover:bg-[#101010]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? 'bg-accent-cyan' : 'bg-[#2b2b2b] group-hover:bg-text-dim'
                  }`}
                />
                <span className="truncate">{pattern.name}</span>
              </div>
              <span className="text-[10px] font-mono text-text-dim shrink-0 group-hover:text-text-muted transition-colors">
                {pattern.problemCount}
              </span>
            </a>
          );
        })}
      </div>

      {/* Bottom Footer Lockup */}
      <div className="p-3 border-t border-[#1c1c1c] space-y-2 text-[11px] font-mono text-text-dim">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-accent-emerald text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            <span>PWA & Offline Ready</span>
          </span>
          <a
            href="https://github.com/Deepansh05dk/dsa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
