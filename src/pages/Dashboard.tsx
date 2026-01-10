import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import RewardsWidget from '@/components/dashboard/RewardsWidget';
import BinMapBox from '@/components/dashboard/BinMapBox';
import { 
  MapPin, 
  Gauge, 
  Bell, 
  Route as RouteIcon,
  RefreshCw,
  Trash2,
  Droplets,
  CircleDot,
  TrendingUp,
  Clock
} from 'lucide-react';

// Mock data for bins
const mockBins = [
  { id: 'BIN-001', type: 'dry', fill: 92, location: 'Sector 5, Block A', lastUpdate: '2 min ago', lat: 19.0760, lng: 72.8777 },
  { id: 'BIN-002', type: 'wet', fill: 67, location: 'Market Square', lastUpdate: '5 min ago', lat: 19.0820, lng: 72.8820 },
  { id: 'BIN-003', type: 'metal', fill: 34, location: 'Industrial Zone', lastUpdate: '1 min ago', lat: 19.0700, lng: 72.8700 },
  { id: 'BIN-004', type: 'dry', fill: 88, location: 'Central Park', lastUpdate: '3 min ago', lat: 19.0850, lng: 72.8750 },
  { id: 'BIN-005', type: 'wet', fill: 45, location: 'Hospital Road', lastUpdate: '8 min ago', lat: 19.0780, lng: 72.8900 },
  { id: 'BIN-006', type: 'dry', fill: 23, location: 'School Campus', lastUpdate: '4 min ago', lat: 19.0900, lng: 72.8800 },
];

const mockAlerts = [
  { id: 1, binId: 'BIN-001', message: 'Fill level critical (92%)', severity: 'high', time: '2 min ago' },
  { id: 2, binId: 'BIN-004', message: 'Fill level warning (88%)', severity: 'medium', time: '3 min ago' },
  { id: 3, binId: 'BIN-002', message: 'Approaching threshold (67%)', severity: 'low', time: '5 min ago' },
];

const getStatusColor = (fill: number) => {
  if (fill >= 85) return 'destructive';
  if (fill >= 50) return 'warning';
  return 'success';
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'wet': return Droplets;
    case 'metal': return CircleDot;
    default: return Trash2;
  }
};

const Dashboard = () => {
  const [selectedBin, setSelectedBin] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 2000);
  };

  const fullBins = mockBins.filter(b => b.fill >= 85).length;
  const halfBins = mockBins.filter(b => b.fill >= 50 && b.fill < 85).length;
  const emptyBins = mockBins.filter(b => b.fill < 50).length;

  return (
    <>
      <Helmet>
        <title>Dashboard - SmartBin Monitoring System</title>
        <meta 
          name="description" 
          content="Real-time SmartBin dashboard for monitoring bin fill levels, locations, alerts, and optimizing collection routes." 
        />
      </Helmet>
      <Layout>
        <section className="pt-28 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-orbitron text-3xl font-bold mb-2">
                  Operations <span className="text-primary">Dashboard</span>
                </h1>
                <p className="text-muted-foreground">Real-time waste bin monitoring and management</p>
              </div>
              <button 
                onClick={handleOptimizeRoute}
                disabled={isOptimizing}
                className="btn-cyber flex items-center gap-2"
              >
                {isOptimizing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RouteIcon className="w-4 h-4" />
                )}
                {isOptimizing ? 'Optimizing...' : 'Optimize Routes'}
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">Total Bins</span>
                </div>
                <div className="font-orbitron text-3xl font-bold text-foreground">{mockBins.length}</div>
              </div>
              <div className="glass-panel p-5 border-destructive/30">
                <div className="flex items-center justify-between mb-3">
                  <Bell className="w-5 h-5 text-destructive" />
                  <span className="text-xs text-destructive">Full (&gt;85%)</span>
                </div>
                <div className="font-orbitron text-3xl font-bold text-destructive">{fullBins}</div>
              </div>
              <div className="glass-panel p-5 border-warning/30">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  <span className="text-xs text-warning">Half (50-85%)</span>
                </div>
                <div className="font-orbitron text-3xl font-bold text-warning">{halfBins}</div>
              </div>
              <div className="glass-panel p-5 border-success/30">
                <div className="flex items-center justify-between mb-3">
                  <Trash2 className="w-5 h-5 text-success" />
                  <span className="text-xs text-success">Empty (&lt;50%)</span>
                </div>
                <div className="font-orbitron text-3xl font-bold text-success">{emptyBins}</div>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Bin list */}
              <div className="lg:col-span-1">
                <div className="glass-panel p-4">
                  <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-primary" />
                    Bin Status
                  </h2>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {mockBins.map((bin) => {
                      const TypeIcon = getTypeIcon(bin.type);
                      const status = getStatusColor(bin.fill);
                      return (
                        <div
                          key={bin.id}
                          onClick={() => setSelectedBin(bin.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                            selectedBin === bin.id 
                              ? 'bg-primary/10 border-primary/50' 
                              : 'bg-muted/30 border-border hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg bg-${status}/10 border border-${status}/30 flex items-center justify-center`}>
                                <TypeIcon className={`w-4 h-4 text-${status}`} />
                              </div>
                              <div>
                                <div className="font-mono text-sm font-semibold text-foreground">{bin.id}</div>
                                <div className="text-xs text-muted-foreground capitalize">{bin.type}</div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium status-${status === 'destructive' ? 'full' : status === 'warning' ? 'half' : 'empty'}`}>
                              {bin.fill}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                            <div 
                              className={`h-full bg-${status} transition-all duration-500`}
                              style={{ width: `${bin.fill}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {bin.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {bin.lastUpdate}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <div className="glass-panel p-4 h-full">
                  <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Live Map
                  </h2>
                  <BinMapBox 
                    bins={mockBins}
                    selectedBin={selectedBin}
                    onSelectBin={setSelectedBin}
                    isOptimizing={isOptimizing}
                  />
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid lg:grid-cols-3 gap-6 mt-6">
              {/* Alerts */}
              <div className="lg:col-span-2 glass-panel p-4">
                <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-destructive" />
                  Active Alerts
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${
                        alert.severity === 'high' 
                          ? 'bg-destructive/10 border-destructive/30' 
                          : alert.severity === 'medium'
                          ? 'bg-warning/10 border-warning/30'
                          : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-semibold">{alert.binId}</span>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm text-foreground">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards Widget */}
              <div className="lg:col-span-1">
                <RewardsWidget />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Dashboard;
