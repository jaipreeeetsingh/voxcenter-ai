import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    if (agentId) where.agentId = agentId;
    if (status) where.status = status;

    const calls = await prisma.call.findMany({
      where, take: limit,
      orderBy: { startTime: 'desc' },
      include: { agent: { select: { name: true } } },
    });
    return NextResponse.json(calls);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch calls' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, phoneNumber, direction } = body;

    const call = await prisma.call.create({
      data: {
        agentId, phoneNumber,
        direction: direction || 'outbound',
        status: 'ringing',
        startTime: new Date(),
        userId: 'default',
      },
    });
    return NextResponse.json(call, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create call' }, { status: 500 });
  }
}
