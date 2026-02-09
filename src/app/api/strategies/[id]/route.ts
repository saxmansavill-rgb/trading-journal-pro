import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/strategies/[id] - Get a single strategy
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const strategy = await prisma.strategy.findUnique({
      where: { id: params.id },
      include: {
        confluences: true,
        trades: {
          orderBy: {
            entryDate: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!strategy) {
      return NextResponse.json(
        { error: 'Strategy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(strategy);
  } catch (error) {
    console.error('Error fetching strategy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch strategy' },
      { status: 500 }
    );
  }
}

// PATCH /api/strategies/[id] - Update a strategy
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const strategy = await prisma.strategy.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        coreRules: body.coreRules,
      },
      include: {
        confluences: true,
      },
    });

    return NextResponse.json(strategy);
  } catch (error) {
    console.error('Error updating strategy:', error);
    return NextResponse.json(
      { error: 'Failed to update strategy' },
      { status: 500 }
    );
  }
}

// DELETE /api/strategies/[id] - Delete a strategy
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.strategy.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting strategy:', error);
    return NextResponse.json(
      { error: 'Failed to delete strategy' },
      { status: 500 }
    );
  }
}
