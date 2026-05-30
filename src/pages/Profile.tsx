import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Coins, Gift, Trash2, LogOut, Recycle, Plus, Clock, User as UserIcon, ShieldCheck,
} from 'lucide-react';
import { clearSession } from '@/lib/faceAuth';
import {
  getCurrentUser, getUserData, addDeposit, Deposit,
} from '@/lib/userData';
import { toast } from '@/hooks/use-toast';

const WASTE_TYPES: Deposit['type'][] = ['Dry', 'Wet', 'Metal', 'Plastic', 'E-Waste'];

const Profile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [data, setData] = useState(() => (user ? getUserData(user.email) : null));

  useEffect(() => {
    if (user) setData(getUserData(user.email));
  }, [user?.email]);

  if (!user) return <Navigate to="/auth" replace />;

  const balance = Math.floor((data?.points ?? 0) / 10);

  const byType = useMemo(() => {
    const map: Record<string, number> = {};
    data?.deposits.forEach((d) => (map[d.type] = (map[d.type] ?? 0) + 1));
    return map;
  }, [data]);

  const handleAdd = (type: Deposit['type']) => {
    const binId = `BIN-${String(Math.floor(Math.random() * 900) + 100)}`;
    const updated = addDeposit(user.email, { type, binId, points: 10 });
    setData(updated);
    toast({ title: '+10 pts', description: `${type} waste logged at ${binId}` });
  };

  const handleLogout = () => {
    clearSession();
    toast({ title: 'Signed out' });
    navigate('/');
  };

  return (
    <Layout>
      <Helmet>
        <title>Your Profile — SmartBin</title>
        <meta name="description" content="Your personal SmartBin profile: rewards earned and your waste-deposit history." />
      </Helmet>

      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Identity header */}
          <div className="glass-panel p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
                <UserIcon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-primary" /> Verified Identity
                </div>
                <h1 className="font-orbitron text-2xl font-bold text-foreground">{user.name}</h1>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-primary/30">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatTile icon={<Coins className="w-5 h-5 text-warning" />} label="Points" value={data?.points ?? 0} />
            <StatTile icon={<Gift className="w-5 h-5 text-success" />} label="Balance" value={`₹${balance}`} />
            <StatTile icon={<Recycle className="w-5 h-5 text-primary" />} label="Deposits" value={data?.deposits.length ?? 0} />
            <StatTile icon={<Trash2 className="w-5 h-5 text-secondary" />} label="Waste Types" value={Object.keys(byType).length} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Log new deposit */}
            <div className="glass-panel p-6">
              <h2 className="font-orbitron text-lg font-semibold mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" /> Log a Deposit
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Each deposit earns 10 eco-points.</p>
              <div className="flex flex-wrap gap-2">
                {WASTE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleAdd(t)}
                    className="px-4 py-2 rounded-lg border border-primary/30 bg-background/40 text-sm font-rajdhani uppercase tracking-wider text-foreground hover:bg-primary/15 hover:border-primary/60 transition-all"
                  >
                    + {t}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Breakdown</h3>
                {Object.keys(byType).length === 0 ? (
                  <div className="text-sm text-muted-foreground italic">No deposits yet — log your first above.</div>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(byType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{type}</span>
                        <span className="font-orbitron text-primary">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/rewards"
                className="inline-block mt-6 text-xs text-primary hover:text-primary/80 uppercase tracking-widest"
              >
                View public rewards dashboard →
              </Link>
            </div>

            {/* History */}
            <div className="glass-panel p-6">
              <h2 className="font-orbitron text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Your Garbage History
              </h2>
              {!data || data.deposits.length === 0 ? (
                <div className="text-sm text-muted-foreground italic py-8 text-center">
                  Nothing here yet. Your disposals will appear in real time.
                </div>
              ) : (
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
                  {data.deposits.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-primary/15 bg-background/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                          <Recycle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{d.type} waste</div>
                          <div className="text-[11px] text-muted-foreground font-mono">
                            {d.binId} • {new Date(d.at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="font-orbitron text-success text-sm">+{d.points}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const StatTile = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <div className="glass-panel p-4">
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-1">
      {icon} {label}
    </div>
    <div className="font-orbitron text-2xl font-bold text-foreground">{value}</div>
  </div>
);

export default Profile;
