'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NewTradeDialog } from '@/components/new-trade-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Edit2, Trash2, TrendingUp, TrendingDown, Search, RefreshCw } from 'lucide-react';

export default function TradesPage() {
  const [trades, setTrades] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const [tradesRes, accountsRes] = await Promise.all([
        fetch('/api/trades'),
        fetch('/api/accounts')
      ]);
      const tradesData = await tradesRes.json();
      const accountsData = await accountsRes.json();
      setTrades(tradesData);
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/trades/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTrades(trades.filter(t => t.id !== deleteId));
        setDeleteId(null);
      } else {
        alert('Failed to delete trade');
      }
    } catch (error) {
      console.error('Error deleting trade:', error);
      alert('Error deleting trade');
    }
  };

  const filteredTrades = trades.filter(trade =>
    trade.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.direction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (trade.strategy?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: trades.length,
    winners: trades.filter(t => t.pnl > 0).length,
    losers: trades.filter(t => t.pnl < 0).length,
    totalPnL: trades.reduce((sum, t) => sum + t.pnl, 0),
    winRate: trades.length > 0 
      ? ((trades.filter(t => t.pnl > 0).length / trades.length) * 100).toFixed(1)
      : '0.0',
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trades</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all your trades
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={fetchTrades} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            {!loading && <NewTradeDialog accounts={accounts} />}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.winRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.winners}W / {stats.losers}L
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total PnL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats.totalPnL >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg per Trade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats.totalPnL >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                ${stats.total > 0 ? (stats.totalPnL / stats.total).toFixed(2) : '0.00'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Trades Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Trades ({filteredTrades.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading trades...
              </div>
            ) : filteredTrades.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {trades.length === 0 
                  ? 'No trades yet. Click "New Trade" to add your first trade!'
                  : 'No trades match your search.'}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Direction</TableHead>
                      <TableHead>Entry</TableHead>
                      <TableHead>Exit</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>PnL</TableHead>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrades.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell className="font-medium">
                          {new Date(trade.entryDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{trade.instrument}</TableCell>
                        <TableCell>
                          <Badge variant={trade.direction === 'long' ? 'default' : 'secondary'}>
                            {trade.direction === 'long' ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {trade.direction}
                          </Badge>
                        </TableCell>
                        <TableCell>{trade.entryPrice}</TableCell>
                        <TableCell>{trade.exitPrice}</TableCell>
                        <TableCell>{trade.positionSize}</TableCell>
                        <TableCell>
                          <span className={trade.pnl >= 0 ? 'text-green-600 dark:text-green-500 font-semibold' : 'text-red-600 dark:text-red-500 font-semibold'}>
                            {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {trade.strategy?.name ? (
                            <Badge variant="outline">{trade.strategy.name}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {trade.account?.name || 'Unknown'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => alert('Edit functionality coming soon!')}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(trade.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Trade</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this trade? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
