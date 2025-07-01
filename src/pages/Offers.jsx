import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Gift, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  Search,
  Filter,
  Calendar
} from 'lucide-react'

const Offers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const [offers] = useState([
    {
      id: 1,
      title: 'Welcome Bonus',
      description: 'Get a $100 bonus when you complete your first trade',
      type: 'bonus',
      reward: 100,
      currency: 'USD',
      eligibility: 'New users only',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      participants: 1250,
      maxParticipants: 5000,
      difficulty: 'Easy',
      requirements: ['Complete profile verification', 'Make first trade of $50+'],
      status: 'active',
      featured: true
    },
    {
      id: 2,
      title: 'Team Builder Reward',
      description: 'Earn 5% commission for every team member you refer',
      type: 'team',
      reward: 5,
      currency: '%',
      eligibility: 'All verified users',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      participants: 850,
      maxParticipants: null,
      difficulty: 'Medium',
      requirements: ['Refer new users', 'Referred users must be active'],
      status: 'active',
      featured: false
    },
    {
      id: 3,
      title: 'Monthly Trading Challenge',
      description: 'Top 10 traders win up to $500 bonus',
      type: 'personal',
      reward: 500,
      currency: 'USD',
      eligibility: 'Active traders',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      participants: 320,
      maxParticipants: 1000,
      difficulty: 'Hard',
      requirements: ['Minimum 20 trades per month', 'Maintain positive P&L'],
      status: 'active',
      featured: true
    },
    {
      id: 4,
      title: 'Loyalty Points Program',
      description: 'Earn points for every trade and redeem for bonuses',
      type: 'bonus',
      reward: 1,
      currency: 'points',
      eligibility: 'All users',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      participants: 2100,
      maxParticipants: null,
      difficulty: 'Easy',
      requirements: ['Complete trades', 'Maintain account activity'],
      status: 'active',
      featured: false
    },
    {
      id: 5,
      title: 'VIP Trader Bonus',
      description: 'Exclusive 20% bonus for high-volume traders',
      type: 'personal',
      reward: 20,
      currency: '%',
      eligibility: 'VIP members only',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      participants: 45,
      maxParticipants: 100,
      difficulty: 'Hard',
      requirements: ['VIP status', 'Minimum $10,000 trading volume'],
      status: 'active',
      featured: true
    },
    {
      id: 6,
      title: 'Social Media Promotion',
      description: 'Share our platform and earn $25 for each valid share',
      type: 'bonus',
      reward: 25,
      currency: 'USD',
      eligibility: 'All verified users',
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      participants: 680,
      maxParticipants: 2000,
      difficulty: 'Easy',
      requirements: ['Share on social media', 'Tag 3 friends', 'Use official hashtag'],
      status: 'ending_soon',
      featured: false
    }
  ])

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || offer.type === filterType
    return matchesSearch && matchesType
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.startDate) - new Date(a.startDate)
      case 'reward':
        return b.reward - a.reward
      case 'participants':
        return b.participants - a.participants
      default:
        return 0
    }
  })

  const getTypeIcon = (type) => {
    switch (type) {
      case 'bonus': return <Gift className="h-4 w-4" />
      case 'team': return <Users className="h-4 w-4" />
      case 'personal': return <TrendingUp className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'bonus': return 'bg-green-100 text-green-800'
      case 'team': return 'bg-purple-100 text-purple-800'
      case 'personal': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleJoinOffer = (offerId) => {
    // In a real app, this would make an API call
    console.log('Joining offer:', offerId)
    // Show success message or redirect
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Available Offers</h1>
        <p className="text-gray-600 mt-1">
          Discover opportunities to earn bonuses and rewards
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search offers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="bonus">Bonus Offers</SelectItem>
            <SelectItem value="team">Team Rewards</SelectItem>
            <SelectItem value="personal">Personal Income</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="reward">Highest Reward</SelectItem>
            <SelectItem value="participants">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Offers */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-500" />
          Featured Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.filter(offer => offer.featured).map((offer) => (
            <Card key={offer.id} className="border-2 border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${getTypeColor(offer.type)}`}>
                      {getTypeIcon(offer.type)}
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  </div>
                  <Badge className={getDifficultyColor(offer.difficulty)}>
                    {offer.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reward:</span>
                    <span className="font-bold text-lg text-green-600">
                      {offer.currency === '%' ? `${offer.reward}%` : 
                       offer.currency === 'points' ? `${offer.reward} pts` :
                       `$${offer.reward}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Participants:</span>
                    <span className="text-sm">
                      {offer.participants.toLocaleString()}
                      {offer.maxParticipants && ` / ${offer.maxParticipants.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ends:</span>
                    <span className="text-sm flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(offer.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Requirements:</span>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {offer.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleJoinOffer(offer.id)}
                    disabled={offer.status === 'ending_soon' && offer.maxParticipants && offer.participants >= offer.maxParticipants}
                  >
                    {offer.status === 'ending_soon' ? 'Join Before It Ends!' : 'Join Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Offers */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.filter(offer => !offer.featured).map((offer) => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${getTypeColor(offer.type)}`}>
                      {getTypeIcon(offer.type)}
                    </div>
                    <Badge variant="outline" className={getTypeColor(offer.type)}>
                      {offer.type}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getDifficultyColor(offer.difficulty)}>
                      {offer.difficulty}
                    </Badge>
                    {offer.status === 'ending_soon' && (
                      <Badge variant="destructive" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        Ending Soon
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{offer.title}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reward:</span>
                    <span className="font-bold text-lg text-green-600">
                      {offer.currency === '%' ? `${offer.reward}%` : 
                       offer.currency === 'points' ? `${offer.reward} pts` :
                       `$${offer.reward}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Participants:</span>
                    <span className="text-sm">
                      {offer.participants.toLocaleString()}
                      {offer.maxParticipants && ` / ${offer.maxParticipants.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Eligibility:</span>
                    <span className="text-sm">{offer.eligibility}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Requirements:</span>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {offer.requirements.slice(0, 2).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          {req}
                        </li>
                      ))}
                      {offer.requirements.length > 2 && (
                        <li className="text-blue-600 cursor-pointer">
                          +{offer.requirements.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={offer.status === 'ending_soon' ? 'default' : 'outline'}
                    onClick={() => handleJoinOffer(offer.id)}
                    disabled={offer.maxParticipants && offer.participants >= offer.maxParticipants}
                  >
                    {offer.maxParticipants && offer.participants >= offer.maxParticipants 
                      ? 'Full' 
                      : offer.status === 'ending_soon' 
                        ? 'Join Before It Ends!' 
                        : 'Join Now'
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find more offers.
          </p>
        </div>
      )}
    </div>
  )
}

export default Offers

