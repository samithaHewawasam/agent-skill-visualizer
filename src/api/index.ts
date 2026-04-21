import axios from 'axios';
import type { ProcessPromptResponse, Skill, StreamEvent } from '../types/index.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const processPrompt = async (prompt: string, skillsEnabled: boolean): Promise<ProcessPromptResponse> => {
  const response = await api.post<ProcessPromptResponse>('/api/process-prompt', { prompt, skillsEnabled });
  return response.data;
};

export const processPromptStream = (
  prompt: string,
  skillsEnabled: boolean,
  onEvent: (event: StreamEvent) => void,
  onError?: (error: Error) => void,
  onComplete?: () => void
): EventSource => {
  // We need to send the prompt via POST, but EventSource only supports GET
  // So we'll use fetch with streaming instead
  const controller = new AbortController();

  fetch(`${API_BASE_URL}/api/process-prompt-stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, skillsEnabled }),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is null');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onComplete?.();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            // Event type line - we can ignore it for now
            continue;
          }

          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              onEvent(data as StreamEvent);
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        onError?.(error);
      }
    });

  // Return a mock EventSource with close method
  return {
    close: () => controller.abort(),
  } as EventSource;
};

export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await api.get<{ skills: Skill[] }>('/api/skills');
  return response.data.skills;
};

export const healthCheck = async (): Promise<{ status: string; skills: number }> => {
  const response = await api.get('/api/health');
  return response.data;
};
