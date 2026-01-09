import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { 
  Coins, 
  Trophy, 
  Flame, 
  Star, 
  Gift, 
  TrendingUp,
  Medal,
  Target,
  Zap,
  Award,
  Crown,
  Clock,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock user reward data
const mockUserData = {
  name: 'Citizen User',
  totalPoints: 2450,
  balance: 245, // Rs (10 points = 1 Rs)
  level: 8,
  levelProgress: 65, // percentage to next level
  currentStreak: 12,
  longestStreak: 28,
  totalDeposits: 245,
  rank: 42,
  badges: [
    { id: 1, name: 'First Deposit', icon: Star, earned: true, description: 'Made your first waste deposit' },
    { id: 2, name: 'Streak Master', icon: Flame, earned: true, description: 'Maintained 7-day streak' },
    { id: 3, name: 'Eco Warrior', icon: Trophy, earned: true, description: 'Deposited 100 times' },
    { id: 4, name: 'Sorting Pro', icon: Target, earned: true, description: 'Correctly sorted 50 items' },
    { id: 5, name: 'Community Hero', icon: Medal, earned: false, description: 'Reach top 10 on leaderboard' },
    { id: 6, name: 'Legendary', icon: Crown, earned: false, description: 'Reach level 20' },
  ],
};

const mockTransactions = [
  { id: 1, type: 'deposit', points: 10, description: 'Dry waste deposit', time: '2 hours ago', binId: 'BIN-001' },
  { id: 2, type: 'deposit', points: 10, description: 'Wet waste deposit', time: '5 hours ago', binId: 'BIN-002' },
  { id: 3, type: 'bonus', points: 50, description: 'Streak bonus (7 days)', time: '1 day ago' },
  { id: 4, type: 'deposit', points: 10, description: 'Metal waste deposit', time: '1 day ago', binId: 'BIN-003' },
  { id: 5, type: 'redeem', points: -100, description: 'Redeemed ₹10', time: '3 days ago' },
  { id: 6, type: 'levelup', points: 100, description: 'Level 8 bonus', time: '5 days ago' },
];

const mockLeaderboard = [
  { rank: 1, name: 'Priya S.', points: 8920, level: 15, badge: Crown },
  { rank: 2, name: 'Rahul M.', points: 7450, level: 14, badge: Trophy },
  { rank: 3, name: 'Anjali K.', points: 6780, level: 13, badge: Medal },
  { rank: 4, name: 'Vikram R.', points: 5230, level: 11, badge: Star },
  { rank: 5, name: 'Neha P.', points: 4890, level: 10, badge: Star },
];

const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200, 6500, 8000, 10000, 12500, 15500, 19000, 23000, 27500, 32500, 38000];

const Rewards = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'leaderboard' | 'redeem'>('overview');

  const nextLevelPoints = levelThresholds[mockUserData.level] || 5000;
  const currentLevelPoints = levelThresholds[mockUserData.level - 1] || 0;
  const pointsInLevel = mockUserData.totalPoints - currentLevelPoints;
  const pointsNeeded = nextLevelPoints - currentLevelPoints;

  return (
    <>
      <Helmet>
        <title>Rewards - SmartBin Eco Points</title>
        <meta name="description" content="Track your eco points, earn rewards for recycling, and compete on the leaderboard." />
      </Helmet>
      <Layout>
        <section className="pt-28 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="font-orbitron text-3xl font-bold mb-2">
                  Eco <span className="text-primary">Rewards</span>
                </h1>
                <p className="text-muted-foreground">Earn points for every deposit. 10 deposits = ₹1</p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="glass-panel px-6 py-3 flex items-center gap-3">
                  <Coins className="w-6 h-6 text-warning" />
                  <div>
                    <div className="text-xs text-muted-foreground">Points</div>
                    <div className="font-orbitron font-bold text-xl text-warning">{mockUserData.totalPoints.toLocaleString()}</div>
                  </div>
                </div>
                <div className="glass-panel px-6 py-3 flex items-center gap-3">
                  <Gift className="w-6 h-6 text-success" />
                  <div>
                    <div className="text-xs text-muted-foreground">Balance</div>
                    <div className="font-orbitron font-bold text-xl text-success">₹{mockUserData.balance}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress Card */}
            <div className="glass-panel p-6 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                      <span className="font-orbitron text-2xl font-bold text-background">{mockUserData.level}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-warning rounded-full p-1">
                      <Star className="w-4 h-4 text-background" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Level</div>
                    <div className="font-orbitron text-xl font-bold">Eco Champion</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Flame className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive font-semibold">{mockUserData.currentStreak} day streak!</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 max-w-md w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Level {mockUserData.level}</span>
                    <span className="text-primary font-semibold">{pointsInLevel} / {pointsNeeded} XP</span>
                    <span className="text-muted-foreground">Level {mockUserData.level + 1}</span>
                  </div>
                  <Progress value={(pointsInLevel / pointsNeeded) * 100} className="h-3 bg-muted" />
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <ArrowUp className="w-3 h-3 text-success" />
                    <span>{pointsNeeded - pointsInLevel} XP to next level</span>
                  </div>
                </div>

                <div className="flex gap-6 text-center">
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-foreground">{mockUserData.totalDeposits}</div>
                    <div className="text-xs text-muted-foreground">Deposits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-foreground">#{mockUserData.rank}</div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-foreground">{mockUserData.longestStreak}</div>
                    <div className="text-xs text-muted-foreground">Best Streak</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {(['overview', 'history', 'leaderboard', 'redeem'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary/20 text-primary border border-primary/50'
                      : 'bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Badges */}
                <div className="glass-panel p-6">
                  <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {mockUserData.badges.map((badge) => {
                      const BadgeIcon = badge.icon;
                      return (
                        <div
                          key={badge.id}
                          className={`p-4 rounded-lg border text-center transition-all ${
                            badge.earned
                              ? 'bg-primary/10 border-primary/30 hover:border-primary/50'
                              : 'bg-muted/20 border-border opacity-50'
                          }`}
                        >
                          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                            badge.earned ? 'bg-primary/20' : 'bg-muted/30'
                          }`}>
                            <BadgeIcon className={`w-6 h-6 ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div className={`text-sm font-semibold ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {badge.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* How it works */}
                <div className="glass-panel p-6">
                  <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    How to Earn
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/20">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Deposit Waste</div>
                        <div className="text-sm text-muted-foreground">Earn 10 points per deposit at any SmartBin</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/20">
                      <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Maintain Streaks</div>
                        <div className="text-sm text-muted-foreground">7-day streak = 50 bonus points!</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/20">
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Level Up</div>
                        <div className="text-sm text-muted-foreground">Each level = 100 bonus points</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/20">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Correct Sorting</div>
                        <div className="text-sm text-muted-foreground">+5 bonus for proper waste segregation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="glass-panel p-6">
                <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Transaction History
                </h2>
                <div className="space-y-3">
                  {mockTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'deposit' ? 'bg-success/20' :
                          tx.type === 'bonus' ? 'bg-warning/20' :
                          tx.type === 'levelup' ? 'bg-primary/20' :
                          'bg-secondary/20'
                        }`}>
                          {tx.type === 'deposit' && <TrendingUp className="w-5 h-5 text-success" />}
                          {tx.type === 'bonus' && <Sparkles className="w-5 h-5 text-warning" />}
                          {tx.type === 'levelup' && <Star className="w-5 h-5 text-primary" />}
                          {tx.type === 'redeem' && <Gift className="w-5 h-5 text-secondary" />}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{tx.description}</div>
                          <div className="text-xs text-muted-foreground">{tx.time} {tx.binId && `• ${tx.binId}`}</div>
                        </div>
                      </div>
                      <div className={`font-orbitron font-bold ${tx.points > 0 ? 'text-success' : 'text-destructive'}`}>
                        {tx.points > 0 ? '+' : ''}{tx.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="glass-panel p-6">
                <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-warning" />
                  Top Eco Warriors
                </h2>
                <div className="space-y-3">
                  {mockLeaderboard.map((user) => {
                    const BadgeIcon = user.badge;
                    return (
                      <div key={user.rank} className={`flex items-center justify-between p-4 rounded-lg border ${
                        user.rank === 1 ? 'bg-warning/10 border-warning/30' :
                        user.rank === 2 ? 'bg-muted/40 border-muted-foreground/30' :
                        user.rank === 3 ? 'bg-orange-900/20 border-orange-500/30' :
                        'bg-muted/20 border-border'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold ${
                            user.rank === 1 ? 'bg-warning text-background' :
                            user.rank === 2 ? 'bg-muted-foreground text-background' :
                            user.rank === 3 ? 'bg-orange-600 text-background' :
                            'bg-muted text-foreground'
                          }`}>
                            {user.rank}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-2">
                              {user.name}
                              <BadgeIcon className={`w-4 h-4 ${
                                user.rank === 1 ? 'text-warning' :
                                user.rank === 2 ? 'text-muted-foreground' :
                                user.rank === 3 ? 'text-orange-500' :
                                'text-primary'
                              }`} />
                            </div>
                            <div className="text-xs text-muted-foreground">Level {user.level}</div>
                          </div>
                        </div>
                        <div className="font-orbitron font-bold text-primary">{user.points.toLocaleString()} pts</div>
                      </div>
                    );
                  })}
                  
                  {/* Current user position */}
                  <div className="border-t border-primary/30 my-4" />
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-orbitron font-bold text-primary">
                        {mockUserData.rank}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">You</div>
                        <div className="text-xs text-muted-foreground">Level {mockUserData.level}</div>
                      </div>
                    </div>
                    <div className="font-orbitron font-bold text-primary">{mockUserData.totalPoints.toLocaleString()} pts</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'redeem' && (
              <div className="glass-panel p-6">
                <h2 className="font-orbitron text-lg font-semibold mb-2 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Redeem Rewards
                </h2>
                <p className="text-muted-foreground mb-6">Convert your points to cash! 10 points = ₹1</p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[10, 50, 100, 200].map((amount) => {
                    const pointsRequired = amount * 10;
                    const canRedeem = mockUserData.totalPoints >= pointsRequired;
                    return (
                      <div
                        key={amount}
                        className={`p-6 rounded-lg border text-center transition-all ${
                          canRedeem
                            ? 'bg-success/10 border-success/30 hover:border-success/50 cursor-pointer'
                            : 'bg-muted/20 border-border opacity-50'
                        }`}
                      >
                        <div className="text-3xl font-orbitron font-bold text-success mb-2">₹{amount}</div>
                        <div className="text-sm text-muted-foreground mb-4">{pointsRequired} points</div>
                        <button
                          disabled={!canRedeem}
                          className={`w-full py-2 rounded-lg font-semibold text-sm ${
                            canRedeem
                              ? 'bg-success text-background hover:bg-success/90'
                              : 'bg-muted text-muted-foreground cursor-not-allowed'
                          }`}
                        >
                          {canRedeem ? 'Redeem Now' : 'Not Enough'}
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Coins className="w-4 h-4 text-warning" />
                    <span>Your current balance: <strong className="text-warning">{mockUserData.totalPoints} points</strong> = <strong className="text-success">₹{mockUserData.balance}</strong></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Rewards;
