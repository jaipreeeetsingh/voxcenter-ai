export interface GuardrailConfig {
    maxResponseLength: number;
    blockedTopics: string[];
    factCheckEnabled: boolean;
}

export interface GuardrailResult {
    passed: boolean;
    violations: string[];
}

export class GuardrailEngine {
    private config: GuardrailConfig;
    private kb: Map<string, string> = new Map();

  constructor(config?: Partial<GuardrailConfig>) {
        this.config = {
                maxResponseLength: 500,
                blockedTopics: ['competitor_pricing', 'internal_data'],
                factCheckEnabled: true,
                ...config,
        };
  }

  async check(response: string): Promise<GuardrailResult> {
        const v: string[] = [];
        if (response.length > this.config.maxResponseLength) v.push('Too long');
        for (const t of this.config.blockedTopics) {
                if (response.toLowerCase().includes(t)) v.push('Blocked: ' + t);
        }
        return { passed: v.length === 0, violations: v };
  }

  addKnowledge(k: string, val: string) { this.kb.set(k, val); }
}

export const guardrails = new GuardrailEngine();
