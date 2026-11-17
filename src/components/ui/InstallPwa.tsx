import { useState, useEffect } from 'react';
import { Download, Smartphone, X, WifiOff, CheckCircle2 } from 'lucide-react';

export default function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    // Check network status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Strictly verify if the current window is running inside the standalone PWA container
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(standalone);
    };

    checkStandalone();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };
    try {
      mediaQuery.addEventListener('change', handleMediaChange);
    } catch {
      mediaQuery.addListener(handleMediaChange);
    }

    // Check banner dismissal from sessionStorage
    const dismissed = sessionStorage.getItem('lc150_pwa_banner_dismissed') === 'true';
    setBannerDismissed(dismissed);

    // Listen for service worker messages (offline caching complete)
    const handleSwMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ALL_PAGES_CACHED') {
        setOfflineReady(true);
        console.log('[PWA] Verified all 150 problems cached for offline study');
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSwMessage);

    // Ask service worker to ensure all pages are cached
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage('FORCE_CACHE_ALL');
    }

    // Listen for beforeinstallprompt event (Chrome on Android / Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA] beforeinstallprompt event captured');
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setBannerDismissed(true);
      console.log('[PWA] App successfully installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      navigator.serviceWorker?.removeEventListener('message', handleSwMessage);
      try {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } catch {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsStandalone(true);
          setBannerDismissed(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('[PWA] Prompt error:', err);
        setShowInstructions(true);
      }
    } else {
      setShowInstructions(true);
    }
  };

  const dismissBanner = () => {
    setBannerDismissed(true);
    sessionStorage.setItem('lc150_pwa_banner_dismissed', 'true');
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Offline Badge when disconnected */}
        {!isOnline && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#fbbf24] bg-[#2a1b04] border border-[#d97706]/30">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Mode</span>
          </div>
        )}

        {/* Offline Ready Badge when fully cached */}
        {isOnline && offlineReady && (
          <div className="hidden lg:inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono text-accent-emerald bg-[#062817] border border-[#059669]/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>150 Problems Offline Ready</span>
          </div>
        )}

        {/* Navbar Install Trigger Button - Visible whenever in browser */}
        {!isStandalone && (
          <button
            type="button"
            onClick={handleInstallClick}
            aria-label="Install App on Android Chrome"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans font-medium bg-[#141414] hover:bg-[#1f1f1f] text-text-primary hover:text-white border border-[#262626] hover:border-[#404040] transition-all shadow-sm active:scale-95"
          >
            <Smartphone className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="hidden sm:inline">Install App</span>
            <span className="sm:hidden">Install</span>
          </button>
        )}
      </div>

      {/* Mobile Floating Bottom Banner (Shown in mobile Chrome when not dismissed) */}
      {!isStandalone && !bannerDismissed && (
        <aside
          aria-label="PWA install banner"
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden bg-[#0d0d0d]/95 backdrop-blur-md border border-[#2a2a2a] p-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-black border border-[#333333] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 75 65" height="14" width="16" fill="white">
                <path d="M37.5 0L75 65H0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Install LeetCode 150</p>
              <p className="text-[11px] text-text-muted truncate">Full offline access to all 150 problems & visualizers</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-[#eaeaea] transition-colors shadow-sm flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Install</span>
            </button>
            <button
              type="button"
              onClick={dismissBanner}
              aria-label="Dismiss banner"
              className="p-1.5 rounded-md text-text-muted hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Android Chrome Install Instructions Modal */}
      {showInstructions && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center text-accent-cyan">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Install on Android Chrome</h3>
                  <p className="text-xs text-text-muted">Save all 150 problems & visualizers offline</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="p-1 rounded-lg text-text-dim hover:text-white hover:bg-[#1a1a1a] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step by Step Instructions */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#222222]">
                <span className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[11px] font-mono font-bold text-accent-cyan shrink-0">
                  1
                </span>
                <p className="text-text-secondary leading-relaxed">
                  In Chrome, tap the <strong className="text-white font-mono">⋮ (Three dots)</strong> menu icon at the top right of the browser.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#222222]">
                <span className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[11px] font-mono font-bold text-accent-cyan shrink-0">
                  2
                </span>
                <p className="text-text-secondary leading-relaxed">
                  Tap <strong className="text-white">Install app</strong> (or <strong className="text-white">Add to Home screen</strong>).
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#222222]">
                <span className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[11px] font-mono font-bold text-accent-cyan shrink-0">
                  3
                </span>
                <p className="text-text-secondary leading-relaxed">
                  Tap <strong className="text-white">Install</strong> when prompted. The app icon will appear directly on your phone's home screen!
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#1a1a1a]">
              <span className="text-[11px] font-mono text-text-dim">✓ 100% Offline Compatible</span>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-white text-black hover:bg-[#eaeaea] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
