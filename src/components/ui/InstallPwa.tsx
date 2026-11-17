import { useState, useEffect } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';

export default function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(true); // default true until client checks
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsInstalled(isStandalone);
    };

    checkStandalone();

    // Check device type
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDetected = /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    setIsMobile(mobileDetected);

    // Check banner dismissal from sessionStorage
    const dismissed = sessionStorage.getItem('lc150_pwa_banner_dismissed') === 'true';
    setBannerDismissed(dismissed);

    // Listen for beforeinstallprompt event (Chrome on Android / Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA] beforeinstallprompt event captured');
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setBannerDismissed(true);
      console.log('[PWA] App successfully installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setBannerDismissed(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('[PWA] Prompt error:', err);
        setShowInstructions(true);
      }
    } else {
      // If native deferred prompt isn't directly triggered, show step-by-step Android Chrome guide
      setShowInstructions(true);
    }
  };

  const dismissBanner = () => {
    setBannerDismissed(true);
    sessionStorage.setItem('lc150_pwa_banner_dismissed', 'true');
  };

  if (isInstalled) {
    return (
      <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-accent-emerald bg-[#062817] border border-[#059669]/30">
        <Check className="w-3.5 h-3.5" />
        <span>App Installed</span>
      </div>
    );
  }

  return (
    <>
      {/* Navbar Install Trigger Button */}
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

      {/* Mobile Floating Bottom Banner (Only when on mobile and not dismissed) */}
      {!bannerDismissed && (
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
              <p className="text-[11px] text-text-muted truncate">Fast offline access & full-screen practice</p>
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
                  <p className="text-xs text-text-muted">Add LeetCode 150 to your home screen</p>
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
                  Tap <strong className="text-white">Install</strong> when prompted. The app icon will appear directly on your Android phone's home screen!
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#1a1a1a]">
              <span className="text-[11px] font-mono text-text-dim">Works offline with standalone UI</span>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#141414] hover:bg-[#1e1e1e] text-white border border-[#262626] transition-colors"
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
