import { useState, useEffect } from 'react';
import { Menu, X, Search, Smartphone } from 'lucide-react';
import Sidebar from './Sidebar';
import { getUrl } from '../../utils/url';

interface MobileNavProps {
  currentPatternSlug?: string;
  currentProblemId?: number;
}

export default function MobileNav({ currentPatternSlug, currentProblemId }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const triggerSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    );
  };

  return (
    <>
      {/* Mobile Top Header (hidden on lg:) */}
      <header className="lg:hidden sticky top-0 z-30 w-full h-14 bg-black/90 backdrop-blur-md border-b border-[#222222] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Drawer"
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-[#141414] border border-[#242424] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a href={getUrl('/')} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-white text-black">
              <svg viewBox="0 0 75 65" height="11" width="13" fill="currentColor">
                <path d="M37.5 0L75 65H0z" />
              </svg>
            </div>
            <span className="font-sans font-semibold text-xs tracking-tight text-white">
              LeetCode 150
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerSearch}
            aria-label="Search"
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-[#141414] border border-[#242424] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Slide-out Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] h-full bg-[#070707] border-r border-[#222222] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Close button inside drawer */}
            <div className="absolute top-3.5 right-3.5 z-20">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-[#141414] border border-[#262626] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Sidebar
              currentPatternSlug={currentPatternSlug}
              currentProblemId={currentProblemId}
            />
          </div>
        </div>
      )}
    </>
  );
}
