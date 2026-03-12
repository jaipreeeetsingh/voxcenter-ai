import { providerRegistry } from './provider-registry';
import { costTracker } from './cost-tracker';

interface CallConfig {
  agentId: string;
  phoneNumber: string;
  direction: 'inbound' | 'outbound';
  language: string;
  maxDuration: number;
  recordingEnabled: boolean;
  guardrailsEnabled: boolean;
}

interface CallState {
  id: string;
  status: 'ringing' | 'connected' | 'processing' | 'ended';
  startTime: Date;
  duration: number;
  latencyMs: number;
  turnsCount: number;
  transcript: TranscriptEntry[];
  sentiment: number;
  cost: number;
}

interface TranscriptEntry {
  role: 'agent' | 'user' | 'system';
  content: string;
  timestamp: Date;
  latencyMs: number;
  confidence: number;
}

class CallOrchestrator {
  private activeCalls: Map<string, CallState> = new Map();
  private latencyBuffer: number[] = [];

  async initiateCall(config: CallConfig): Promise<string> {
    const callId = 'call_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const sttProvider = providerRegistry.getProvider('stt');
    const ttsProvider = providerRegistry.getProvider('tts');
    const llmProvider = providerRegistry.getProvider('llm');

    if (!sttProvider || !ttsProvider || !llmProvider) {
      throw new Error('Required providers not available');
    }

    const callState: CallState = {
      id: callId,
      status: 'ringing',
      startTime: new Date(),
      duration: 0,
      latencyMs: 0,
      turnsCount: 0,
      transcript: [],
      sentiment: 0.5,
      cost: 0,
    };

    this.activeCalls.set(callId, callState);
    console.log('Call initiated:', callId, 'with providers:', sttProvider.name, ttsProvider.name, llmProvider.name);
    return callId;
  }

  async processAudioTurn(callId: string, audioChunk: ArrayBuffer): Promise<{ audio: ArrayBuffer; text: string; latencyMs: number }> {
    const call = this.activeCalls.get(callId);
    if (!call) throw new Error('Call not found: ' + callId);

    const startTime = performance.now();
    call.status = 'processing';
    call.turnsCount++;

    const transcribedText = 'Simulated transcription for chunk ' + call.turnsCount;
    const responseText = 'Simulated AI response for turn ' + call.turnsCount;
    const latencyMs = performance.now() - startTime;

    call.transcript.push(
      { role: 'user', content: transcribedText, timestamp: new Date(), latencyMs: 0, confidence: 0.95 },
      { role: 'agent', content: responseText, timestamp: new Date(), latencyMs, confidence: 1.0 }
    );

    this.latencyBuffer.push(latencyMs);
    call.latencyMs = this.getAverageLatency();
    call.status = 'connected';

    costTracker.trackUsage({
      userId: 'default', agentId: 'default', callId,
      provider: 'openai', service: 'llm', units: responseText.length,
      cost: responseText.length * 0.00001, timestamp: new Date(),
    });

    return { audio: new ArrayBuffer(0), text: responseText, latencyMs };
  }

  endCall(callId: string): CallState | null {
    const call = this.activeCalls.get(callId);
    if (!call) return null;
    call.status = 'ended';
    call.duration = (Date.now() - call.startTime.getTime()) / 1000;
    this.activeCalls.delete(callId);
    return call;
  }

  getCallState(callId: string): CallState | null {
    return this.activeCalls.get(callId) || null;
  }

  getActiveCalls(): CallState[] {
    return Array.from(this.activeCalls.values());
  }

  private getAverageLatency(): number {
    if (this.latencyBuffer.length === 0) return 0;
    const recent = this.latencyBuffer.slice(-10);
    return recent.reduce((sum, l) => sum + l, 0) / recent.length;
  }
}

export const callOrchestrator = new CallOrchestrator();
export type { CallConfig, CallState, TranscriptEntry };
