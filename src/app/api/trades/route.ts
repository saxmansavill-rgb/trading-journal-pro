import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/trades - List all trades with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const strategyId = searchParams.get('strategyId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};

    if (accountId) where.accountId = accountId;
    if (strategyId) where.strategyId = strategyId;
    if (startDate || endDate) {
      where.entryDate = {};
      if (startDate) where.entryDate.gte = new Date(startDate);
      if (endDate) where.entryDate.lte = new Date(endDate);
    }

    const trades = await prisma.trade.findMany({
      where,
      include: {
        account: true,
        strategy: true,
      },
      orderBy: {
        entryDate: 'desc',
      },
    });

    return NextResponse.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}

// POST /api/trades - Create a new trade
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const trade = await prisma.trade.create({
      data: {
        accountId: body.accountId,
        instrument: body.instrument,
        direction: body.direction,
        positionSize: body.positionSize,
        entryPrice: body.entryPrice,
        exitPrice: body.exitPrice,
        stopLoss: body.stopLoss,
        takeProfit: body.takeProfit,
        riskAmount: body.riskAmount,
        riskPercent: body.riskPercent,
        riskR: body.riskR,
        plannedRR: body.plannedRR,
        actualRR: body.actualRR,
        pnl: body.pnl,
        pnlPercent: body.pnlPercent,
        pnlR: body.pnlR,
        entryDate: new Date(body.entryDate),
        entryTime: body.entryTime,
        exitDate: body.exitDate ? new Date(body.exitDate) : null,
        exitTime: body.exitTime,
        session: body.session,
        tradeType: body.tradeType,
        screenshotBeforeEntry: body.screenshotBeforeEntry,
        screenshotAfterExit: body.screenshotAfterExit,
        notes: body.notes,
        tags: body.tags,
        strategyId: body.strategyId,
        confluencesUsed: body.confluencesUsed,
        emotionEntry: body.emotionEntry,
        emotionExit: body.emotionExit,
        planAdherence: body.planAdherence,
        sleepQuality: body.sleepQuality,
        stressLevel: body.stressLevel,
        isRuleViolation: body.isRuleViolation || false,
        isOverTrading: body.isOverTrading || false,
        isNewsDay: body.isNewsDay || false,
      },
      include: {
        account: true,
        strategy: true,
      },
    });

    return NextResponse.json(trade, { status: 201 });
  } catch (error) {
    console.error('Error creating trade:', error);
    return NextResponse.json(
      { error: 'Failed to create trade' },
      { status: 500 }
    );
  }
}
