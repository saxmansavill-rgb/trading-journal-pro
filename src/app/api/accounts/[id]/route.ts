import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/accounts/[id] - Get a single account
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const account = await prisma.account.findUnique({
      where: { id: params.id },
      include: {
        trades: {
          orderBy: {
            entryDate: 'desc',
          },
          take: 10, // Last 10 trades
        },
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}

// PATCH /api/accounts/[id] - Update an account
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const account = await prisma.account.update({
      where: { id: params.id },
      data: {
        name: body.name,
        type: body.type,
        accountGroup: body.accountGroup,
        baseCurrency: body.baseCurrency,
        initialBalance: body.initialBalance,
        currentBalance: body.currentBalance,
        maxDrawdownLimit: body.maxDrawdownLimit,
        dailyLossLimit: body.dailyLossLimit,
        profitTarget: body.profitTarget,
        maxRiskPerTrade: body.maxRiskPerTrade,
        isActive: body.isActive,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.error('Error updating account:', error);
    return NextResponse.json(
      { error: 'Failed to update account' },
      { status: 500 }
    );
  }
}

// DELETE /api/accounts/[id] - Delete an account
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.account.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}
