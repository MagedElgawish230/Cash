import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const [transactions] = useState([
    {
      id: 'TXN-001',
      type: 'withdrawal',
      amount: -500.00,
      description: 'Bank Transfer Withdrawal',
      status: 'completed',
      date: '2024-01-20T10:30:00Z',
      reference: 'WD-20240120-001',
      method: 'Bank Transfer',
      fee: 5.00
    },
    {
      id: 'TXN-002',
      type: 'bonus',
      amount: 150.00,
      description: 'Welcome Bonus',
      status: 'completed',
      date: '2024-01-19T14:15:00Z',
      reference: 'BN-20240119-002',
      source: 'System',
      fee: 0
    },
    {
      id: 'TXN-003',
      type: 'earning',
      amount: 320.50,
      description: 'Trading Profit - EURUSD',
      status: 'completed',
      date: '2024-01-18T09:45:00Z',
      reference: 'TR-20240118-003',
      source: 'Trading',
      fee: 0
    },
    {
      id: 'TXN-004',
      type: 'withdrawal',
      amount: -250.00,
      description: 'PayPal Withdrawal',
      status: 'pending',
      date: '2024-01-17T16:20:00Z',
      reference: 'WD-20240117-004',
      method: 'PayPal',
      fee: 2.50
    },
    {
      id: 'TXN-005',
      type: 'team',
      amount: 75.25,
      description: 'Team Commission - John Smith',
      status: 'completed',
      date: '2024-01-16T11:30:00Z',
      reference: 'TC-20240116-005',
      source: 'Team',
      fee: 0
    },
    {
      id: 'TXN-006',
      type: 'bonus',
      amount: 100.00,
      description: 'Monthly Performance Bonus',
      status: 'completed',
      date: '2024-01-15T08:00:00Z',
      reference: 'BN-20240115-006',
      source: 'Performance',
      fee: 0
    },
    {
      id: 'TXN-007',
      type: 'withdrawal',
      amount: -1000.00,
      description: 'Crypto Withdrawal - Bitcoin',
      status: 'failed',
      date: '2024-01-14T13:45:00Z',
      reference: 'WD-20240114-007',
      method: 'Bitcoin',
      fee: 15.00,
      failureReason: 'Insufficient balance'
    },
    {
      id: 'TXN-008',
      type: 'earning',
      amount: 180.75,
      description: 'Trading Profit - GBPJPY',
      status: 'completed',
      date: '2024-01-13T15:20:00Z',
      reference: 'TR-20240113-008',
      source: 'Trading',
      fee: 0
    },
    {
      id: 'TXN-009',
      type: 'team',
      amount: 45.50,
      description: 'Team Commission - Sarah Johnson',
      status: 'completed',
      date: '2024-01-12T12:10:00Z',
      reference: 'TC-20240112-009',
      source: 'Team',
      fee: 0
    },
    {
      id: 'TXN-010',
      type: 'bonus',
      amount: 50.00,
      description: 'Referral Bonus',
      status: 'pending',
      date: '2024-01-11T17:30:00Z',
      reference: 'BN-20240111-010',
      source: 'Referral',
      fee: 0
    }
  ])

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    const matchesType = filterType === 'all' || transaction.type === filterType
    
    let matchesDate = true
    if (dateRange !== 'all') {
      const transactionDate = new Date(transaction.date)
      const now = new Date()
      const daysDiff = Math.floor((now - transactionDate) / (1000 * 60 * 60 * 24))
      
      switch (dateRange) {
        case 'today':
          matchesDate = daysDiff === 0
          break
        case 'week':
          matchesDate = daysDiff <= 7
          break
        case 'month':
          matchesDate = daysDiff <= 30
          break
        default:
          matchesDate = true
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'withdrawal': return <ArrowDownRight className="h-4 w-4" />
      case 'bonus': return <Gift className="h-4 w-4" />
      case 'earning': return <TrendingUp className="h-4 w-4" />
      case 'team': return <Users className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const getTransactionColor = (type) => {
    switch (type) {
      case 'withdrawal': return 'bg-red-100 text-red-600'
      case 'bonus': return 'bg-green-100 text-green-600'
      case 'earning': return 'bg-blue-100 text-blue-600'
      case 'team': return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalIncome = transactions
    .filter(t => t.amount > 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = Math.abs(transactions
    .filter(t => t.amount < 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0))

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">
            View and manage your transaction history
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Income</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-full">
                <ArrowDownRight className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">${totalWithdrawals.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Withdrawals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Pending Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="bonus">Bonuses</SelectItem>
                <SelectItem value="earning">Earnings</SelectItem>
                <SelectItem value="team">Team Commission</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${getTransactionColor(transaction.type)}`}>
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{transaction.description}</h3>
                      <Badge variant="outline" className="text-xs">
                        {transaction.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      <span>ID: {transaction.reference}</span>
                      {transaction.method && <span>via {transaction.method}</span>}
                      {transaction.source && <span>from {transaction.source}</span>}
                    </div>
                    {transaction.failureReason && (
                      <p className="text-sm text-red-600 mt-1">
                        Reason: {transaction.failureReason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className={`font-bold text-lg ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                    {transaction.fee > 0 && (
                      <span className="text-xs text-gray-500">
                        Fee: ${transaction.fee.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria to find transactions.
              </p>
            </div>
          )}

          {filteredTransactions.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Transactions

