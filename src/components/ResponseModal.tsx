import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: string;
  prompt: string;
}

export const ResponseModal = ({ isOpen, onClose, response, prompt }: ResponseModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
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
        className="rounded-xl md:rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-100 opacity-100 border"
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
            background: 'linear-gradient(90deg, var(--surface) 0%, var(--dim) 100%)'
          }}
        >
          <div className="flex-1 min-w-0 mr-2 md:mr-4">
            <h2
              className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl"
              style={{
                fontWeight: 'var(--fw-bold)',
                color: 'var(--text)'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              Generated Response
            </h2>
            <p
              className="mt-1 truncate"
              style={{
                fontSize: 'var(--fs-small)',
                color: 'var(--muted)'
              }}
            >
              For prompt: "{prompt.substring(0, 60)}{prompt.length > 60 ? '...' : ''}"
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: 'transparent',
                color: copied ? 'var(--ok)' : 'var(--muted)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dim)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label="Copy response"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ background: 'transparent', color: 'var(--muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dim)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
          style={{ background: 'var(--bg)' }}
        >
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: '1.5em 0',
                        borderRadius: '0.75rem',
                        fontSize: '0.9rem',
                        border: '1px solid #374151',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-800 text-pink-400 px-2 py-1 rounded text-sm font-mono border border-gray-700"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-white mb-6 mt-8 pb-3 border-b border-gray-700">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-white mb-4 mt-6 pb-2 border-b border-gray-700">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold text-white mb-3 mt-5">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-semibold text-gray-200 mb-2 mt-4">
                    {children}
                  </h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-lg font-semibold text-gray-200 mb-2 mt-3">
                    {children}
                  </h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-base font-semibold text-gray-300 mb-2 mt-3">
                    {children}
                  </h6>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4 text-base">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300 leading-relaxed">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-gray-800/50 rounded-r-lg italic text-gray-300">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-white">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-200">
                    {children}
                  </em>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-800">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="bg-gray-900">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="border-b border-gray-700">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-gray-700 last:border-r-0">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700 last:border-r-0">
                    {children}
                  </td>
                ),
                hr: () => (
                  <hr className="my-6 border-gray-700" />
                ),
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 md:p-6 border-t"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--surface)'
          }}
        >
          <div
            className="text-center sm:text-left text-xs md:text-sm"
            style={{
              color: 'var(--muted)'
            }}
          >
            {response.length.toLocaleString()} characters • {response.split(/\s+/).filter(Boolean).length.toLocaleString()} words
          </div>
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold transition-all text-sm md:text-base w-full sm:w-auto"
            style={{
              background: 'var(--primary)',
              color: 'var(--bg)',
              border: `1px solid var(--primary)`,
              fontSize: 'var(--fs-small)',
              fontWeight: 'var(--fw-medium)',
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
