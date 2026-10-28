import { useState, useEffect, useRef } from 'react';
import { Search, X, Code, CornerDownLeft, Layers } from 'lucide-react';
import { PATTERNS } from '../../data/patterns';
import { INITIAL_PROBLEMS } from '../../data/problems';
import { getUrl } from '../../utils/url';

interface GlobalSearchProps {
  className?: string;
}

export default function GlobalSearch({ className = '' }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut: Cmd+K / Ctrl+K / '/'
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter matching patterns and problems
  const cleanQuery = query.trim().toLowerCase();
  
  const filteredPatterns = PATTERNS.filter(
    (p) =>
      p.name.toLowerCase().includes(cleanQuery) ||
      p.slug.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery)
  );

  const filteredProblems = INITIAL_PROBLEMS.filter(
    (p) =>
      p.title.toLowerCase().includes(cleanQuery) ||
      p.slug.toLowerCase().includes(cleanQuery) ||
      p.id.toString().includes(cleanQuery) ||
      p.pattern.toLowerCase().includes(cleanQuery) ||
      p.difficulty.toLowerCase().includes(cleanQuery)
  );

  const combinedResults: Array<
    | { type: 'pattern'; id: string; title: string; subtitle: string; href: string }
    | { type: 'problem'; id: number; title: string; difficulty: string; pattern: string; href: string }
  > = [
    ...filteredPatterns.map((p) => ({
      type: 'pattern' as const,
      id: p.slug,
      title: p.name,
      subtitle: `${p.problemCount} problems • ${p.keyInvariant}`,
      href: getUrl(`/patterns/${p.slug}`),
    })),
    ...filteredProblems.map((p) => ({
      type: 'problem' as const,
      id: p.id,
      title: `#${p.id} ${p.title}`,
      difficulty: p.difficulty,
      pattern: p.category,
      href: getUrl(`/problem/${p.id}`),
    })),
  ];

  // Keyboard navigation inside list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (combinedResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % combinedResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + combinedResults.length) % combinedResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = combinedResults[selectedIndex];
      if (item) {
        window.location.href = item.href;
      }
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-[#34d399] bg-[#062817] border-[#059669]/30';
      case 'Medium':
        return 'text-[#fbbf24] bg-[#2a1b04] border-[#d97706]/30';
      case 'Hard':
        return 'text-[#f87171] bg-[#2d060a] border-[#dc2626]/30';
      default:
        return 'text-text-muted bg-surface-subtle border-border-default';
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group flex items-center gap-2.5 px-3 py-1.5 text-xs text-text-muted hover:text-text-primary bg-[#0d0d0d] hover:bg-[#141414] border border-[#262626] hover:border-[#383838] rounded-md transition-all duration-150 ${className}`}
        aria-label="Search problems and patterns (⌘K)"
      >
        <Search className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors" />
        <span className="hidden sm:inline font-sans">Search 150 problems, patterns...</span>
        <span className="sm:hidden font-sans">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-text-dim bg-[#1a1a1a] border border-[#333333] rounded">
          <span className="text-[11px]">⌘</span>K
        </kbd>
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0a0a0a] border border-[#262626] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3 border-b border-[#262626] bg-[#0d0d0d]">
              <Search className="w-4 h-4 text-text-muted mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search by problem title, number, pattern, or invariant..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-text-muted hover:text-text-primary mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-1.5 py-0.5 text-[11px] font-mono text-text-muted hover:text-text-primary bg-[#171717] border border-[#2e2e2e] rounded"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-[#171717]">
              {combinedResults.length === 0 ? (
                <div className="py-12 text-center text-text-muted text-sm font-sans">
                  No matching problems or algorithmic patterns found for &ldquo;<span className="text-text-primary">{query}</span>&rdquo;.
                </div>
              ) : (
                <div className="space-y-1">
                  {combinedResults.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    if (item.type === 'pattern') {
                      return (
                        <a
                          key={`pattern-${item.id}`}
                          href={item.href}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            isSelected ? 'bg-[#171717] text-text-primary' : 'text-text-secondary hover:bg-[#121212]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-1.5 rounded-md bg-[#1f1f1f] text-accent-cyan flex-shrink-0">
                              <Layers className="w-3.5 h-3.5" />
                            </div>
                            <div className="truncate">
                              <div className="font-medium text-text-primary flex items-center gap-2">
                                <span>{item.title}</span>
                                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#1a1a1a] text-text-muted border border-[#2a2a2a]">
                                  Pattern
                                </span>
                              </div>
                              <p className="text-[11px] text-text-muted truncate mt-0.5">{item.subtitle}</p>
                            </div>
                          </div>
                          {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-text-muted ml-2 flex-shrink-0" />}
                        </a>
                      );
                    }

                    return (
                      <a
                        key={`problem-${item.id}`}
                        href={item.href}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#171717] text-text-primary' : 'text-text-secondary hover:bg-[#121212]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-1.5 rounded-md bg-[#1f1f1f] text-text-muted flex-shrink-0">
                            <Code className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <div className="font-medium text-text-primary flex items-center gap-2">
                              <span>{item.title}</span>
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${getDifficultyBadge(
                                  item.difficulty
                                )}`}
                              >
                                {item.difficulty}
                              </span>
                            </div>
                            <p className="text-[11px] text-text-muted truncate mt-0.5">{item.pattern}</p>
                          </div>
                        </div>
                        {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-text-muted ml-2 flex-shrink-0" />}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#262626] bg-[#080808] text-[11px] text-text-dim font-mono">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1 py-0.5 bg-[#141414] border border-[#2a2a2a] rounded mr-1">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-[#141414] border border-[#2a2a2a] rounded mr-1">↓</kbd>
                  Navigate
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-[#141414] border border-[#2a2a2a] rounded mr-1">↵</kbd>
                  Open
                </span>
              </div>
              <div>{combinedResults.length} results</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
