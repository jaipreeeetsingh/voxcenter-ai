interface UsageRecord {
  userId: string;
  agentId: string;
  callId: string;
  provider: string;
  service: 'stt' | 'tts' | 'llm';
  units: number;
  cost: number;
  timestamp: Date;
}

interface BillingPlan {
  name: string;
  monthlyMinutes: number;
  pricePerMinute: number;
  rolloverEnabled: boolean;
  rolloverMaxMinutes: number;
  overage: number;
}

interface CostBreakdown {
  stt: number;
  tts: number;
  llm: number;
  telephony: number;
  total: number;
  minutesUsed: number;
  minutesRemaining: number;
  rolloverMinutes: number;
  projectedMonthly: number;
}

const PLANS: Record<string, BillingPlan> = {
  starter: {
    name: 'Starter',
    monthlyMinutes: 500,
    pricePerMinute: 0.08,
    rolloverEnabled: true,
    rolloverMaxMinutes: 250,
    overage: 0.12,
  },
  professional: {
    name: 'Professional',
    monthlyMinutes: 5000,
    pricePerMinute: 0.05,
    rolloverEnabled: true,
    rolloverMaxMinutes: 2500,
    overage: 0.08,
  },
  enterprise: {
    name: 'Enterprise',
    monthlyMinutes: 50000,
    pricePerMinute: 0.03,
    rolloverEnabled: true,
    rolloverMaxMinutes: 25000,
    overage: 0.05,
  },
};

class CostTracker {
  private records: UsageRecord[] = [];
  private alerts: { threshold: number; callback: (cost: number) => void }[] = [];

  trackUsage(record: UsageRecord): void {
    this.records.push(record);
    this.checkAlerts();
  }

  getBreakdown(userId: string, startDate: Date, endDate: Date): CostBreakdown {
    const userRecords = this.records.filter(
      r => r.userId === userId && r.timestamp >= startDate && r.timestamp <= endDate
    );
    const stt = userRecords.filter(r => r.service === 'stt').reduce((sum, r) => sum + r.cost, 0);
    const tts = userRecords.filter(r => r.service === 'tts').reduce((sum, r) => sum + r.cost, 0);
    const llm = userRecords.filter(r => r.service === 'llm').reduce((sum, r) => sum + r.cost, 0);
    const telephony = userRecords.length * 0.01;
    const total = stt + tts + llm + telephony;
    const minutesUsed = userRecords.reduce((sum, r) => sum + r.units / 60, 0);
    const daysElapsed = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const projectedMonthly = daysElapsed > 0 ? (total / daysElapsed) * 30 : 0;
    return { stt, tts, llm, telephony, total, minutesUsed, minutesRemaining: 5000 - minutesUsed, rolloverMinutes: 0, projectedMonthly };
  }

  setAlert(threshold: number, callback: (cost: number) => void): void {
    this.alerts.push({ threshold, callback });
  }

  private checkAlerts(): void {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const totalCost = this.records.filter(r => r.timestamp >= startOfMonth).reduce((sum, r) => sum + r.cost, 0);
    this.alerts.forEach(alert => { if (totalCost >= alert.threshold) alert.callback(totalCost); });
  }

  getRealTimeCost(callId: string): number {
    return this.records.filter(r => r.callId === callId).reduce((sum, r) => sum + r.cost, 0);
  }

  getPlan(planId: string): BillingPlan | undefined { return PLANS[planId]; }
  getAllPlans(): Record<string, BillingPlan> { return PLANS; }
}

export const costTracker = new CostTracker();
export type { UsageRecord, BillingPlan, CostBreakdown };
