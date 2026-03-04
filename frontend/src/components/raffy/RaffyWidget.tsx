import ChatPanel from './ChatPanel'
import { useRaffy } from '../../contexts/RaffyContext'

export default function RaffyWidget() {
  const { isOpen, toggleRaffy, closeRaffy } = useRaffy()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat panel - slides up when open */}
      <div
        className={`absolute bottom-16 right-0 transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <ChatPanel onClose={closeRaffy} />
      </div>

      {/* Floating chat bubble button */}
      <button
        type="button"
        onClick={toggleRaffy}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        💬
      </button>
    </div>
  )
}
