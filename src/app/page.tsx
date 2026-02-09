'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  ShieldAlert,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's your trading performance overview.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Trade
          </Button>
        </div>

        {/* Key Metrics Grid */}
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
                <span className="text-green-600 dark:text-green-500">+15.3%</span> from last month
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
                Average win: $452 / loss: $188
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
              <CardTitle className="text-xs font-medium">Max DD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600 dark:text-red-500">-4.2%</div>
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
              <CardTitle className="text-xs font-medium">Best Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600 dark:text-green-500">8 wins</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Worst Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600 dark:text-red-500">3 losses</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Total Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">67</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Trades */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Trades</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <CardDescription>Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">EUR/USD</div>
                        <div className="text-sm text-muted-foreground">
                          Long • 1.0845 → 1.0912
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-green-600 dark:text-green-500">
                          +$670
                        </div>
                        <div className="text-xs text-muted-foreground">
                          +2.2R
                        </div>
                      </div>
                      <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                        NY Open
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Log New Trade
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Target className="h-4 w-4" />
                  Create Strategy
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily Review
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  Check Risk Limits
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-orange-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-500">
                  <ShieldAlert className="h-5 w-5" />
                  Risk Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <ArrowUpRight className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Approaching Daily Loss Limit</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      80% of $500 limit reached
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Target className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Over-Trading Warning</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      5 trades today vs 3 limit
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Account Performance</CardTitle>
            <CardDescription>Overview across all trading accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Prop Firm Demo</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$102,450</div>
                <div className="text-sm text-green-600 dark:text-green-500">+$2,450 (2.4%)</div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Personal Live</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$15,890</div>
                <div className="text-sm text-green-600 dark:text-green-500">+$890 (5.9%)</div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Challenge Account</span>
                  <Badge variant="secondary">Eval</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$105,200</div>
                <div className="text-sm text-red-600 dark:text-red-500">-$800 (-0.8%)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
