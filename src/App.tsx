import { TypingDisplay } from './components/engine/TypingDisplay';
import { LiveStats } from './components/stats/LiveStats';
import { ResultsScreen } from './components/stats/ResultsScreen';
import { LibraryModal } from './components/modals/LibraryModal';
import { KeyHints } from './components/KeyHints';
import { Footer } from './components/Footer';
import { useTypingStore } from './store/useTypingStore';


function App() {
  const { isFinished } = useTypingStore();

  return (
    <main className="min-h-screen bg-parchment flex flex-col font-sans text-soft-charcoal selection:bg-soft-charcoal selection:text-parchment">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">BuenType</h1>
          <div className="h-6 w-px bg-soft-charcoal/20 mx-2"></div>
          <LiveStats />
        </div>

        <div className="flex items-center gap-6">
          <LibraryModal />
        </div>
      </header>

      {/* Main Content */}
      {/* Main Content */}
      <section className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 relative">

        {/* Typing Area - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <TypingDisplay />
        </div>

        {/* Bottom Hints */}
        <div className="mt-auto pt-6 border-t border-soft-charcoal/10">
          <KeyHints />
        </div>

        <Footer />
      </section>

      {/* Overlays */}
      {isFinished && <ResultsScreen />}
    </main>
  );
}

export default App;
