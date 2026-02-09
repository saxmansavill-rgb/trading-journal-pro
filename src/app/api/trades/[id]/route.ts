import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/trades/[id] - Get a single trade
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trade = await prisma.trade.findUnique({
      where: { id: params.id },
      include: {
        account: true,
        strategy: true,
      },
    });

    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(trade);
  } catch (error) {
    console.error('Error fetching trade:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trade' },
      { status: 500 }
    );
  }
}

// PATCH /api/trades/[id] - Update a trade
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const trade = await prisma.trade.update({
      where: { id: params.id },
      data: {
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
        entryDate: body.entryDate ? new Date(body.entryDate) : undefined,
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
        isRuleViolation: body.isRuleViolation,
        isOverTrading: body.isOverTrading,
        isNewsDay: body.isNewsDay,
      },
      include: {
        account: true,
        strategy: true,
      },
    });

    return NextResponse.json(trade);
  } catch (error) {
    console.error('Error updating trade:', error);
    return NextResponse.json(
      { error: 'Failed to update trade' },
      { status: 500 }
    );
  }
}

// DELETE /api/trades/[id] - Delete a trade
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.trade.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting trade:', error);
    return NextResponse.json(
      { error: 'Failed to delete trade' },
      { status: 500 }
    );
  }
}
