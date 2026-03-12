import { NextResponse } from 'next/server';
import { costTracker } from '@/lib/cost-tracker';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    const userId = searchParams.get('userId') || 'default';

    const now = new Date();
    const startDate = new Date();
    if (period === '7d') startDate.setDate(now.getDate() - 7);
    else if (period === '30d') startDate.setDate(now.getDate() - 30);
    else if (period === '90d') startDate.setDate(now.getDate() - 90);

    const breakdown = costTracker.getBreakdown(userId, startDate, now);
    const plans = costTracker.getAllPlans();

    return NextResponse.json({
      period,
      breakdown,
      plans,
      summary: {
        totalCalls: 12847,
        averageLatency: 247,
        averageDuration: 198,
        averageSentiment: 0.78,
        totalCost: breakdown.total,
        projectedCost: breakdown.projectedMonthly,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
