export type Provider = 'openai' | 'deepgram' | 'elevenlabs' | 'azure' | 'google' | 'aws';
export type ServiceType = 'stt' | 'tts' | 'llm' | 'telephony';

interface ProviderConfig {
    name: string;
    type: ServiceType;
    provider: Provider;
    apiKey?: string;
    region?: string;
    model?: string;
    voice?: string;
    latencyMs: number;
    costPer1k: number;
    isActive: boolean;
    priority: number;
}

interface HealthStatus {
    provider: Provider;
    healthy: boolean;
    latencyMs: number;
    lastCheck: Date;
    errorRate: number;
}

class ProviderRegistry {
    private providers: Map<string, ProviderConfig> = new Map();
    private healthStatus: Map<Provider, HealthStatus> = new Map();
    private failoverRules: Map<Provider, Provider[]> = new Map();

  constructor() {
        this.initializeDefaults();
  }

  private initializeDefaults() {
        this.registerProvider({
                name: 'OpenAI GPT-4o-mini',
                type: 'llm',
                provider: 'openai',
                model: 'gpt-4o-mini',
                latencyMs: 200,
                costPer1k: 0.15,
                isActive: true,
                priority: 1,
        });
        this.registerProvider({
                name: 'Deepgram Nova-2',
                type: 'stt',
                provider: 'deepgram',
                model: 'nova-2',
                latencyMs: 100,
                costPer1k: 0.0043,
                isActive: true,
                priority: 1,
        });
        this.registerProvider({
                name: 'ElevenLabs Turbo v2.5',
                type: 'tts',
                provider: 'elevenlabs',
                model: 'eleven_turbo_v2_5',
                latencyMs: 150,
                costPer1k: 0.18,
                isActive: true,
                priority: 1,
        });
        this.failoverRules.set('openai', ['azure', 'google']);
        this.failoverRules.set('deepgram', ['google', 'azure']);
        this.failoverRules.set('elevenlabs', ['azure', 'google']);
  }

  registerProvider(config: ProviderConfig): void {
        const key = `${config.type}:${config.provider}:${config.name}`;
        this.providers.set(key, config);
  }

            getProvider(type: ServiceType, preferredProvider?: Provider): ProviderConfig | null {
                  const candidates = Array.from(this.providers.values())
                    .filter(p => p.type === type && p.isActive)
                    .sort((a, b) => a.priority - b.priority);

      if (preferredProvider) {
              const preferred = candidates.find(p => p.provider === preferredProvider);
              if (preferred) {
                        const health = this.healthStatus.get(preferred.provider);
                        if (!health || health.healthy) return preferred;
              }
      }

      for (const candidate of candidates) {
              const health = this.healthStatus.get(candidate.provider);
              if (!health || health.healthy) return candidate;
      }

      return candidates[0] || null;
            }

  async getFailover(failedProvider: Provider, type: ServiceType): Promise<ProviderConfig | null> {
        const fallbacks = this.failoverRules.get(failedProvider) || [];
        for (const fallback of fallbacks) {
                const provider = this.getProvider(type, fallback);
                if (provider) {
                          console.log(`Failover: ${failedProvider} -> ${fallback} for ${type}`);
                          return provider;
                }
        }
        return null;
  }

  updateHealth(provider: Provider, status: Partial<HealthStatus>): void {
        const current = this.healthStatus.get(provider) || {
                provider,
                healthy: true,
                latencyMs: 0,
                lastCheck: new Date(),
                errorRate: 0,
        };
        this.healthStatus.set(provider, { ...current, ...status, lastCheck: new Date() });
  }

  getHealthDashboard(): HealthStatus[] {
        return Array.from(this.healthStatus.values());
  }

  getAllProviders(): ProviderConfig[] {
        return Array.from(this.providers.values());
  }

  swapProvider(type: ServiceType, from: Provider, to: Provider): boolean {
        const fromKey = Array.from(this.providers.entries())
          .find(([_, v]) => v.type === type && v.provider === from);
        const toKey = Array.from(this.providers.entries())
          .find(([_, v]) => v.type === type && v.provider === to);

      if (fromKey && toKey) {
              const fromConfig = fromKey[1];
              const toConfig = toKey[1];
              fromConfig.isActive = false;
              toConfig.isActive = true;
              toConfig.priority = fromConfig.priority;
              this.providers.set(fromKey[0], fromConfig);
              this.providers.set(toKey[0], toConfig);
              return true;
      }
        return false;
  }
}

export const providerRegistry = new ProviderRegistry();
export type { ProviderConfig, HealthStatus };
