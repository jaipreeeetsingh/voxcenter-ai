interface SentimentResult {
  score: number;
  label: 'positive' | 'neutral' | 'negative';
  confidence: number;
  keywords: string[];
}

interface IntentResult {
  intent: string;
  confidence: number;
  entities: { type: string; value: string }[];
  suggestedAction: string;
}

interface ConversationAnalytics {
  callId: string;
  averageSentiment: number;
  sentimentTrend: number[];
  topIntents: IntentResult[];
  talkRatio: { agent: number; user: number };
  silencePercentage: number;
  interruptionCount: number;
  keyTopics: string[];
  summary: string;
  actionItems: string[];
  escalationRisk: number;
}

class ConversationIntelligence {
  analyzeSentiment(text: string): SentimentResult {
    const positiveWords = ['great', 'thanks', 'perfect', 'excellent', 'happy', 'love', 'wonderful', 'amazing'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'disappointed', 'worst'];
    const words = text.toLowerCase().split(/\s+/);
    const posCount = words.filter(w => positiveWords.includes(w)).length;
    const negCount = words.filter(w => negativeWords.includes(w)).length;
    const total = posCount + negCount || 1;
    const score = (posCount - negCount) / total;
    const normalizedScore = (score + 1) / 2;
    return {
      score: normalizedScore,
      label: normalizedScore > 0.6 ? 'positive' : normalizedScore < 0.4 ? 'negative' : 'neutral',
      confidence: 0.85,
      keywords: words.filter(w => positiveWords.includes(w) || negativeWords.includes(w)),
    };
  }

  detectIntent(text: string): IntentResult {
    const intents: Record<string, string[]> = {
      'billing_inquiry': ['bill', 'charge', 'payment', 'invoice', 'price', 'cost'],
      'technical_support': ['error', 'broken', 'fix', 'issue', 'problem', 'bug'],
      'account_management': ['account', 'password', 'login', 'profile', 'settings'],
      'cancellation': ['cancel', 'terminate', 'end', 'stop', 'close'],
      'general_inquiry': ['how', 'what', 'when', 'where', 'help', 'information'],
    };
    const lower = text.toLowerCase();
    let bestIntent = 'general_inquiry';
    let bestScore = 0;
    for (const [intent, keywords] of Object.entries(intents)) {
      const matches = keywords.filter(k => lower.includes(k)).length;
      if (matches > bestScore) { bestScore = matches; bestIntent = intent; }
    }
    return {
      intent: bestIntent,
      confidence: Math.min(0.5 + bestScore * 0.15, 0.95),
      entities: [],
      suggestedAction: 'Route to ' + bestIntent.replace('_', ' ') + ' team',
    };
  }

  generateSummary(transcript: { role: string; content: string }[]): string {
    const turns = transcript.length;
    const agentTurns = transcript.filter(t => t.role === 'agent').length;
    const userTurns = transcript.filter(t => t.role === 'user').length;
    return 'Conversation with ' + turns + ' turns (' + agentTurns + ' agent, ' + userTurns + ' user). ';
  }

  extractActionItems(transcript: { role: string; content: string }[]): string[] {
    const actionKeywords = ['will', 'going to', 'schedule', 'follow up', 'send', 'create', 'update'];
    const items: string[] = [];
    transcript.forEach(entry => {
      if (entry.role === 'agent') {
        actionKeywords.forEach(keyword => {
          if (entry.content.toLowerCase().includes(keyword)) {
            items.push(entry.content.substring(0, 100));
          }
        });
      }
    });
    return [...new Set(items)].slice(0, 5);
  }

  getAnalytics(callId: string, transcript: { role: string; content: string }[]): ConversationAnalytics {
    const sentiments = transcript.map(t => this.analyzeSentiment(t.content));
    const avgSentiment = sentiments.reduce((sum, s) => sum + s.score, 0) / (sentiments.length || 1);
    const agentWords = transcript.filter(t => t.role === 'agent').reduce((sum, t) => sum + t.content.split(' ').length, 0);
    const userWords = transcript.filter(t => t.role === 'user').reduce((sum, t) => sum + t.content.split(' ').length, 0);
    const totalWords = agentWords + userWords || 1;
    return {
      callId, averageSentiment: avgSentiment,
      sentimentTrend: sentiments.map(s => s.score),
      topIntents: transcript.slice(0, 3).map(t => this.detectIntent(t.content)),
      talkRatio: { agent: agentWords / totalWords, user: userWords / totalWords },
      silencePercentage: 0.05, interruptionCount: 0,
      keyTopics: [...new Set(sentiments.flatMap(s => s.keywords))],
      summary: this.generateSummary(transcript),
      actionItems: this.extractActionItems(transcript),
      escalationRisk: avgSentiment < 0.3 ? 0.8 : avgSentiment < 0.5 ? 0.4 : 0.1,
    };
  }
}

export const conversationIntelligence = new ConversationIntelligence();
export type { SentimentResult, IntentResult, ConversationAnalytics };
