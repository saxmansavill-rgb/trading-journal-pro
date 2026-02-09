import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    if (accountId) where.accountId = accountId;
    if (startDate || endDate) {
      where.entryDate = {};
      if (startDate) where.entryDate.gte = new Date(startDate);
      if (endDate) where.entryDate.lte = new Date(endDate);
    }

    // Get all trades for calculations
    const trades = await prisma.trade.findMany({
      where,
      include: {
        account: true,
        strategy: true,
      },
      orderBy: {
        entryDate: 'asc',
      },
    });

    // Calculate statistics
    const totalTrades = trades.length;
    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);
    const breakEvenTrades = trades.filter(t => t.pnl === 0);

    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;
    
    const avgWin = winningTrades.length > 0 
      ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length 
      : 0;
    
    const avgLoss = losingTrades.length > 0 
      ? Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length)
      : 0;

    const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

    const bestTrade = trades.length > 0 
      ? Math.max(...trades.map(t => t.pnl)) 
      : 0;
    
    const worstTrade = trades.length > 0 
      ? Math.min(...trades.map(t => t.pnl)) 
      : 0;

    // Calculate average R multiple
    const avgR = trades.length > 0 && trades.some(t => t.pnlR !== null)
      ? trades.filter(t => t.pnlR !== null).reduce((sum, t) => sum + (t.pnlR || 0), 0) / trades.filter(t => t.pnlR !== null).length
      : 0;

    // Group by day of week
    const dayOfWeekStats = trades.reduce((acc: any, trade) => {
      const day = new Date(trade.entryDate).toLocaleDateString('en-US', { weekday: 'long' });
      if (!acc[day]) {
        acc[day] = { trades: 0, pnl: 0, wins: 0 };
      }
      acc[day].trades++;
      acc[day].pnl += trade.pnl;
      if (trade.pnl > 0) acc[day].wins++;
      return acc;
    }, {});

    // Group by session
    const sessionStats = trades.reduce((acc: any, trade) => {
      const session = trade.session || 'Unknown';
      if (!acc[session]) {
        acc[session] = { trades: 0, pnl: 0, wins: 0 };
      }
      acc[session].trades++;
      acc[session].pnl += trade.pnl;
      if (trade.pnl > 0) acc[session].wins++;
      return acc;
    }, {});

    // Group by strategy
    const strategyStats = trades.reduce((acc: any, trade) => {
      const strategyName = trade.strategy?.name || 'No Strategy';
      if (!acc[strategyName]) {
        acc[strategyName] = { trades: 0, pnl: 0, wins: 0 };
      }
      acc[strategyName].trades++;
      acc[strategyName].pnl += trade.pnl;
      if (trade.pnl > 0) acc[strategyName].wins++;
      return acc;
    }, {});

    const analytics = {
      totalTrades,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      breakEvenTrades: breakEvenTrades.length,
      totalPnL,
      winRate,
      avgWin,
      avgLoss,
      profitFactor,
      bestTrade,
      worstTrade,
      avgR,
      dayOfWeekStats,
      sessionStats,
      strategyStats,
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
