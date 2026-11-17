import { useState, useEffect } from 'react';
import { Check, Bookmark, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { ProgressStore } from '../../utils/progress';

interface ProblemActionsProps {
  problemId: number;
}

export default function ProblemActions({ problemId }: ProblemActionsProps) {
  const [isSolved, setIsSolved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsSolved(ProgressStore.isSolved(problemId));
    setIsBookmarked(ProgressStore.isBookmarked(problemId));

    const unsubscribe = ProgressStore.subscribe(() => {
      setIsSolved(ProgressStore.isSolved(problemId));
      setIsBookmarked(ProgressStore.isBookmarked(problemId));
    });

    return unsubscribe;
  }, [problemId]);

  const handleToggleSolved = () => {
    const updated = ProgressStore.toggleSolved(problemId);
    setIsSolved(updated);
  };

  const handleToggleBookmark = () => {
    const updated = ProgressStore.toggleBookmarked(problemId);
    setIsBookmarked(updated);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Mark As Solved Button */}
      <button
        type="button"
        onClick={handleToggleSolved}
        aria-label={isSolved ? 'Mark problem as unsolved' : 'Mark problem as solved'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all duration-200 border shadow-sm active:scale-95 ${
          isSolved
            ? 'bg-[#062817] text-[#34d399] border-[#059669]/50 shadow-[0_0_12px_rgba(5,150,105,0.2)]'
            : 'bg-[#111111] hover:bg-[#1a1a1a] text-text-secondary hover:text-white border-[#262626] hover:border-[#404040]'
        }`}
      >
        {isSolved ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
            <span>Solved</span>
          </>
        ) : (
          <>
            <Check className="w-4 h-4 text-text-muted" />
            <span>Mark as solved</span>
          </>
        )}
      </button>

      {/* Bookmark Button */}
      <button
        type="button"
        onClick={handleToggleBookmark}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all duration-200 border shadow-sm active:scale-95 ${
          isBookmarked
            ? 'bg-[#2a1b04] text-[#fbbf24] border-[#d97706]/50 shadow-[0_0_12px_rgba(217,119,6,0.2)]'
            : 'bg-[#111111] hover:bg-[#1a1a1a] text-text-secondary hover:text-white border-[#262626] hover:border-[#404040]'
        }`}
      >
        {isBookmarked ? (
          <>
            <BookmarkCheck className="w-4 h-4 text-[#fbbf24]" />
            <span>Bookmarked</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4 text-text-muted" />
            <span>Bookmark</span>
          </>
        )}
      </button>
    </div>
  );
}
