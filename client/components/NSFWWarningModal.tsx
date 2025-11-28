import { CloseIcon } from "./Icons";

interface NSFWWarningModalProps {
  onProceed: () => void;
  onGoBack: () => void;
}

export default function NSFWWarningModal({
  onProceed,
  onGoBack,
}: NSFWWarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-red-950 border-2 border-red-600 rounded-xl w-full max-w-md p-8 shadow-2xl shadow-red-600/30 animate-fadeIn">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-7 h-7 text-red-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <h2 className="text-3xl font-black text-red-400">NSFW Warning</h2>
            </div>
            <p className="text-sm text-red-200">Adult Content Alert</p>
          </div>
          <button
            onClick={onGoBack}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-5 mb-6">
          <p className="text-sm text-red-100">
            This content contains material that is{" "}
            <strong>Not Safe For Work (NSFW)</strong>. This content may not be
            appropriate for all audiences.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onGoBack}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all active:scale-95"
          >
            Go Back
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all active:scale-95"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
