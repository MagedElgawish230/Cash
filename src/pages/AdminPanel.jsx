import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users,
  DollarSign,
  Gift,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    type: '',
    reward: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    requirements: ''
  })

  // Mock data
  const [stats] = useState({
    totalUsers: 2847,
    activeUsers: 1923,
    totalWithdrawals: 125000,
    pendingWithdrawals: 15000,
    totalOffers: 12,
    activeOffers: 8
  })

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'verified', joinDate: '2024-01-15', balance: 1250.50 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending', joinDate: '2024-01-18', balance: 850.25 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'verified', joinDate: '2024-01-20', balance: 2100.75 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'rejected', joinDate: '2024-01-22', balance: 0 },
  ])

  const [withdrawals] = useState([
    { id: 1, user: 'John Doe', amount: 500, method: 'Bank Transfer', status: 'pending', date: '2024-01-25' },
    { id: 2, user: 'Jane Smith', amount: 250, method: 'PayPal', status: 'approved', date: '2024-01-24' },
    { id: 3, user: 'Mike Johnson', amount: 1000, method: 'Crypto', status: 'pending', date: '2024-01-23' },
    { id: 4, user: 'Sarah Wilson', amount: 150, method: 'Bank Transfer', status: 'rejected', date: '2024-01-22' },
  ])

  const [offers] = useState([
    { id: 1, title: 'Welcome Bonus', type: 'bonus', reward: 100, participants: 1250, status: 'active', endDate: '2024-12-31' },
    { id: 2, title: 'Team Builder', type: 'team', reward: 5, participants: 850, status: 'active', endDate: '2024-12-31' },
    { id: 3, title: 'Monthly Challenge', type: 'personal', reward: 500, participants: 320, status: 'active', endDate: '2024-01-31' },
    { id: 4, title: 'Holiday Special', type: 'bonus', reward: 200, participants: 0, status: 'draft', endDate: '2024-02-14' },
  ])

  const [chartData] = useState([
    { month: 'Aug', users: 1200, withdrawals: 15000, offers: 5 },
    { month: 'Sep', users: 1450, withdrawals: 18000, offers: 6 },
    { month: 'Oct', users: 1800, withdrawals: 22000, offers: 8 },
    { month: 'Nov', users: 2100, withdrawals: 28000, offers: 10 },
    { month: 'Dec', users: 2500, withdrawals: 35000, offers: 12 },
    { month: 'Jan', users: 2847, withdrawals: 42000, offers: 12 },
  ])

  const handleApproveWithdrawal = (id) => {
    console.log('Approving withdrawal:', id)
    // In real app, make API call
  }

  const handleRejectWithdrawal = (id) => {
    console.log('Rejecting withdrawal:', id)
    // In real app, make API call
  }

  const handleVerifyUser = (id) => {
    console.log('Verifying user:', id)
    // In real app, make API call
  }

  const handleCreateOffer = (e) => {
    e.preventDefault()
    console.log('Creating offer:', newOffer)
    // In real app, make API call
    setNewOffer({
      title: '',
      description: '',
      type: '',
      reward: '',
      currency: 'USD',
      startDate: '',
      endDate: '',
      maxParticipants: '',
      requirements: ''
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
      case 'approved':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'rejected':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">
          Manage users, offers, and platform operations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-xs text-green-600">+{stats.activeUsers} active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${stats.totalWithdrawals.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Withdrawals</p>
                    <p className="text-xs text-yellow-600">${stats.pendingWithdrawals.toLocaleString()} pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Gift className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalOffers}</p>
                    <p className="text-sm text-gray-600">Total Offers</p>
                    <p className="text-xs text-green-600">{stats.activeOffers} active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>User registration and activity trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Monthly withdrawal volumes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="withdrawals" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">3 pending withdrawals</p>
                      <p className="text-sm text-gray-600">Require manual review</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Review</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">5 new user registrations</p>
                      <p className="text-sm text-gray-600">Today</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">1 offer ending soon</p>
                      <p className="text-sm text-gray-600">Monthly Challenge ends in 6 days</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Extend</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">User Management</h2>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined: {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${user.balance.toFixed(2)}</p>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(user.status)}
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleVerifyUser(user.id)}
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Withdrawal Management</h2>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {withdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <DollarSign className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{withdrawal.user}</p>
                        <p className="text-sm text-gray-600">
                          ${withdrawal.amount} via {withdrawal.method}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(withdrawal.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(withdrawal.status)}
                        <Badge className={getStatusColor(withdrawal.status)}>
                          {withdrawal.status}
                        </Badge>
                      </div>
                      {withdrawal.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRejectWithdrawal(withdrawal.id)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApproveWithdrawal(withdrawal.id)}
                          >
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Offer Management</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create New Offer */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Offer</CardTitle>
                <CardDescription>Add a new promotional offer</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateOffer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                      placeholder="Enter offer title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newOffer.description}
                      onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                      placeholder="Enter offer description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select value={newOffer.type} onValueChange={(value) => setNewOffer({...newOffer, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bonus">Bonus</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reward">Reward</Label>
                      <Input
                        id="reward"
                        type="number"
                        value={newOffer.reward}
                        onChange={(e) => setNewOffer({...newOffer, reward: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newOffer.startDate}
                        onChange={(e) => setNewOffer({...newOffer, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newOffer.endDate}
                        onChange={(e) => setNewOffer({...newOffer, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Offer
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Offers */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Offers</CardTitle>
                <CardDescription>Manage current promotional offers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {offers.map((offer) => (
                    <div key={offer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{offer.title}</p>
                        <p className="text-sm text-gray-600">
                          {offer.participants} participants
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(offer.status)}>
                            {offer.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Ends: {new Date(offer.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-xl font-semibold">Platform Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage platform-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Minimum Withdrawal Amount</Label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Withdrawal Amount</Label>
                  <Input type="number" defaultValue="50000" />
                </div>
                <div className="space-y-2">
                  <Label>Default Commission Rate (%)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input type="email" defaultValue="admin@cash-platform.com" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input type="email" defaultValue="support@cash-platform.com" />
                </div>
                <div className="space-y-2">
                  <Label>SMS Provider API Key</Label>
                  <Input type="password" placeholder="Enter API key" />
                </div>
                <Button>Update Notifications</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPanel

