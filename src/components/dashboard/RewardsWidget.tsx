import { Link } from 'react-router-dom';
import { Coins, Flame, Trophy, ArrowRight, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data - would come from user context/API
const mockRewardsData = {
  points: 2450,
  balance: 245,
  level: 8,
  streak: 12,
  levelProgress: 65,
  rank: 42,
};

const RewardsWidget = () => {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-orbitron text-lg font-semibold flex items-center gap-2">
          <Coins className="w-5 h-5 text-warning" />
          Eco Rewards
        </h2>
        <Link 
          to="/rewards" 
          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Coins className="w-4 h-4 text-warning" />
            <span className="text-xs text-muted-foreground">Points</span>
          </div>
          <div className="font-orbitron font-bold text-xl text-warning">
            {mockRewardsData.points.toLocaleString()}
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">Balance</span>
          </div>
          <div className="font-orbitron font-bold text-xl text-success">
            ₹{mockRewardsData.balance}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="font-orbitron text-xs font-bold text-background">{mockRewardsData.level}</span>
            </div>
            <span className="text-muted-foreground">Level</span>
          </div>
          <span className="text-xs text-primary">{mockRewardsData.levelProgress}%</span>
        </div>
        <Progress value={mockRewardsData.levelProgress} className="h-2 bg-muted" />
      </div>

      {/* Streak & Rank */}
      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-destructive" />
          <div>
            <div className="text-sm font-semibold text-destructive">{mockRewardsData.streak} days</div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </div>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          <div>
            <div className="text-sm font-semibold text-warning">#{mockRewardsData.rank}</div>
            <div className="text-xs text-muted-foreground">Rank</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link 
        to="/rewards" 
        className="block mt-4 w-full py-2 text-center bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
      >
        View Full Rewards Dashboard
      </Link>
    </div>
  );
};

export default RewardsWidget;
