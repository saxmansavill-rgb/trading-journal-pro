'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  ShieldAlert,
  Calendar,
  PieChart,
  LineChart as LineChartIcon
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive performance analysis and insights
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
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total PnL */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                +$12,450
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 dark:text-green-500">+15.3%</span> this month
              </p>
            </CardContent>
          </Card>

          {/* Win Rate */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67.5%</div>
              <p className="text-xs text-muted-foreground">
                45 wins / 67 trades
              </p>
            </CardContent>
          </Card>

          {/* Profit Factor */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 dark:text-green-500">Excellent</span>
              </p>
            </CardContent>
          </Card>

          {/* Expectancy */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expectancy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                +$185
              </div>
              <p className="text-xs text-muted-foreground">
                Per trade average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Avg RR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">2.1:1</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Avg Win</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600 dark:text-green-500">
                +$452
              </div>
              <div className="text-xs text-muted-foreground">2.1R</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Avg Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600 dark:text-red-500">
                -$188
              </div>
              <div className="text-xs text-muted-foreground">-1.0R</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Max DD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600 dark:text-red-500">-4.2%</div>
              <div className="text-xs text-muted-foreground">-$4,450</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Sharpe Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">2.8</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Sortino Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">3.4</div>
            </CardContent>
          </Card>
        </div>

        {/* Streaks & Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Win Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">8 trades</div>
              <p className="text-xs text-muted-foreground">
                +$3,240 during streak
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Worst Loss Streak</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-500">3 trades</div>
              <p className="text-xs text-muted-foreground">
                -$690 during streak
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Trades/Day</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4</div>
              <p className="text-xs text-muted-foreground">
                67 trades over 28 trading days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="instruments">Instruments</TabsTrigger>
            <TabsTrigger value="time">Time Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Equity Curve Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Equity Curve
                  </CardTitle>
                  <CardDescription>
                    Account balance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <LineChartIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Equity curve chart will be rendered here</p>
                      <p className="text-sm mt-1">Showing balance evolution across all trades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PnL Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    PnL Distribution
                  </CardTitle>
                  <CardDescription>
                    Wins vs losses breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-green-600 dark:text-green-500 font-medium">Wins</span>
                        <span>67.5% (45 trades)</span>
                      </div>
                      <Progress value={67.5} className="h-3" />
                      <div className="text-right text-sm text-green-600 dark:text-green-500 mt-1">
                        +$20,340
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-red-600 dark:text-red-500 font-medium">Losses</span>
                        <span>32.5% (22 trades)</span>
                      </div>
                      <Progress value={32.5} className="h-3" />
                      <div className="text-right text-sm text-red-600 dark:text-red-500 mt-1">
                        -$7,890
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Largest Win</div>
                        <div className="text-lg font-bold text-green-600 dark:text-green-500">
                          +$1,240
                        </div>
                        <div className="text-xs text-muted-foreground">3.2R</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Largest Loss</div>
                        <div className="text-lg font-bold text-red-600 dark:text-red-500">
                          -$450
                        </div>
                        <div className="text-xs text-muted-foreground">-1.3R</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* R-Multiple Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>R-Multiple Distribution</CardTitle>
                <CardDescription>
                  How your trades perform in R units
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>R-multiple distribution chart will be rendered here</p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-4">
                  <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-lg font-bold text-red-600 dark:text-red-500">5</div>
                    <div className="text-xs text-muted-foreground">-2R or worse</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-lg font-bold text-red-600 dark:text-red-500">8</div>
                    <div className="text-xs text-muted-foreground">-1 to -2R</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="text-lg font-bold text-yellow-600 dark:text-yellow-500">9</div>
                    <div className="text-xs text-muted-foreground">0 to -1R</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-lg font-bold text-green-600 dark:text-green-500">28</div>
                    <div className="text-xs text-muted-foreground">0 to 2R</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-lg font-bold text-green-600 dark:text-green-500">17</div>
                    <div className="text-xs text-muted-foreground">2R or better</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Strategy Performance</CardTitle>
                <CardDescription>
                  Compare performance across different strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Strategy 1 */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg">NY Open FVG + SMT</div>
                        <div className="text-sm text-muted-foreground">24 trades</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600 dark:text-green-500">
                          +$5,890
                        </div>
                        <div className="text-sm text-muted-foreground">+5.9%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                        <div className="font-bold text-green-600 dark:text-green-500">70.8%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Profit Factor</div>
                        <div className="font-bold">2.6</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Avg RR</div>
                        <div className="font-bold">2.3:1</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Expectancy</div>
                        <div className="font-bold text-green-600 dark:text-green-500">+$245</div>
                      </div>
                    </div>
                  </div>

                  {/* Strategy 2 */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg">London Breakout</div>
                        <div className="text-sm text-muted-foreground">18 trades</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600 dark:text-green-500">
                          +$3,240
                        </div>
                        <div className="text-sm text-muted-foreground">+3.2%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                        <div className="font-bold">66.7%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Profit Factor</div>
                        <div className="font-bold">1.8</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Avg RR</div>
                        <div className="font-bold">2.0:1</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Expectancy</div>
                        <div className="font-bold text-green-600 dark:text-green-500">+$180</div>
                      </div>
                    </div>
                  </div>

                  {/* Strategy 3 */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg">ICT 2022 Model</div>
                        <div className="text-sm text-muted-foreground">32 trades</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600 dark:text-green-500">
                          +$3,320
                        </div>
                        <div className="text-sm text-muted-foreground">+3.3%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                        <div className="font-bold">62.5%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Profit Factor</div>
                        <div className="font-bold">2.1</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Avg RR</div>
                        <div className="font-bold">2.8:1</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Expectancy</div>
                        <div className="font-bold text-green-600 dark:text-green-500">+$104</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instruments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Instrument Performance</CardTitle>
                <CardDescription>
                  Breakdown by trading instrument
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { instrument: 'EUR/USD', trades: 28, pnl: 5420, winRate: 71.4 },
                    { instrument: 'GBP/USD', trades: 18, pnl: 3240, winRate: 66.7 },
                    { instrument: 'XAU/USD', trades: 12, pnl: 2100, winRate: 58.3 },
                    { instrument: 'USD/JPY', trades: 9, pnl: 1690, winRate: 77.8 },
                  ].map((item) => (
                    <div key={item.instrument} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="font-bold text-lg">{item.instrument}</div>
                        <div className="text-sm text-muted-foreground">{item.trades} trades</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${item.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          {item.pnl >= 0 ? '+' : ''}${item.pnl.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.winRate}% win rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Day of Week Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Day of Week Performance</CardTitle>
                  <CardDescription>
                    Win rate and PnL by day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { day: 'Monday', trades: 14, winRate: 64.3, pnl: 1890 },
                      { day: 'Tuesday', trades: 12, winRate: 75.0, pnl: 2450 },
                      { day: 'Wednesday', trades: 15, winRate: 60.0, pnl: 1230 },
                      { day: 'Thursday', trades: 16, winRate: 68.8, pnl: 3450 },
                      { day: 'Friday', trades: 10, winRate: 70.0, pnl: 3430 },
                    ].map((item) => (
                      <div key={item.day} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{item.day}</span>
                            <span className="text-xs text-muted-foreground">{item.trades} trades</span>
                          </div>
                          <Progress value={item.winRate} className="h-2" />
                        </div>
                        <div className="ml-4 text-right min-w-[80px]">
                          <div className={`font-bold ${item.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {item.pnl >= 0 ? '+' : ''}${item.pnl.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.winRate}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Session Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Session Performance</CardTitle>
                  <CardDescription>
                    Performance by trading session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { session: 'New York', trades: 28, winRate: 71.4, pnl: 6780 },
                      { session: 'London', trades: 22, winRate: 63.6, pnl: 3450 },
                      { session: 'Asia', trades: 12, winRate: 58.3, pnl: 1560 },
                      { session: 'Overnight', trades: 5, winRate: 60.0, pnl: 660 },
                    ].map((item) => (
                      <div key={item.session} className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{item.session}</div>
                          <Badge variant="outline">{item.trades} trades</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">{item.winRate}%</div>
                            <div className="text-xs text-muted-foreground">Win Rate</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${item.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                              {item.pnl >= 0 ? '+' : ''}${item.pnl.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">Total PnL</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
