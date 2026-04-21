import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Sparkles, Eye, FileText } from 'lucide-react';
import { FlowDiagram } from './components/FlowDiagram';
import { ResponseModal } from './components/ResponseModal';
import { PromptModal } from './components/PromptModal';
import type { FlowData } from './types/index.js';
import { processPromptStream } from './api';

function App() {
  const [prompt, setPrompt] = useState('');
  const [flowData, setFlowData] = useState<FlowData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const [skillsEnabled, setSkillsEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('skillsEnabled');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('skillsEnabled', JSON.stringify(skillsEnabled));
    } catch {
      // Silently fail if localStorage unavailable
    }
  }, [skillsEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setIsLoading(true);
    setError(null);
    setFlowData(null);
    setProgressMessage('Starting...');

    try {
      eventSourceRef.current = processPromptStream(
        prompt,
        skillsEnabled,
        (event) => {
          // Handle different event types
          if (event.message) {
            setProgressMessage(event.message);
          }

          if (event.allSkills) {
            // Update with initial skills or selected skills
            setFlowData((prev) => ({
              ...prev!,
              userPrompt: event.userPrompt || prompt,
              allSkills: event.allSkills!,
              selectedSkills: event.selectedSkills || [],
              augmentedPrompt: '',
              skillContents: [],
              llmResponse: '',
              skillsEnabled: event.skillsEnabled ?? skillsEnabled,
              models: prev?.models || {
                selection: { id: '', label: '', step: '' },
                generation: { id: '', label: '', step: '' },
              },
            }));
          }

          if (event.selectedSkills) {
            // Update with selected skills
            setFlowData((prev) => ({
              ...prev!,
              selectedSkills: event.selectedSkills!,
              allSkills: event.allSkills || prev!.allSkills,
            }));
          }

          if (event.flow) {
            // Final complete event
            setFlowData(event.flow);
            setProgressMessage('Complete!');
          }

          if (event.error) {
            setError(event.error);
          }
        },
        (err) => {
          setError(err.message || 'Failed to process prompt');
          console.error('Error processing prompt:', err);
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          setProgressMessage('');
        }
      );
    } catch (err: any) {
      setError(err.message || 'Failed to process prompt');
      console.error('Error processing prompt:', err);
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    'Create a new list page with search and pagination',
    'Build a form with validation using react-hook-form',
    'Implement a card-based layout with GenericCard',
    'Add a new route and menu item to the application',
  ];

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <div
        className="border-b flex-shrink-0"
        style={{
          borderColor: 'var(--border)',
          background: 'linear-gradient(180deg, rgba(248,150,128,0.05) 0%, var(--bg) 100%)'
        }}
      >
        <div className="px-4 md:px-8 py-4 md:py-5">
          <div className="flex items-center gap-3 md:gap-4">
            <div
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full"
              style={{
                background: 'var(--primary)',
                boxShadow: '0 0 20px rgba(248, 150, 128, 0.3)',
                animation: 'glow 3s ease-in-out infinite'
              }}
            >
              <Sparkles className="w-5 h-5 md:w-7 md:h-7" style={{ color: 'var(--bg)' }} />
            </div>
            <div>
              <h1
                className="font-bold text-xl md:text-2xl lg:text-3xl"
                style={{
                  fontWeight: 'var(--fw-bold)',
                  lineHeight: 'var(--lh-tight)',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Agent Skill Visualizer
              </h1>
              <p
                className="mt-1 text-xs md:text-sm"
                style={{
                  color: 'var(--muted)'
                }}
              >
                See how LLM selects skills and augments prompts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] overflow-hidden">
        {/* Left Sidebar - Prompt Input */}
        <div
          className="flex flex-col lg:border-r overflow-hidden"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Prompt Input Section */}
            <div
              className="rounded-xl p-4 md:p-6 border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                animation: 'fadeIn 0.4s ease'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label
                    htmlFor="prompt"
                    className="block mb-2 md:mb-3 flex items-center gap-2"
                    style={{
                      fontSize: 'var(--fs-tiny)',
                      fontWeight: 'var(--fw-medium)',
                      letterSpacing: 'var(--ls-wider)',
                      color: 'var(--primary)',
                      textTransform: 'uppercase'
                    }}
                  >
                    <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                    Enter your prompt
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your development task here..."
                    className="w-full h-28 md:h-36 px-3 md:px-4 py-2 md:py-3 rounded-lg resize-none transition-all text-sm md:text-base"
                    style={{
                      background: 'var(--primary-dk)',
                      border: `1px solid var(--border)`,
                      color: 'var(--text)',
                      fontSize: 'var(--fs-body)',
                      lineHeight: 'var(--lh-normal)',
                      fontFamily: 'var(--font)',
                      transition: 'all var(--duration-fast) var(--ease-out)'
                    }}
                    disabled={isLoading}
                  />
                </div>

                {/* Example Prompts */}
                <div>
                  <p
                    className="mb-2 md:mb-2.5 uppercase"
                    style={{
                      fontSize: 'var(--fs-tiny)',
                      fontWeight: 'var(--fw-medium)',
                      color: 'var(--dim-t)',
                      letterSpacing: 'var(--ls-wide)'
                    }}
                  >
                    Quick Examples
                  </p>
                  <div className="flex flex-col gap-2">
                    {examplePrompts.map((example, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(example)}
                        className="px-3 md:px-3.5 py-2 rounded-lg text-left transition-all text-xs md:text-sm"
                        style={{
                          background: 'var(--dim)',
                          border: `1px solid var(--border)`,
                          color: 'var(--muted)',
                          cursor: isLoading ? 'not-allowed' : 'pointer',
                          opacity: isLoading ? 0.4 : 1,
                          transition: 'all var(--duration-fast) var(--ease-out)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isLoading) {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.color = 'var(--text)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.color = 'var(--muted)';
                        }}
                        disabled={isLoading}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Toggle Section */}
                <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border)' }}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      Enable Skills
                    </span>
                    <div
                      className={`relative inline-flex h-6 w-11 md:h-7 md:w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      style={{
                        backgroundColor: skillsEnabled ? 'rgb(59, 130, 246)' : 'rgb(107, 114, 128)'
                      }}
                      onClick={() => !isLoading && setSkillsEnabled(!skillsEnabled)}
                    >
                      <span
                        className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                          skillsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>
                  <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
                    {skillsEnabled
                      ? 'Skills will be analyzed and used to augment prompts'
                      : 'Direct LLM response without skill selection'}
                  </p>
                </div>

                {error && (
                  <div
                    className="p-3 md:p-3.5 rounded-lg text-sm"
                    style={{
                      background: 'rgba(255, 107, 107, 0.1)',
                      border: `1px solid var(--error)`,
                      color: 'var(--error)',
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Progress Message */}
                {isLoading && progressMessage && (
                  <div
                    className="p-3 rounded-lg text-center text-sm"
                    style={{
                      background: 'rgba(248, 150, 128, 0.1)',
                      border: `1px solid var(--primary)`,
                      color: 'var(--primary)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    {progressMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Stats Panel */}
            {flowData && (
              <div
                className="rounded-xl p-4 md:p-5 border"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  animation: 'slideIn 0.5s ease'
                }}
              >
                <div
                  className="pb-3 mb-4"
                  style={{ borderBottom: `1px solid var(--border)` }}
                >
                  <h3
                    className="uppercase flex items-center gap-2 text-xs md:text-sm"
                    style={{
                      fontWeight: 'var(--fw-bold)',
                      color: 'var(--text)',
                      letterSpacing: 'var(--ls-wider)'
                    }}
                  >
                    <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" style={{ color: 'var(--primary)' }} />
                    Analysis Results
                  </h3>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {flowData.skillsEnabled ? (
                    <>
                      <div
                        className="rounded-xl p-3 border"
                        style={{
                          background: 'rgba(248, 150, 128, 0.1)',
                          borderColor: 'var(--primary)',
                          animation: 'bounceIn 0.6s ease'
                        }}
                      >
                        <h4
                          className="mb-1.5 text-xs"
                          style={{
                            fontWeight: 'var(--fw-medium)',
                            color: 'var(--primary)'
                          }}
                        >
                          Skills Selected
                        </h4>
                        <p
                          className="text-3xl md:text-4xl"
                          style={{
                            fontWeight: 'var(--fw-bold)',
                            color: 'var(--primary)'
                          }}
                        >
                          {flowData.selectedSkills.length}
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-3 border"
                        style={{
                          background: 'rgba(255, 157, 126, 0.1)',
                          borderColor: 'var(--ok)',
                          animation: 'bounceIn 0.6s ease'
                        }}
                      >
                        <h4
                          className="mb-1.5 text-xs"
                          style={{
                            fontWeight: 'var(--fw-medium)',
                            color: 'var(--ok)'
                          }}
                        >
                          Avg Confidence
                        </h4>
                        <p
                          className="text-3xl md:text-4xl"
                          style={{
                            fontWeight: 'var(--fw-bold)',
                            color: 'var(--ok)'
                          }}
                        >
                          {flowData.selectedSkills.length > 0
                            ? Math.round(
                                flowData.selectedSkills.reduce((acc, s) => acc + s.confidence, 0) /
                                  flowData.selectedSkills.length *
                                  100
                              )
                            : 0}
                          %
                        </p>
                      </div>
                    </>
                  ) : (
                    <div
                      className="rounded-xl p-3 border"
                      style={{
                        background: 'rgba(154, 154, 154, 0.1)',
                        borderColor: 'var(--muted)'
                      }}
                    >
                      <h4
                        className="mb-1.5 text-xs"
                        style={{
                          fontWeight: 'var(--fw-medium)',
                          color: 'var(--muted)'
                        }}
                      >
                        Skills Status
                      </h4>
                      <p
                        className="text-xl"
                        style={{
                          fontWeight: 'var(--fw-bold)',
                          color: 'var(--muted)'
                        }}
                      >
                        Disabled
                      </p>
                    </div>
                  )}
                  <div
                    className="rounded-xl p-3 border"
                    style={{
                      background: 'rgba(255, 166, 138, 0.1)',
                      borderColor: 'var(--highlight)',
                      animation: 'bounceIn 0.6s ease'
                    }}
                  >
                    <h4
                      className="mb-1.5 text-xs"
                      style={{
                        fontWeight: 'var(--fw-medium)',
                        color: 'var(--highlight)'
                      }}
                    >
                      Response Length
                    </h4>
                    <p
                      className="text-3xl md:text-4xl"
                      style={{
                        fontWeight: 'var(--fw-bold)',
                        color: 'var(--highlight)'
                      }}
                    >
                      {flowData.llmResponse.length}
                      <span
                        className="ml-2 text-xs"
                        style={{
                          fontWeight: 'var(--fw-light)',
                          color: 'var(--muted)'
                        }}
                      >
                        chars
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Bottom Buttons - Stick to bottom */}
          <div
            className="flex-shrink-0 p-4 md:p-6 space-y-3 border-t"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* View Buttons */}
            {flowData && flowData.llmResponse && (
              <div className="space-y-2 md:space-y-3" style={{ animation: 'slideIn 0.5s ease' }}>
                <button
                  onClick={() => setIsPromptModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 font-semibold rounded-lg transition-all text-sm md:text-base"
                  style={{
                    background: 'var(--accent)',
                    border: `1px solid var(--accent)`,
                    color: 'var(--bg)',
                    fontWeight: 'var(--fw-medium)',
                    boxShadow: '0 4px 12px rgba(255, 123, 95, 0.3)',
                    transition: 'all var(--duration-normal) var(--ease-out)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--highlight)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 123, 95, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--accent)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 123, 95, 0.3)';
                  }}
                >
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  View Augmented Prompt
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 font-semibold rounded-lg transition-all text-sm md:text-base"
                  style={{
                    background: 'var(--ok)',
                    border: `1px solid var(--ok)`,
                    color: 'var(--bg)',
                    fontWeight: 'var(--fw-medium)',
                    boxShadow: '0 4px 12px rgba(255, 157, 126, 0.3)',
                    transition: 'all var(--duration-normal) var(--ease-out)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--secondary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 157, 126, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--ok)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 157, 126, 0.3)';
                  }}
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  View LLM Response
                </button>
              </div>
            )}

            {/* Submit Button - Always visible */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-3.5 rounded-lg font-semibold transition-all text-sm md:text-base"
              style={{
                background: isLoading || !prompt.trim() ? 'var(--dim)' : 'var(--primary)',
                border: `1px solid ${isLoading || !prompt.trim() ? 'var(--border)' : 'var(--primary)'}`,
                color: isLoading || !prompt.trim() ? 'var(--muted)' : 'var(--bg)',
                fontWeight: 'var(--fw-medium)',
                cursor: isLoading || !prompt.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !prompt.trim() ? 0.4 : 1,
                boxShadow: isLoading || !prompt.trim() ? 'none' : '0 4px 12px rgba(248, 150, 128, 0.3)',
                transition: 'all var(--duration-normal) var(--ease-out)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && prompt.trim()) {
                  e.currentTarget.style.background = 'var(--secondary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 150, 128, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && prompt.trim()) {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(248, 150, 128, 0.3)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    className="rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2"
                    style={{
                      animation: 'spin 1s linear infinite',
                      borderColor: 'var(--muted)'
                    }}
                  ></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                  Visualize Flow
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Main Area - Flow Diagram */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ background: 'var(--bg)' }}
        >
          <div
            className="flex-shrink-0 px-4 md:px-8 py-4 md:py-5 border-b"
            style={{
              borderColor: 'var(--border)',
              background: 'linear-gradient(180deg, rgba(248,150,128,0.05) 0%, var(--bg) 100%)'
            }}
          >
            <h2 className="flex items-center gap-2 md:gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg"
                style={{
                  background: 'var(--primary)',
                  boxShadow: '0 0 15px rgba(248, 150, 128, 0.3)'
                }}
              >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--bg)' }} />
              </div>
              <span
                className="text-lg md:text-xl lg:text-2xl"
                style={{
                  fontWeight: 'var(--fw-bold)',
                  color: 'var(--text)'
                }}
              >
                Skill Selection & Augmentation Flow
              </span>
            </h2>
          </div>
          <div
            className="flex-1 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f5f5f5 0%, #ececec 100%)'
            }}
          >
            <FlowDiagram flowData={flowData} isLoading={isLoading} progressMessage={progressMessage} />
          </div>
        </div>
      </div>

      {/* Response Modal */}
      <ResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        response={flowData?.llmResponse || ''}
        prompt={flowData?.userPrompt || prompt}
      />

      {/* Prompt Modal */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        augmentedPrompt={flowData?.augmentedPrompt || ''}
        userPrompt={flowData?.userPrompt || prompt}
        selectedSkills={flowData?.selectedSkills || []}
      />
    </div>
  );
}

export default App;
