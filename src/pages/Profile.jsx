import { useState } from 'react'
import { useAuth } from '../App'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Gift,
  Calendar,
  Award,
  Target,
  Edit,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const Profile = () => {
  const { user } = useAuth()
  
  const [profileData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      timezone: 'UTC-5 (EST)'
    },
    verification: {
      email: true,
      phone: true,
      identity: true,
      address: false
    },
    financialSummary: {
      totalEarnings: 15420.50,
      teamEarnings: 4320.75,
      personalEarnings: 8750.25,
      bonuses: 2349.50,
      totalWithdrawn: 8500.00,
      availableBalance: 6920.50
    },
    teamStats: {
      directReferrals: 12,
      totalTeamSize: 45,
      activeMembers: 38,
      teamVolume: 125000,
      commissionRate: 5.5
    },
    achievements: [
      { id: 1, title: 'First Trade', description: 'Completed your first trade', earned: true, date: '2024-01-15' },
      { id: 2, title: 'Team Builder', description: 'Referred 10+ members', earned: true, date: '2024-01-18' },
      { id: 3, title: 'High Performer', description: 'Earned $10,000+', earned: true, date: '2024-01-20' },
      { id: 4, title: 'Consistent Trader', description: 'Trade for 30 consecutive days', earned: false, progress: 75 },
      { id: 5, title: 'Team Leader', description: 'Build a team of 50+ members', earned: false, progress: 90 },
      { id: 6, title: 'Top Earner', description: 'Earn $50,000+', earned: false, progress: 30 }
    ]
  })

  const [monthlyData] = useState([
    { month: 'Aug', personal: 1200, team: 800, bonus: 300 },
    { month: 'Sep', personal: 1500, team: 950, bonus: 450 },
    { month: 'Oct', personal: 1800, team: 1200, bonus: 600 },
    { month: 'Nov', personal: 2100, team: 1400, bonus: 750 },
    { month: 'Dec', personal: 2400, team: 1600, bonus: 900 },
    { month: 'Jan', personal: 2800, team: 1800, bonus: 1050 }
  ])

  const earningsBreakdown = [
    { name: 'Personal Earnings', value: profileData.financialSummary.personalEarnings, color: '#3b82f6' },
    { name: 'Team Earnings', value: profileData.financialSummary.teamEarnings, color: '#10b981' },
    { name: 'Bonuses', value: profileData.financialSummary.bonuses, color: '#f59e0b' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your account and view your performance
          </p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">First Name</label>
                    <p className="text-lg">{profileData.personalInfo.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Name</label>
                    <p className="text-lg">{profileData.personalInfo.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      {profileData.personalInfo.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-lg flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-gray-400" />
                      {profileData.personalInfo.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Member Since</label>
                    <p className="text-lg flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {new Date(profileData.personalInfo.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Login</label>
                    <p className="text-lg">
                      {new Date(profileData.personalInfo.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Email</span>
                    </div>
                    {profileData.verification.email ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Phone</span>
                    </div>
                    {profileData.verification.phone ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Identity</span>
                    </div>
                    {profileData.verification.identity ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Address</span>
                    </div>
                    {profileData.verification.address ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Verification Progress</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <Button variant="outline" className="w-full">
                  Complete Verification
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${profileData.financialSummary.totalEarnings.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{profileData.teamStats.totalTeamSize}</p>
                    <p className="text-sm text-gray-600">Team Size</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{profileData.teamStats.commissionRate}%</p>
                    <p className="text-sm text-gray-600">Commission Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{profileData.achievements.filter(a => a.earned).length}</p>
                    <p className="text-sm text-gray-600">Achievements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
                <CardDescription>Distribution of your total earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={earningsBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {earningsBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {earningsBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="font-medium">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Earnings trend over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="personal" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="team" stackId="a" fill="#10b981" />
                    <Bar dataKey="bonus" stackId="a" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  ${profileData.financialSummary.availableBalance.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">Ready for withdrawal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Withdrawn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  ${profileData.financialSummary.totalWithdrawn.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">Lifetime withdrawals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">
                  ${profileData.financialSummary.totalEarnings.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">All-time earnings</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">{profileData.teamStats.directReferrals}</p>
                  <p className="text-sm text-gray-600">Direct Referrals</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Target className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <p className="text-2xl font-bold">{profileData.teamStats.totalTeamSize}</p>
                  <p className="text-sm text-gray-600">Total Team Size</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                  <p className="text-2xl font-bold">{profileData.teamStats.activeMembers}</p>
                  <p className="text-sm text-gray-600">Active Members</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
                  <p className="text-2xl font-bold">${profileData.teamStats.teamVolume.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Team Volume</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Your team's activity and growth metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Team Activity Rate</span>
                    <span className="text-sm text-gray-600">84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Monthly Growth</span>
                    <span className="text-sm text-gray-600">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Commission Rate</span>
                    <span className="text-sm text-gray-600">{profileData.teamStats.commissionRate}%</span>
                  </div>
                  <Progress value={profileData.teamStats.commissionRate * 10} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Award className={`h-8 w-8 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned ? (
                      <div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Earned
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile

