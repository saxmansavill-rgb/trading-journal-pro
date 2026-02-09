'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  Flame,
  Snowflake
} from 'lucide-react';

const mockCalendarData = [
  { date: '2024-01-01', pnl: -120, trades: 2, instruments: ['EUR/USD'], strategies: ['NY Open FVG'], streak: 0 },
  { date: '2024-01-02', pnl: 340, trades: 3, instruments: ['GBP/USD', 'XAU/USD'], strategies: ['London Breakout'], streak: 1 },
  { date: '2024-01-03', pnl: 560, trades: 2, instruments: ['XAU/USD'], strategies: ['ICT 2022 Model'], streak: 2 },
  { date: '2024-01-04', pnl: 230, trades: 4, instruments: ['EUR/USD', 'GBP/USD'], strategies: ['NY Open FVG', 'London Breakout'], streak: 3 },
  { date: '2024-01-05', pnl: 450, trades: 2, instruments: ['USD/JPY'], strategies: ['London Breakout'], streak: 4 },
  { date: '2024-01-08', pnl: -340, trades: 2, instruments: ['EUR/USD'], strategies: ['NY Open FVG'], streak: 0 },
  { date: '2024-01-09', pnl: 670, trades: 3, instruments: ['GBP/USD', 'XAU/USD'], strategies: ['ICT 2022 Model'], streak: 1 },
  { date: '2024-01-10', pnl: 890, trades: 4, instruments: ['EUR/USD', 'GBP/USD'], strategies: ['NY Open FVG', 'London Breakout'], streak: 2 },
  { date: '2024-01-11', pnl: -180, trades: 1, instruments: ['XAU/USD'], strategies: ['ICT 2022 Model'], streak: 0 },
  { date: '2024-01-12', pnl: 340, trades: 3, instruments: ['GBP/USD'], strategies: ['London Breakout'], streak: 1 },
  { date: '2024-01-15', pnl: 780, trades: 2, instruments: ['EUR/USD'], strategies: ['NY Open FVG'], streak: 2 },
  { date: '2024-01-16', pnl: -90, trades: 2, instruments: ['USD/JPY'], strategies: ['London Breakout'], streak: 0 },
  { date: '2024-01-17', pnl: 560, trades: 3, instruments: ['XAU/USD'], strategies: ['ICT 2022 Model'], streak: 1 },
  { date: '2024-01-18', pnl: 430, trades: 2, instruments: ['EUR/USD', 'GBP/USD'], strategies: ['NY Open FVG'], streak: 2 },
  { date: '2024-01-19', pnl: 210, trades: 3, instruments: ['GBP/USD'], strategies: ['London Breakout'], streak: 3 },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getPnLColor = (pnl: number) => {
    if (pnl > 500) return 'bg-green-600 text-white';
    if (pnl > 200) return 'bg-green-500 text-white';
    if (pnl > 0) return 'bg-green-400 text-white';
    if (pnl > -200) return 'bg-red-400 text-white';
    if (pnl > -500) return 'bg-red-500 text-white';
    return 'bg-red-600 text-white';
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 3) return <Flame className="h-4 w-4 text-orange-500" />;
    if (streak <= -2) return <Snowflake className="h-4 w-4 text-blue-500" />;
    return null;
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = mockCalendarData.find(d => d.date === dateStr);
      daysArray.push({ day, date: dateStr, data: dayData });
    }

    return daysArray;
  };

  const calendarDays = generateCalendarDays();
  const selectedDayData = selectedDay ? mockCalendarData.find(d => d.date === selectedDay) : null;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              Visual overview of your trading performance over time
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="1">Prop Firm Demo</SelectItem>
                <SelectItem value="2">Personal Live</SelectItem>
                <SelectItem value="3">Challenge Account</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="month" value={view} onValueChange={(v: any) => setView(v)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Month Navigation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-xl">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {days.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayInfo, index) => (
                <div
                  key={index}
                  onClick={() => dayInfo && setSelectedDay(dayInfo.date)}
                  className={`
                    aspect-square rounded-lg p-2 cursor-pointer transition-all hover:scale-105
                    ${!dayInfo ? 'invisible' : 'border border-border'}
                    ${dayInfo?.data ? getPnLColor(dayInfo.data.pnl) : 'bg-muted/20 hover:bg-muted/30'}
                    ${selectedDay === dayInfo?.date ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}
                >
                  {dayInfo && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dayInfo.day}</span>
                        {dayInfo?.data && getStreakIcon(dayInfo.data.streak || 0)}
                      </div>
                      {dayInfo.data && (
                        <div className="mt-auto">
                          <div className="text-xs font-bold">
                            {dayInfo.data.pnl >= 0 ? '+' : ''}{dayInfo.data.pnl}
                          </div>
                          <div className="text-xs opacity-90">
                            {dayInfo.data.trades} trade{dayInfo.data.trades !== 1 ? 's' : ''}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600" />
                <span className="text-muted-foreground">+$500+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500" />
                <span className="text-muted-foreground">+$200-$500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-400" />
                <span className="text-muted-foreground">+$0-$200</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-400" />
                <span className="text-muted-foreground">-$0-$$200</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500" />
                <span className="text-muted-foreground">-$200-$500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-600" />
                <span className="text-muted-foreground">-$500+</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-muted-foreground">Win streak (3+)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Details */}
        {selectedDayData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {new Date(selectedDayData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </CardTitle>
              <CardDescription>
                Detailed breakdown of trading activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* Summary */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="text-sm text-muted-foreground mb-1">Net PnL</div>
                    <div className={`text-3xl font-bold ${selectedDayData.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                      {selectedDayData.pnl >= 0 ? '+' : ''}${selectedDayData.pnl.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-1">Trades</div>
                      <div className="text-2xl font-bold">{selectedDayData.trades}</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-1">Avg/Trade</div>
                      <div className={`text-2xl font-bold ${selectedDayData.pnl / selectedDayData.trades >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {selectedDayData.pnl >= 0 ? '+' : ''}${(selectedDayData.pnl / selectedDayData.trades).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instruments */}
                <div className="space-y-2">
                  <div className="font-medium">Instruments Traded</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDayData.instruments.map(instrument => (
                      <Badge key={instrument} variant="default">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Strategies */}
                <div className="space-y-2">
                  <div className="font-medium">Strategies Used</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDayData.strategies.map(strategy => (
                      <Badge key={strategy} variant="secondary">
                        {strategy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Trade List */}
              <div>
                <div className="font-medium mb-3">Individual Trades</div>
                <div className="space-y-2">
                  {[1, 2, 3].slice(0, selectedDayData.trades).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                      <div className="flex items-center gap-3">
                        {i % 2 === 0 ? (
                          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-500" />
                        )}
                        <div>
                          <div className="font-medium">{selectedDayData.instruments[i % selectedDayData.instruments.length]}</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedDayData.strategies[i % selectedDayData.strategies.length]}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${i % 2 === 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {i % 2 === 0 ? '+' : '-'}${Math.abs(selectedDayData.pnl / selectedDayData.trades).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4" onClick={() => setSelectedDay(null)}>
                Close Details
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Monthly Summary */}
        {!selectedDayData && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary - {currentMonth.toLocaleDateString('en-US', { month: 'long' })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total PnL</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                    +$4,450
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Trades</div>
                  <div className="text-2xl font-bold">37</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                  <div className="text-2xl font-bold">67.6%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Best Day</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                    +$890
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
