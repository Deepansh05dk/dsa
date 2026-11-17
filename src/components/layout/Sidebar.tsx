import { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Code2,
  TrendingUp,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { PATTERNS } from '../../data/patterns';
import { ProgressStore } from '../../utils/progress';
import { getUrl } from '../../utils/url';

interface SidebarProps {
  currentPatternSlug?: string;
  currentProblemId?: number;
}

const PATTERN_ACRONYMS: Record<string, string> = {
  'array-string': 'AS',
  'two-pointers': 'TP',
  'sliding-window': 'SW',
  'matrix': 'MX',
  'hashmap': 'HM',
  'intervals': 'IN',
  'stack': 'ST',
  'linked-list': 'LL',
  'binary-tree-general': 'BT',
  'binary-tree-bfs': 'BFS',
  'binary-search-tree': 'BST',
  'graph-general': 'GG',
  'graph-bfs': 'GB',
  'trie': 'TR',
  'backtracking': 'BK',
  'divide-and-conquer': 'DC',
  'kadanes-algorithm': 'KD',
  'binary-search': 'BS',
  'heap': 'HP',
  'bit-manipulation': 'BM',
  'math': 'MA',
  '1d-dp': '1D',
  'multidimensional-dp': '2D',
};

export default function Sidebar({ currentPatternSlug }: SidebarProps) {
  const [solvedCount, setSolvedCount] = useState(0);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lc150_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('lc150_sidebar_collapsed', String(next));
        if (next) {
          document.documentElement.classList.add('sidebar-collapsed');
        } else {
          document.documentElement.classList.remove('sidebar-collapsed');
        }
      } catch (e) {}
      return next;
    });
  };

  // Sync the desktop container width whenever isCollapsed changes
  useEffect(() => {
    const container = document.getElementById('desktop-sidebar-container');
    if (container) {
      if (isCollapsed) {
        container.classList.remove('w-72');
        container.classList.add('w-14');
      } else {
        container.classList.remove('w-14');
        container.classList.add('w-72');
      }
    }
  }, [isCollapsed]);

  // Listen for toggle events from navbar or Ctrl+B / Cmd+B keyboard shortcut
  useEffect(() => {
    const handleToggleEvent = () => toggleCollapse();
    window.addEventListener('toggle-sidebar', handleToggleEvent);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Subscribe to progress store
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
    <aside
      className={`h-full flex flex-col bg-[#070707] border-r border-[#202020] text-text-secondary select-none transition-all duration-300 ease-in-out overflow-hidden ${
        isCollapsed ? 'w-14' : 'w-72'
      }`}
    >
      {isCollapsed ? (
        /* Collapsed Mini Rail (56px) */
        <div className="w-full h-full flex flex-col items-center justify-between py-2.5">
          {/* Top Actions: Logo, Expand Toggle, Search, Progress, Nav */}
          <div className="w-full flex flex-col items-center gap-1.5 px-1.5">
            {/* Logo */}
            <a
              href={getUrl('/')}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white text-black hover:scale-105 transition-transform"
              title="LeetCode 150 Home"
            >
              <svg viewBox="0 0 75 65" height="14" width="16" fill="currentColor">
                <path d="M37.5 0L75 65H0z" />
              </svg>
            </a>

            {/* Expand Toggle Button */}
            <button
              type="button"
              onClick={toggleCollapse}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-[#151515] border border-transparent hover:border-[#262626] transition-all"
              title="Expand Sidebar (Ctrl+B / ⌘B)"
              aria-label="Expand Sidebar"
            >
              <PanelLeftOpen className="w-4 h-4 text-accent-cyan" />
            </button>

            <div className="w-7 h-px bg-[#1c1c1c] my-0.5" />

            {/* Quick Search */}
            <button
              type="button"
              onClick={triggerSearch}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-[#151515] border border-transparent hover:border-[#262626] transition-all group"
              title="Quick Search (⌘K)"
              aria-label="Quick Search"
            >
              <Search className="w-4 h-4 text-text-dim group-hover:text-accent-cyan transition-colors" />
            </button>

            {/* Progress Badge */}
            <a
              href={getUrl('/#problems')}
              className="w-9 h-9 rounded-lg flex flex-col items-center justify-center text-accent-emerald hover:bg-[#151515] border border-transparent hover:border-[#262626] transition-all"
              title={`Revision Progress: ${solvedCount} / ${totalProblems} Solved (${progressPercent}%)`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-[9px] font-mono leading-none mt-0.5 font-bold">
                {progressPercent}%
              </span>
            </a>

            {/* Nav: Overview */}
            <a
              href={getUrl('/')}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-[#151515] border border-transparent hover:border-[#262626] transition-all"
              title="Overview Dashboard"
            >
              <Layers className="w-4 h-4" />
            </a>

            {/* Nav: Problem Sheet */}
            <a
              href={getUrl('/#problems')}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-[#151515] border border-transparent hover:border-[#262626] transition-all relative"
              title="Problem Sheet (150 problems)"
            >
              <Code2 className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            </a>

            <div className="w-7 h-px bg-[#1c1c1c] my-0.5" />

            {/* Scrollable Pattern Acronym Badges */}
            <div className="w-full flex-1 overflow-y-auto space-y-1 flex flex-col items-center scrollbar-none py-1 max-h-[calc(100vh-325px)]">
              {PATTERNS.map((pattern) => {
                const isActive = currentPatternSlug === pattern.slug;
                const acronym = PATTERN_ACRONYMS[pattern.slug] || pattern.name.slice(0, 2).toUpperCase();

                return (
                  <a
                    key={pattern.slug}
                    href={getUrl(`/patterns/${pattern.slug}/`)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all relative ${
                      isActive
                        ? 'bg-[#181818] text-accent-cyan border border-accent-cyan/60 shadow-sm'
                        : 'text-text-dim hover:text-white hover:bg-[#141414] border border-transparent'
                    }`}
                    title={`${pattern.name} (${pattern.problemCount} problems)`}
                  >
                    {acronym}
                    {isActive && (
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-r bg-accent-cyan" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="w-full flex flex-col items-center gap-2 pt-2 border-t border-[#1c1c1c]">
            <div
              className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"
              title="PWA & Offline Ready"
            />
            <a
              href="https://github.com/Deepansh05dk/dsa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-dim hover:text-white hover:bg-[#151515] transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      ) : (
        /* Expanded Full Sidebar (288px) */
        <div className="w-full h-full flex flex-col justify-between">
          <div>
            {/* Brand Header & Collapse Toggle */}
            <div className="p-3.5 border-b border-[#1c1c1c] flex items-center justify-between">
              <a href={getUrl('/')} className="flex items-center gap-2.5 group min-w-0">
                <div className="w-6 h-6 rounded flex items-center justify-center bg-white text-black transition-transform group-hover:scale-105 shrink-0">
                  <svg viewBox="0 0 75 65" height="13" width="15" fill="currentColor">
                    <path d="M37.5 0L75 65H0z" />
                  </svg>
                </div>
                <div className="truncate">
                  <span className="font-sans font-semibold text-sm tracking-tight text-white block leading-none truncate">
                    LeetCode 150
                  </span>
                  <span className="text-[10px] text-text-muted font-mono leading-none">
                    Pattern Revision
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-medium bg-[#141414] text-accent-cyan border border-[#262626]">
                  150
                </span>
                <button
                  type="button"
                  onClick={toggleCollapse}
                  className="p-1.5 rounded-md text-text-muted hover:text-white hover:bg-[#161616] border border-transparent hover:border-[#282828] transition-all"
                  title="Collapse Sidebar (Ctrl+B / ⌘B)"
                  aria-label="Collapse Sidebar"
                >
                  <PanelLeftClose className="w-4 h-4 text-text-dim hover:text-white" />
                </button>
              </div>
            </div>

            {/* Quick Search Button (⌘K) */}
            <div className="p-2.5 border-b border-[#1c1c1c]">
              <button
                type="button"
                onClick={triggerSearch}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0e0e0e] hover:bg-[#151515] text-text-muted hover:text-white border border-[#222222] hover:border-[#383838] transition-all text-xs font-sans group shadow-inner"
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
            <div className="p-2.5 border-b border-[#1c1c1c] space-y-2">
              {/* Progress Card */}
              <div className="p-2.5 rounded-lg bg-[#0b0b0b] border border-[#1e1e1e] space-y-1.5">
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
            <div className="overflow-y-auto p-2.5 space-y-0.5 scrollbar-thin max-h-[calc(100vh-340px)]">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-dim">
                Algorithmic Patterns ({PATTERNS.length})
              </div>

              {PATTERNS.map((pattern) => {
                const isActive = currentPatternSlug === pattern.slug;
                return (
                  <a
                    key={pattern.slug}
                    href={getUrl(`/patterns/${pattern.slug}/`)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-sans transition-all group ${
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
          </div>

          {/* Bottom Footer Lockup */}
          <div className="p-3 border-t border-[#1c1c1c] space-y-1.5 text-[11px] font-mono text-text-dim bg-[#070707]">
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
        </div>
      )}
    </aside>
  );
}
