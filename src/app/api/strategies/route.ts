import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/strategies - List all strategies
export async function GET() {
  try {
    const strategies = await prisma.strategy.findMany({
      include: {
        confluences: true,
        _count: {
          select: { trades: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(strategies);
  } catch (error) {
    console.error('Error fetching strategies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch strategies' },
      { status: 500 }
    );
  }
}

// POST /api/strategies - Create a new strategy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const strategy = await prisma.strategy.create({
      data: {
        name: body.name,
        description: body.description,
        coreRules: body.coreRules,
      },
      include: {
        confluences: true,
      },
    });

    return NextResponse.json(strategy, { status: 201 });
  } catch (error) {
    console.error('Error creating strategy:', error);
    return NextResponse.json(
      { error: 'Failed to create strategy' },
      { status: 500 }
    );
  }
}
