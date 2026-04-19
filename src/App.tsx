import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Sparkles, Eye } from 'lucide-react';
import { FlowDiagram } from './components/FlowDiagram';
import { ResponseModal } from './components/ResponseModal';
import type { FlowData } from './types/index.js';
import { processPromptStream } from './api';

function App() {
  const [prompt, setPrompt] = useState('');
  const [flowData, setFlowData] = useState<FlowData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Agent Skill Visualizer</h1>
              <p className="text-sm text-gray-400">
                See how LLM selects skills and augments prompts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Prompt Input */}
        <div className="w-[420px] flex-shrink-0 border-r border-gray-700 bg-gradient-to-b from-gray-900/50 to-gray-900/80 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Prompt Input Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="prompt" className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-200">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    Enter your prompt
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your development task here..."
                    className="w-full h-36 px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none transition-all duration-200 shadow-inner"
                    disabled={isLoading}
                  />
                </div>

                {/* Example Prompts */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-2.5 uppercase tracking-wide">Quick Examples</p>
                  <div className="flex flex-col gap-2">
                    {examplePrompts.map((example, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPrompt(example)}
                        className="text-xs px-3.5 py-2 bg-gray-700/50 hover:bg-gray-600/70 border border-gray-600/50 hover:border-gray-500 rounded-lg transition-all duration-200 text-left text-gray-300 hover:text-white"
                        disabled={isLoading}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Toggle Section */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-gray-300">
                      Enable Skills
                    </span>
                    <div
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      style={{
                        backgroundColor: skillsEnabled ? 'rgb(59, 130, 246)' : 'rgb(107, 114, 128)'
                      }}
                      onClick={() => !isLoading && setSkillsEnabled(!skillsEnabled)}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                          skillsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>
                  <p className="text-xs text-gray-400 mt-2">
                    {skillsEnabled
                      ? 'Skills will be analyzed and used to augment prompts'
                      : 'Direct LLM response without skill selection'}
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200 text-sm backdrop-blur-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Visualize Flow
                    </>
                  )}
                </button>

                {/* Progress Message */}
                {isLoading && progressMessage && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm text-center animate-pulse">
                    {progressMessage}
                  </div>
                )}
              </form>
            </div>

            {/* View Response Button */}
            {flowData && flowData.llmResponse && (
              <div className="mt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Eye className="w-5 h-5" />
                  View Full Response
                </button>
              </div>
            )}
          </div>

          {/* Stats Panel - Fixed at bottom */}
          {flowData && (
            <div className="flex-shrink-0 p-6 pt-0 space-y-4">
              <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-5 border border-gray-700/50 backdrop-blur-sm">
                <div className="border-b border-gray-700/50 pb-3 mb-4">
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Analysis Results
                  </h3>
                </div>
                <div className="space-y-4">
                  {flowData.skillsEnabled ? (
                    <>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
                        <h4 className="text-xs font-medium text-purple-300 mb-1.5">Skills Selected</h4>
                        <p className="text-3xl font-bold text-purple-400">{flowData.selectedSkills.length}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                        <h4 className="text-xs font-medium text-green-300 mb-1.5">Avg Confidence</h4>
                        <p className="text-3xl font-bold text-green-400">
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
                    <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-3">
                      <h4 className="text-xs font-medium text-gray-300 mb-1.5">Skills Status</h4>
                      <p className="text-lg font-bold text-gray-400">Disabled</p>
                    </div>
                  )}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                    <h4 className="text-xs font-medium text-blue-300 mb-1.5">Response Length</h4>
                    <p className="text-3xl font-bold text-blue-400">
                      {flowData.llmResponse.length}
                      <span className="text-xs text-gray-400 font-normal ml-2">chars</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Main Area - Flow Diagram */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="flex-shrink-0 px-8 py-5 border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold flex items-center gap-3 text-gray-100">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              Skill Selection & Augmentation Flow
            </h2>
          </div>
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden shadow-inner">
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
    </div>
  );
}

export default App;
