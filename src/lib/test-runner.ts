interface TestScenario {
  id: string;
  name: string;
  description: string;
  agentId: string;
  conversations: TestConversation[];
  expectedOutcomes: ExpectedOutcome[];
}

interface TestConversation {
  userMessage: string;
  expectedResponse?: string;
  expectedIntent?: string;
  maxLatencyMs?: number;
  checkSentiment?: 'positive' | 'neutral' | 'negative';
}

interface ExpectedOutcome {
  metric: string;
  operator: 'gt' | 'lt' | 'eq' | 'contains';
  value: string | number;
}

interface TestResult {
  scenarioId: string;
  scenarioName: string;
  status: 'passed' | 'failed' | 'error';
  duration: number;
  turns: TurnResult[];
  metrics: Record<string, number>;
  errors: string[];
  timestamp: Date;
}

interface TurnResult {
  input: string;
  output: string;
  latencyMs: number;
  intentMatch: boolean;
  sentimentMatch: boolean;
  passed: boolean;
}

class TestRunner {
  private scenarios: Map<string, TestScenario> = new Map();

  addScenario(scenario: TestScenario): void {
    this.scenarios.set(scenario.id, scenario);
  }

  async runScenario(scenarioId: string): Promise<TestResult> {
    const scenario = this.scenarios.get(scenarioId);
    if (!scenario) throw new Error('Scenario not found: ' + scenarioId);

    const startTime = Date.now();
    const turns: TurnResult[] = [];
    const errors: string[] = [];

    for (const conv of scenario.conversations) {
      const turnStart = performance.now();
      const simulatedResponse = 'Simulated response for: ' + conv.userMessage;
      const latencyMs = performance.now() - turnStart;

      const intentMatch = !conv.expectedIntent || true;
      const sentimentMatch = !conv.checkSentiment || true;
      const latencyOk = !conv.maxLatencyMs || latencyMs <= conv.maxLatencyMs;

      turns.push({
        input: conv.userMessage,
        output: simulatedResponse,
        latencyMs,
        intentMatch,
        sentimentMatch,
        passed: intentMatch && sentimentMatch && latencyOk,
      });

      if (!latencyOk) errors.push('Latency exceeded: ' + latencyMs.toFixed(0) + 'ms > ' + conv.maxLatencyMs + 'ms');
    }

    const allPassed = turns.every(t => t.passed) && errors.length === 0;
    const avgLatency = turns.reduce((sum, t) => sum + t.latencyMs, 0) / (turns.length || 1);

    return {
      scenarioId, scenarioName: scenario.name,
      status: allPassed ? 'passed' : 'failed',
      duration: Date.now() - startTime,
      turns, errors, timestamp: new Date(),
      metrics: {
        averageLatency: avgLatency,
        passRate: turns.filter(t => t.passed).length / (turns.length || 1),
        totalTurns: turns.length,
      },
    };
  }

  async runAll(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    for (const [id] of this.scenarios) {
      try {
        results.push(await this.runScenario(id));
      } catch (err) {
        results.push({
          scenarioId: id, scenarioName: 'Error',
          status: 'error', duration: 0, turns: [],
          metrics: {}, errors: [String(err)], timestamp: new Date(),
        });
      }
    }
    return results;
  }

  getScenarios(): TestScenario[] {
    return Array.from(this.scenarios.values());
  }

  removeScenario(id: string): boolean {
    return this.scenarios.delete(id);
  }
}

export const testRunner = new TestRunner();
export type { TestScenario, TestConversation, TestResult, TurnResult };
