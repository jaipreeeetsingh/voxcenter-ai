import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { calls: true } } },
    });
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, language, voice, systemPrompt, greeting, provider, model, maxDuration, guardrailsEnabled, allowedTopics, blockedPhrases } = body;

    const agent = await prisma.agent.create({
      data: {
        name, description, language, voice, systemPrompt, greeting,
        provider, model, maxDuration: maxDuration || 300,
        guardrailsEnabled: guardrailsEnabled ?? true,
        config: { allowedTopics: allowedTopics?.split(',').map((t: string) => t.trim()) || [], blockedPhrases: blockedPhrases?.split(',').map((p: string) => p.trim()) || [] },
        userId: 'default',
      },
    });
    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    console.error('Failed to create agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
