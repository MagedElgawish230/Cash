import { useState } from 'react'
import { useAuth } from '../App'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Smartphone,
  Building,
  Bitcoin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Info
} from 'lucide-react'

const Withdrawal = () => {
  const { user } = useAuth()
  
  const [withdrawalData, setWithdrawalData] = useState({
    type: '',
    amount: '',
    method: '',
    accountDetails: {
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      accountHolder: '',
      paypalEmail: '',
      cryptoAddress: ''
    }
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Mock user balance data
  const [balances] = useState({
    personal: 5420.75,
    team: 2150.50,
    bonus: 1349.25,
    capital: 8500.00
  })

  // Mock verification status
  const [verificationStatus] = useState({
    email: true,
    phone: true,
    identity: true,
    address: false
  })

  const withdrawalMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Building, fee: 5.00, minAmount: 50, maxAmount: 10000, processingTime: '1-3 business days' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, fee: 2.50, minAmount: 10, maxAmount: 5000, processingTime: '24 hours' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, fee: 15.00, minAmount: 100, maxAmount: 50000, processingTime: '1-2 hours' }
  ]

  const isVerified = verificationStatus.email && verificationStatus.phone && verificationStatus.identity

  const handleInputChange = (field, value) => {
    setWithdrawalData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  const handleAccountDetailsChange = (field, value) => {
    setWithdrawalData(prev => ({
      ...prev,
      accountDetails: {
        ...prev.accountDetails,
        [field]: value
      }
    }))
  }

  const getMaxAmount = () => {
    if (!withdrawalData.type) return 0
    return balances[withdrawalData.type] || 0
  }

  const getSelectedMethod = () => {
    return withdrawalMethods.find(method => method.id === withdrawalData.method)
  }

  const calculateFee = () => {
    const method = getSelectedMethod()
    return method ? method.fee : 0
  }

  const calculateNetAmount = () => {
    const amount = parseFloat(withdrawalData.amount) || 0
    const fee = calculateFee()
    return Math.max(0, amount - fee)
  }

  const validateWithdrawal = () => {
    if (!withdrawalData.type) {
      setError('Please select a withdrawal type')
      return false
    }
    
    if (!withdrawalData.method) {
      setError('Please select a withdrawal method')
      return false
    }
    
    const amount = parseFloat(withdrawalData.amount)
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount')
      return false
    }
    
    const method = getSelectedMethod()
    if (amount < method.minAmount) {
      setError(`Minimum withdrawal amount for ${method.name} is $${method.minAmount}`)
      return false
    }
    
    if (amount > method.maxAmount) {
      setError(`Maximum withdrawal amount for ${method.name} is $${method.maxAmount}`)
      return false
    }
    
    if (amount > getMaxAmount()) {
      setError('Insufficient balance for this withdrawal type')
      return false
    }

    // Validate account details based on method
    if (withdrawalData.method === 'bank') {
      if (!withdrawalData.accountDetails.bankName || !withdrawalData.accountDetails.accountNumber || 
          !withdrawalData.accountDetails.routingNumber || !withdrawalData.accountDetails.accountHolder) {
        setError('Please fill in all bank account details')
        return false
      }
    } else if (withdrawalData.method === 'paypal') {
      if (!withdrawalData.accountDetails.paypalEmail) {
        setError('Please enter your PayPal email address')
        return false
      }
    } else if (withdrawalData.method === 'crypto') {
      if (!withdrawalData.accountDetails.cryptoAddress) {
        setError('Please enter your cryptocurrency wallet address')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateWithdrawal()) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccess(true)
      setWithdrawalData({
        type: '',
        amount: '',
        method: '',
        accountDetails: {
          bankName: '',
          accountNumber: '',
          routingNumber: '',
          accountHolder: '',
          paypalEmail: '',
          cryptoAddress: ''
        }
      })
    } catch (err) {
      setError('Withdrawal request failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isVerified) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Withdrawal</h1>
          <p className="text-gray-600 mt-1">
            Request withdrawals from your account
          </p>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-medium text-red-900 mb-2">Verification Required</h3>
                <p className="text-red-700 mb-4">
                  You need to complete account verification before you can request withdrawals.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {verificationStatus.email ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm">Email Verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {verificationStatus.phone ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm">Phone Verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {verificationStatus.identity ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm">Identity Verification</span>
                  </div>
                </div>
                <Button className="mt-4">
                  Complete Verification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Withdrawal</h1>
        <p className="text-gray-600 mt-1">
          Request withdrawals from your verified account
        </p>
      </div>

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Your withdrawal request has been submitted successfully. You will receive a confirmation email shortly.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Balances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Available Balances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Personal Earnings</p>
                  <p className="text-sm text-gray-600">Trading profits</p>
                </div>
                <p className="font-bold text-green-600">${balances.personal.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Team Earnings</p>
                  <p className="text-sm text-gray-600">Commission income</p>
                </div>
                <p className="font-bold text-blue-600">${balances.team.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Bonuses</p>
                  <p className="text-sm text-gray-600">Promotional rewards</p>
                </div>
                <p className="font-bold text-purple-600">${balances.bonus.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Capital</p>
                  <p className="text-sm text-gray-600">Investment capital</p>
                </div>
                <p className="font-bold text-orange-600">${balances.capital.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowDownRight className="mr-2 h-5 w-5" />
              Request Withdrawal
            </CardTitle>
            <CardDescription>
              Fill in the details below to request a withdrawal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Withdrawal Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Withdrawal Type</Label>
                <Select value={withdrawalData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select withdrawal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Earnings (${balances.personal.toLocaleString()})</SelectItem>
                    <SelectItem value="team">Team Earnings (${balances.team.toLocaleString()})</SelectItem>
                    <SelectItem value="bonus">Bonuses (${balances.bonus.toLocaleString()})</SelectItem>
                    <SelectItem value="capital">Capital (${balances.capital.toLocaleString()})</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Withdrawal Method */}
              <div className="space-y-2">
                <Label htmlFor="method">Withdrawal Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {withdrawalMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          withdrawalData.method === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('method', method.id)}
                      >
                        <div className="text-center">
                          <Icon className="mx-auto h-6 w-6 mb-2" />
                          <p className="font-medium">{method.name}</p>
                          <p className="text-xs text-gray-600">Fee: ${method.fee}</p>
                          <p className="text-xs text-gray-600">{method.processingTime}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={withdrawalData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="pl-10"
                    min="0"
                    step="0.01"
                    max={getMaxAmount()}
                  />
                </div>
                {withdrawalData.type && (
                  <p className="text-sm text-gray-600">
                    Available: ${getMaxAmount().toLocaleString()}
                  </p>
                )}
                {getSelectedMethod() && (
                  <p className="text-sm text-gray-600">
                    Min: ${getSelectedMethod().minAmount} | Max: ${getSelectedMethod().maxAmount.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Account Details */}
              {withdrawalData.method === 'bank' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        placeholder="Enter bank name"
                        value={withdrawalData.accountDetails.bankName}
                        onChange={(e) => handleAccountDetailsChange('bankName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountHolder">Account Holder Name</Label>
                      <Input
                        id="accountHolder"
                        placeholder="Enter account holder name"
                        value={withdrawalData.accountDetails.accountHolder}
                        onChange={(e) => handleAccountDetailsChange('accountHolder', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter account number"
                        value={withdrawalData.accountDetails.accountNumber}
                        onChange={(e) => handleAccountDetailsChange('accountNumber', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        placeholder="Enter routing number"
                        value={withdrawalData.accountDetails.routingNumber}
                        onChange={(e) => handleAccountDetailsChange('routingNumber', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {withdrawalData.method === 'paypal' && (
                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">PayPal Email</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    placeholder="Enter your PayPal email"
                    value={withdrawalData.accountDetails.paypalEmail}
                    onChange={(e) => handleAccountDetailsChange('paypalEmail', e.target.value)}
                  />
                </div>
              )}

              {withdrawalData.method === 'crypto' && (
                <div className="space-y-2">
                  <Label htmlFor="cryptoAddress">Cryptocurrency Wallet Address</Label>
                  <Input
                    id="cryptoAddress"
                    placeholder="Enter your wallet address"
                    value={withdrawalData.accountDetails.cryptoAddress}
                    onChange={(e) => handleAccountDetailsChange('cryptoAddress', e.target.value)}
                  />
                  <p className="text-sm text-gray-600">
                    Currently supporting Bitcoin (BTC) withdrawals only
                  </p>
                </div>
              )}

              {/* Summary */}
              {withdrawalData.amount && withdrawalData.method && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <h3 className="font-medium">Withdrawal Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span>Withdrawal Amount:</span>
                    <span>${parseFloat(withdrawalData.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee:</span>
                    <span>${calculateFee().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Net Amount:</span>
                    <span>${calculateNetAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing Time:</span>
                    <span>{getSelectedMethod()?.processingTime}</span>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !withdrawalData.type || !withdrawalData.method || !withdrawalData.amount}
              >
                {loading ? 'Processing...' : 'Submit Withdrawal Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Security Notice</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• All withdrawal requests are reviewed for security purposes</li>
                <li>• You will receive email confirmations for all withdrawal activities</li>
                <li>• Processing times may vary based on the selected method and amount</li>
                <li>• Contact support if you have any questions about your withdrawal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Withdrawal

