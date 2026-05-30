import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Scan, UserPlus, LogIn, Loader2, ShieldCheck, Camera } from 'lucide-react';
import {
  loadFaceModels,
  getFaceDescriptor,
  saveUser,
  findMatch,
  setSession,
  getUsers,
} from '@/lib/faceAuth';

type Mode = 'login' | 'register';

const Auth = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<Mode>('login');
  const [modelsReady, setModelsReady] = useState(false);
  const [camReady, setCamReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string>('Initialising biometric core…');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStatus('Loading neural face models…');
        await loadFaceModels();
        if (cancelled) return;
        setModelsReady(true);
        setStatus('Requesting camera access…');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 480, height: 360, facingMode: 'user' },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCamReady(true);
          setStatus('Ready. Align your face inside the frame.');
        }
      } catch (e: any) {
        setStatus(`Camera/model error: ${e?.message ?? 'unknown'}`);
      }
    })();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleRegister = async () => {
    if (!email.trim() || !name.trim()) {
      toast({ title: 'Missing info', description: 'Enter name and email first.' });
      return;
    }
    if (getUsers().some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      toast({ title: 'Email exists', description: 'Try logging in instead.' });
      return;
    }
    if (!videoRef.current) return;
    setBusy(true);
    setStatus('Scanning facial geometry…');
    try {
      const desc = await getFaceDescriptor(videoRef.current);
      if (!desc) {
        setStatus('No face detected. Adjust lighting & try again.');
        toast({ title: 'No face detected' });
        return;
      }
      saveUser({
        email: email.trim(),
        name: name.trim(),
        descriptor: Array.from(desc),
        createdAt: Date.now(),
      });
      setSession(email.trim());
      setStatus('Identity enrolled. Welcome to SmartBin.');
      toast({ title: 'Registered', description: `Welcome aboard, ${name}!` });
      setTimeout(() => navigate('/dashboard'), 700);
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async () => {
    if (!videoRef.current) return;
    setBusy(true);
    setStatus('Matching against enrolled identities…');
    try {
      const desc = await getFaceDescriptor(videoRef.current);
      if (!desc) {
        setStatus('No face detected. Try again.');
        toast({ title: 'No face detected' });
        return;
      }
      const match = findMatch(desc);
      if (!match) {
        setStatus('No match found. Register first or retry.');
        toast({ title: 'Access denied', description: 'Face not recognised.' });
        return;
      }
      setSession(match.user.email);
      setStatus(`Match: ${match.user.name} (distance ${match.distance.toFixed(3)})`);
      toast({
        title: 'Welcome back',
        description: `${match.user.name} — confidence ${(100 - match.distance * 100).toFixed(1)}%`,
      });
      setTimeout(() => navigate('/dashboard'), 700);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Biometric Login — SmartBin</title>
        <meta name="description" content="Secure face-recognition login & email registration for the SmartBin platform." />
      </Helmet>

      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-rajdhani uppercase tracking-[0.3em] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Biometric Access Portal
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-foreground mb-3">
              FACE<span className="text-primary">_AUTH</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              On-device neural face recognition. No images leave your browser — only an encrypted descriptor.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Camera panel */}
            <div className="glass-panel p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary font-rajdhani uppercase tracking-widest text-xs">
                  <Camera className="w-4 h-4" /> Live Feed
                </div>
                <div className={`text-xs font-mono ${camReady ? 'text-green-400' : 'text-amber-400'}`}>
                  {camReady ? '● ONLINE' : '○ STANDBY'}
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black border border-primary/30">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                {/* HUD overlay */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-8 border-2 border-primary/60 rounded-lg" />
                  <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-primary" />
                  {busy && (
                    <div className="absolute left-8 right-8 h-0.5 bg-primary animate-pulse top-1/2" />
                  )}
                </div>
                {!camReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/70 text-muted-foreground text-sm">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" /> Initialising…
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 rounded border border-primary/20 bg-background/40 font-mono text-xs text-muted-foreground">
                <span className="text-primary">{'>'}</span> {status}
              </div>
            </div>

            {/* Form panel */}
            <div className="glass-panel p-6">
              <div className="flex gap-2 mb-6 p-1 rounded-lg border border-primary/30 bg-background/40">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded text-sm font-rajdhani uppercase tracking-wider transition-all ${
                    mode === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LogIn className="w-4 h-4 inline mr-2" /> Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 rounded text-sm font-rajdhani uppercase tracking-wider transition-all ${
                    mode === 'register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <UserPlus className="w-4 h-4 inline mr-2" /> Register
                </button>
              </div>

              {mode === 'register' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Citizen"
                      className="mt-1 bg-background/40 border-primary/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@smartbin.io"
                      className="mt-1 bg-background/40 border-primary/30"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="mb-6 p-4 rounded border border-primary/20 bg-background/30 text-sm text-muted-foreground">
                  Look into the camera and press <span className="text-primary font-semibold">Scan & Login</span>.
                  Your facial descriptor is matched locally against enrolled users.
                </div>
              )}

              <Button
                onClick={mode === 'login' ? handleLogin : handleRegister}
                disabled={!modelsReady || !camReady || busy}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani uppercase tracking-widest"
              >
                {busy ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing</>
                ) : (
                  <><Scan className="w-4 h-4 mr-2" /> {mode === 'login' ? 'Scan & Login' : 'Capture & Register'}</>
                )}
              </Button>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded border border-primary/20 bg-background/30">
                  <div className="text-lg font-orbitron text-primary">{getUsers().length}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Enrolled</div>
                </div>
                <div className="p-3 rounded border border-primary/20 bg-background/30">
                  <div className="text-lg font-orbitron text-primary">128D</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Descriptor</div>
                </div>
                <div className="p-3 rounded border border-primary/20 bg-background/30">
                  <div className="text-lg font-orbitron text-primary">0.5</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Threshold</div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed">
                <ShieldCheck className="w-3 h-3 inline mr-1 text-primary" />
                Privacy: face data is processed in-browser via face-api.js and stored as a 128-dim vector in local storage.
                No raw imagery is transmitted.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
