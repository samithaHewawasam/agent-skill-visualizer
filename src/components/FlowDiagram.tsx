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
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="text-center text-gray-500 p-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-bold text-gray-700 mb-2">Enter a prompt to visualize the flow</p>
          <p className="text-sm text-gray-500">See how the LLM selects skills and augments your prompt</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="text-center p-8">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 border-r-purple-600 absolute top-0 left-0"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700 mb-1">Processing your prompt...</p>
          {progressMessage ? (
            <p className="text-sm text-blue-600 font-medium animate-pulse">{progressMessage}</p>
          ) : (
            <p className="text-sm text-gray-500">Analyzing skills and generating flow</p>
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
    <div className="w-full h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-auto p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. User Prompt Node */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-xl border-2 border-blue-400/50">
          <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            User Input
          </div>
          <div className="font-medium text-base leading-relaxed">
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
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-2xl p-5 shadow-xl border-2 border-gray-400/50">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Direct Response (Skills Disabled)
              </div>
              <div className="font-semibold text-base">
                Generating response without skill augmentation
              </div>
              <div className="text-xs text-gray-100 font-mono bg-gray-700/40 px-3 py-1.5 rounded-lg border border-gray-400/30 mt-3 inline-block">
                ✨ {flowData.models.generation.label}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>

            {/* Final Response */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-xl border-2 border-green-400/50">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Final Response
              </div>
              <div className="font-medium text-base line-clamp-3 leading-relaxed bg-green-700/20 rounded-lg p-3 border border-green-400/30">
                {flowData.llmResponse.length > 200
                  ? flowData.llmResponse.substring(0, 200) + '...'
                  : flowData.llmResponse}
              </div>
              <div className="text-xs opacity-80 mt-3 font-mono">
                📊 {flowData.llmResponse.length} characters
              </div>
            </div>
          </>
        ) : (
          // Full 5-step flow when skills enabled
          <>
            {/* 2. Skill Selection Step */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-5 shadow-xl border-2 border-purple-400/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Step 1: Skill Selection
              </div>
              <div className="font-semibold text-base">
                {flowData.selectedSkills.length} of {flowData.allSkills.length} skills selected
              </div>
            </div>
            <div className="text-xs text-purple-100 font-mono bg-purple-700/40 px-3 py-1.5 rounded-lg border border-purple-400/30">
              ⚡ {flowData.models.selection.label}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        {/* 3. All Skills Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-200">
          <div className="text-sm font-bold text-gray-700 mb-5 uppercase tracking-wide flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
            Available Skills
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                    <span className="absolute -top-2.5 -right-2.5 text-xs bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full px-2 py-1 font-bold shadow-lg border-2 border-white">
                      {Math.round(selectedDetails.confidence * 100)}%
                    </span>

                    <div className="text-sm font-bold text-indigo-900 mb-1.5">
                      {skill.name}
                    </div>
                    <div className="text-xs text-indigo-700 line-clamp-2 leading-relaxed">
                      {skill.description}
                    </div>
                  </div>
                );
              } else {
                // Unselected skill - muted appearance
                return (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-400 opacity-40 transition-all duration-500 hover:opacity-60"
                    title={skill.description}
                  >
                    <div className="text-sm font-semibold mb-1.5">
                      {skill.name}
                    </div>
                    <div className="text-xs line-clamp-2 leading-relaxed">
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
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-5 shadow-xl border-2 border-orange-400/50">
          <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Step 2: Prompt Augmentation
          </div>
          <div className="font-semibold text-base">
            Enhanced with {flowData.skillContents.length} skill documentation{flowData.skillContents.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        {/* 5. Response Generation Step */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl p-5 shadow-xl border-2 border-teal-400/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Step 3: Response Generation
              </div>
              <div className="font-semibold text-base">
                Generating response with augmented context
              </div>
            </div>
            <div className="text-xs text-teal-100 font-mono bg-teal-700/40 px-3 py-1.5 rounded-lg border border-teal-400/30">
              ✨ {flowData.models.generation.label}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ChevronDown className="w-7 h-7 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

            {/* 6. LLM Response Node */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-xl border-2 border-green-400/50">
              <div className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Final Response
              </div>
              <div className="font-medium text-base line-clamp-3 leading-relaxed bg-green-700/20 rounded-lg p-3 border border-green-400/30">
                {flowData.llmResponse.length > 200
                  ? flowData.llmResponse.substring(0, 200) + '...'
                  : flowData.llmResponse}
              </div>
              <div className="text-xs opacity-80 mt-3 font-mono">
                📊 {flowData.llmResponse.length} characters
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
