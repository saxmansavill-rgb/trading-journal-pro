import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/accounts - List all accounts
export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Create a new account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const account = await prisma.account.create({
      data: {
        name: body.name,
        type: body.type,
        accountGroup: body.accountGroup,
        baseCurrency: body.baseCurrency || 'USD',
        initialBalance: body.initialBalance,
        currentBalance: body.currentBalance || body.initialBalance,
        maxDrawdownLimit: body.maxDrawdownLimit,
        dailyLossLimit: body.dailyLossLimit,
        profitTarget: body.profitTarget,
        maxRiskPerTrade: body.maxRiskPerTrade,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
