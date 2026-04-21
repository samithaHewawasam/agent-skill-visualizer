import { useEffect, useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import type { FlowData, Skill, SelectedSkill } from '../types/index.js';

interface FlowDiagramProps {
  flowData: FlowData | null;
  isLoading?: boolean;
  progressMessage?: string;
}

export const FlowDiagram = ({ flowData, isLoading, progressMessage }: FlowDiagramProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (flowData) {
      // Trigger animation when new data arrives
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  }, [flowData]);

  if (!flowData && !isLoading) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #ececec 100%)'
        }}
      >
        <div className="text-center p-8" style={{ animation: 'fadeIn 0.4s ease' }}>
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'var(--primary)',
              boxShadow: '0 8px 24px rgba(248, 150, 128, 0.4)',
              animation: 'glow 3s ease-in-out infinite'
            }}
          >
            <Sparkles className="w-10 h-10" style={{ color: 'white' }} />
          </div>
          <p
            className="mb-2"
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 'var(--fw-bold)',
              color: '#333'
            }}
          >
            Enter a prompt to visualize the flow
          </p>
          <p
            style={{
              fontSize: 'var(--fs-body)',
              color: '#666'
            }}
          >
            See how the LLM selects skills and augments your prompt
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #ececec 100%)'
        }}
      >
        <div className="text-center p-8">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div
              className="rounded-full h-20 w-20 border-4 absolute top-0 left-0"
              style={{
                borderColor: '#e0e0e0',
                animation: 'spin 1s linear infinite'
              }}
            ></div>
            <div
              className="rounded-full h-20 w-20 border-4 absolute top-0 left-0"
              style={{
                borderTopColor: 'var(--primary)',
                borderRightColor: 'var(--secondary)',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                animation: 'spin 1s linear infinite'
              }}
            ></div>
          </div>
          <p
            className="mb-1"
            style={{
              fontSize: 'var(--fs-h3)',
              fontWeight: 'var(--fw-medium)',
              color: '#333'
            }}
          >
            Processing your prompt...
          </p>
          {progressMessage ? (
            <p
              style={{
                fontSize: 'var(--fs-small)',
                color: 'var(--primary)',
                fontWeight: 'var(--fw-medium)',
                animation: 'pulse 2s infinite'
              }}
            >
              {progressMessage}
            </p>
          ) : (
            <p style={{ fontSize: 'var(--fs-small)', color: '#666' }}>
              Analyzing skills and generating flow
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!flowData) return null;

  const getSkillDetails = (skill: Skill): SelectedSkill | null => {
    return flowData.selectedSkills.find(s => s.id === skill.id) || null;
  };

  return (
    <div
      className="h-full overflow-y-auto p-4 md:p-6 lg:p-8"
      style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #ececec 100%)' }}
    >
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* 1. User Prompt Node */}
        <div
          className="text-white rounded-xl p-4 md:p-5 shadow-xl border-2"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            borderColor: 'var(--primary)',
            animation: 'slideIn 0.5s ease'
          }}
        >
          <div
            className="uppercase mb-2 flex items-center gap-2"
            style={{
              fontSize: 'var(--fs-tiny)',
              fontWeight: 'var(--fw-bold)',
              letterSpacing: 'var(--ls-wider)',
              opacity: 0.9
            }}
          >
            <div
              className="w-2 h-2 bg-white rounded-full"
              style={{ animation: 'pulse 2s infinite' }}
            ></div>
            User Input
          </div>
          <div
            style={{
              fontWeight: 'var(--fw-regular)',
              fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-loose)'
            }}
          >
            {flowData.userPrompt.length > 120
              ? flowData.userPrompt.substring(0, 120) + '...'
              : flowData.userPrompt}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        {!flowData.skillsEnabled ? (
          // Simplified 3-step flow when skills disabled
          <>
            {/* Direct LLM Generation - No Skills */}
            <div
              className="text-white rounded-2xl p-4 md:p-5 shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                borderColor: 'rgba(156, 163, 175, 0.5)',
                animation: 'slideIn 0.5s ease'
              }}
            >
              <div
                className="mb-2 flex items-center gap-2"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  fontWeight: 'var(--fw-bold)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--ls-wider)',
                  opacity: 0.9
                }}
              >
                <div
                  className="w-2 h-2 bg-white rounded-full"
                  style={{ animation: 'pulse 2s infinite' }}
                ></div>
                Direct Response (Skills Disabled)
              </div>
              <div
                style={{
                  fontWeight: 'var(--fw-medium)',
                  fontSize: 'var(--fs-body)',
                  lineHeight: 'var(--lh-normal)'
                }}
              >
                Generating response without skill augmentation
              </div>
              <div
                className="mt-3 inline-block px-3 py-1.5 rounded-lg border"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  color: 'rgba(229, 231, 235, 1)',
                  fontFamily: 'var(--font)',
                  background: 'rgba(55, 65, 81, 0.4)',
                  borderColor: 'rgba(156, 163, 175, 0.3)'
                }}
              >
                ✨ {flowData.models.generation.label}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>

            {/* Final Response */}
            <div
              className="text-white rounded-2xl p-4 md:p-5 shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderColor: 'rgba(52, 211, 153, 0.5)',
                animation: 'slideIn 0.5s ease'
              }}
            >
              <div
                className="mb-2 flex items-center gap-2"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  fontWeight: 'var(--fw-bold)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--ls-wider)',
                  opacity: 0.9
                }}
              >
                <div
                  className="w-2 h-2 bg-white rounded-full"
                  style={{ animation: 'pulse 2s infinite' }}
                ></div>
                Final Response
              </div>
              <div
                className="line-clamp-3 rounded-lg p-3 border"
                style={{
                  fontWeight: 'var(--fw-regular)',
                  fontSize: 'var(--fs-body)',
                  lineHeight: 'var(--lh-loose)',
                  background: 'rgba(6, 78, 59, 0.2)',
                  borderColor: 'rgba(52, 211, 153, 0.3)'
                }}
              >
                {flowData.llmResponse.length > 200
                  ? flowData.llmResponse.substring(0, 200) + '...'
                  : flowData.llmResponse}
              </div>
              <div
                className="mt-3"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  opacity: 0.8,
                  fontFamily: 'var(--font)'
                }}
              >
                📊 {flowData.llmResponse.length} characters
              </div>
            </div>
          </>
        ) : (
          // Full 5-step flow when skills enabled
          <>
            {/* 2. Skill Selection Step */}
            <div
              className="text-white rounded-2xl p-4 md:p-5 shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                borderColor: 'rgba(168, 85, 247, 0.5)',
                animation: 'slideIn 0.5s ease'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="mb-2 flex items-center gap-2"
                    style={{
                      fontSize: 'var(--fs-tiny)',
                      fontWeight: 'var(--fw-bold)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--ls-wider)',
                      opacity: 0.9
                    }}
                  >
                    <div
                      className="w-2 h-2 bg-white rounded-full"
                      style={{ animation: 'pulse 2s infinite' }}
                    ></div>
                    Step 1: Skill Selection
                  </div>
                  <div
                    style={{
                      fontWeight: 'var(--fw-medium)',
                      fontSize: 'var(--fs-body)',
                      lineHeight: 'var(--lh-normal)'
                    }}
                  >
                    {flowData.selectedSkills.length} of {flowData.allSkills.length} skills selected
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg border"
                  style={{
                    fontSize: 'var(--fs-tiny)',
                    color: 'rgba(243, 232, 255, 1)',
                    fontFamily: 'var(--font)',
                    background: 'rgba(126, 34, 206, 0.4)',
                    borderColor: 'rgba(168, 85, 247, 0.3)'
                  }}
                >
                  ⚡ {flowData.models.selection.label}
                </div>
              </div>
            </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        {/* 3. All Skills Grid */}
        <div
          className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl border-2"
          style={{
            borderColor: '#e5e7eb',
            animation: 'fadeIn 0.5s ease'
          }}
        >
          <div
            className="mb-5 flex items-center gap-2"
            style={{
              fontSize: 'var(--fs-small)',
              fontWeight: 'var(--fw-bold)',
              color: '#374151',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-wide)'
            }}
          >
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
            Available Skills
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {flowData.allSkills.map((skill) => {
              const selectedDetails = getSkillDetails(skill);
              const isSelected = skill.selected;

              if (isSelected && selectedDetails) {
                // Selected skill with confidence-based styling
                const opacity = 0.5 + (selectedDetails.confidence * 0.5);
                const glowStrength = Math.round(selectedDetails.confidence * 25);

                return (
                  <div
                    key={skill.id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-500 ease-in-out ${
                      animate ? 'scale-100' : 'scale-95'
                    } hover:scale-105 cursor-pointer`}
                    style={{
                      opacity: animate ? opacity : 0.4,
                      boxShadow: animate
                        ? `0 4px ${glowStrength}px rgba(99, 102, 241, ${selectedDetails.confidence * 0.6})`
                        : 'none',
                      borderColor: `rgba(99, 102, 241, ${selectedDetails.confidence})`,
                      backgroundColor: `rgba(238, 242, 255, ${selectedDetails.confidence * 0.9})`,
                    }}
                    title={selectedDetails.reason}
                  >
                    {/* Confidence badge */}
                    <span
                      className="absolute -top-2.5 -right-2.5 text-white rounded-full px-2 py-1 shadow-lg border-2 border-white"
                      style={{
                        fontSize: 'var(--fs-tiny)',
                        fontWeight: 'var(--fw-bold)',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                      }}
                    >
                      {Math.round(selectedDetails.confidence * 100)}%
                    </span>

                    <div
                      className="mb-1.5"
                      style={{
                        fontSize: 'var(--fs-small)',
                        fontWeight: 'var(--fw-bold)',
                        color: '#312e81'
                      }}
                    >
                      {skill.name}
                    </div>
                    <div
                      className="line-clamp-2"
                      style={{
                        fontSize: 'var(--fs-tiny)',
                        color: '#4338ca',
                        lineHeight: 'var(--lh-loose)'
                      }}
                    >
                      {skill.description}
                    </div>
                  </div>
                );
              } else {
                // Unselected skill - muted appearance
                return (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl border-2 bg-gray-50 text-gray-400 opacity-40 transition-all duration-500 hover:opacity-60"
                    style={{
                      borderColor: '#e5e7eb'
                    }}
                    title={skill.description}
                  >
                    <div
                      className="mb-1.5"
                      style={{
                        fontSize: 'var(--fs-small)',
                        fontWeight: 'var(--fw-medium)'
                      }}
                    >
                      {skill.name}
                    </div>
                    <div
                      className="line-clamp-2"
                      style={{
                        fontSize: 'var(--fs-tiny)',
                        lineHeight: 'var(--lh-loose)'
                      }}
                    >
                      {skill.description}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        {/* 4. Prompt Augmentation Step */}
        <div
          className="text-white rounded-2xl p-4 md:p-5 shadow-xl border-2"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            borderColor: 'rgba(251, 146, 60, 0.5)',
            animation: 'slideIn 0.5s ease'
          }}
        >
          <div
            className="mb-2 flex items-center gap-2"
            style={{
              fontSize: 'var(--fs-tiny)',
              fontWeight: 'var(--fw-bold)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ls-wider)',
              opacity: 0.9
            }}
          >
            <div
              className="w-2 h-2 bg-white rounded-full"
              style={{ animation: 'pulse 2s infinite' }}
            ></div>
            Step 2: Prompt Augmentation
          </div>
          <div
            style={{
              fontWeight: 'var(--fw-medium)',
              fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-normal)'
            }}
          >
            Enhanced with {flowData.skillContents.length} skill documentation{flowData.skillContents.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        {/* 5. Response Generation Step */}
        <div
          className="text-white rounded-2xl p-4 md:p-5 shadow-xl border-2"
          style={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            borderColor: 'rgba(45, 212, 191, 0.5)',
            animation: 'slideIn 0.5s ease'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                className="mb-2 flex items-center gap-2"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  fontWeight: 'var(--fw-bold)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--ls-wider)',
                  opacity: 0.9
                }}
              >
                <div
                  className="w-2 h-2 bg-white rounded-full"
                  style={{ animation: 'pulse 2s infinite' }}
                ></div>
                Step 3: Response Generation
              </div>
              <div
                style={{
                  fontWeight: 'var(--fw-medium)',
                  fontSize: 'var(--fs-body)',
                  lineHeight: 'var(--lh-normal)'
                }}
              >
                Generating response with augmented context
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg border"
              style={{
                fontSize: 'var(--fs-tiny)',
                color: 'rgba(204, 251, 241, 1)',
                fontFamily: 'var(--font)',
                background: 'rgba(19, 78, 74, 0.4)',
                borderColor: 'rgba(45, 212, 191, 0.3)'
              }}
            >
              ✨ {flowData.models.generation.label}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

            {/* 6. LLM Response Node */}
            <div
              className="text-white rounded-2xl p-4 md:p-5 shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderColor: 'rgba(52, 211, 153, 0.5)',
                animation: 'slideIn 0.5s ease'
              }}
            >
              <div
                className="mb-2 flex items-center gap-2"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  fontWeight: 'var(--fw-bold)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--ls-wider)',
                  opacity: 0.9
                }}
              >
                <div
                  className="w-2 h-2 bg-white rounded-full"
                  style={{ animation: 'pulse 2s infinite' }}
                ></div>
                Final Response
              </div>
              <div
                className="line-clamp-3 rounded-lg p-3 border"
                style={{
                  fontWeight: 'var(--fw-regular)',
                  fontSize: 'var(--fs-body)',
                  lineHeight: 'var(--lh-loose)',
                  background: 'rgba(6, 78, 59, 0.2)',
                  borderColor: 'rgba(52, 211, 153, 0.3)'
                }}
              >
                {flowData.llmResponse.length > 200
                  ? flowData.llmResponse.substring(0, 200) + '...'
                  : flowData.llmResponse}
              </div>
              <div
                className="mt-3"
                style={{
                  fontSize: 'var(--fs-tiny)',
                  opacity: 0.8,
                  fontFamily: 'var(--font)'
                }}
              >
                📊 {flowData.llmResponse.length} characters
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
