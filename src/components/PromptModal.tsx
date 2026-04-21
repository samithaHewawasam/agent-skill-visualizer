import { X, Copy, Check, FileText } from 'lucide-react';
import { useState } from 'react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  augmentedPrompt: string;
  userPrompt: string;
  selectedSkills: any[];
}

export const PromptModal = ({ isOpen, onClose, augmentedPrompt, userPrompt, selectedSkills }: PromptModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(augmentedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm"
      style={{ background: 'rgba(26, 26, 26, 0.8)' }}
      onClick={onClose}
    >
      <div
        className="rounded-xl md:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-100 opacity-100 border"
        style={{
          background: 'var(--bg)',
          borderColor: 'var(--border)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 md:p-6 border-b"
          style={{
            borderColor: 'var(--border)',
            background: 'linear-gradient(90deg, rgba(248, 150, 128, 0.1) 0%, var(--surface) 100%)'
          }}
        >
          <div className="flex-1 min-w-0 mr-2 md:mr-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-2 md:gap-3" style={{ color: 'var(--text)' }}>
              <FileText className="w-5 h-5 md:w-7 md:h-7" style={{ color: 'var(--primary)' }} />
              Final LLM Prompt
            </h2>
            <p className="text-xs md:text-sm mt-1 md:mt-2" style={{ color: 'var(--muted)' }}>
              This is the complete prompt sent to the LLM after augmenting with {selectedSkills.length} selected skill{selectedSkills.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Copy prompt"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-gray-300" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8" style={{ background: 'var(--bg)' }}>
          {/* Original User Prompt */}
          <div className="mb-4 md:mb-6 p-3 md:p-5 bg-blue-900/20 border border-blue-600/30 rounded-xl">
            <h3 className="text-xs md:text-sm font-bold text-blue-300 uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Original User Prompt
            </h3>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap font-mono text-xs md:text-sm bg-gray-900/50 p-3 md:p-4 rounded-lg border border-gray-700">
              {userPrompt}
            </p>
          </div>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="mb-4 md:mb-6 p-3 md:p-5 bg-purple-900/20 border border-purple-600/30 rounded-xl">
              <h3 className="text-xs md:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Skills Added to Prompt ({selectedSkills.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {selectedSkills.map((skill, idx) => (
                  <div
                    key={skill.id}
                    className="bg-gray-900/50 border border-gray-700 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {skill.description}
                        </p>
                        {skill.confidence !== undefined && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                style={{ width: `${skill.confidence * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-purple-400">
                              {Math.round(skill.confidence * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Augmented Prompt */}
          <div className="mb-2 p-3 md:p-5 bg-green-900/20 border border-green-600/30 rounded-xl">
            <h3 className="text-xs md:text-sm font-bold text-green-300 uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Complete Augmented Prompt Sent to LLM
            </h3>
            <div className="relative">
              <pre className="text-gray-200 leading-relaxed whitespace-pre-wrap font-mono text-xs bg-gray-900/70 p-3 md:p-6 rounded-lg border border-gray-700 max-h-64 md:max-h-96 overflow-y-auto">
                {augmentedPrompt || 'No augmented prompt available'}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 md:p-6 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="text-xs md:text-sm text-center sm:text-left" style={{ color: 'var(--muted)' }}>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-4">
              <span>{augmentedPrompt.length.toLocaleString()} characters</span>
              <span className="text-gray-600">•</span>
              <span>{augmentedPrompt.split(/\s+/).filter(Boolean).length.toLocaleString()} words</span>
              <span className="text-gray-600">•</span>
              <span className="font-medium" style={{ color: 'var(--primary)' }}>{selectedSkills.length} skills injected</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold transition-all text-sm md:text-base w-full sm:w-auto"
            style={{
              background: 'var(--primary)',
              color: 'var(--bg)',
              border: `1px solid var(--primary)`,
              boxShadow: '0 4px 12px rgba(248, 150, 128, 0.3)',
              transition: 'all var(--duration-normal) var(--ease-out)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--secondary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 150, 128, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(248, 150, 128, 0.3)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
