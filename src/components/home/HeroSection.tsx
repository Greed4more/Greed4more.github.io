import { Link } from 'react-router-dom';
import { ArrowRight, Play, Recycle, Cpu, MapPin, BarChart3 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated HUD circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 border border-primary/10 rounded-full animate-rotate-slow" />
        <div className="absolute inset-12 border border-primary/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute inset-24 border border-secondary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '25s' }} />
      </div>

      {/* Floating icons */}
      <div className="absolute top-1/4 left-[15%] animate-float opacity-20">
        <Recycle className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-1/3 right-[15%] animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Cpu className="w-12 h-12 text-secondary" />
      </div>
      <div className="absolute bottom-1/4 left-[20%] animate-float opacity-20" style={{ animationDelay: '4s' }}>
        <MapPin className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute bottom-1/3 right-[20%] animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <BarChart3 className="w-10 h-10 text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 opacity-0 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              IoT + AI Powered Solution
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up delay-100">
            <span className="text-foreground">Smart Waste</span>
            <br />
            <span className="text-gradient">Management System</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up delay-200">
            AI + IoT powered bins for a cleaner future. Automate waste sorting, 
            monitor fill levels, track locations, and optimize collection routes 
            in real-time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-up delay-300">
            <Link to="/how-it-works" className="btn-cyber group">
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/dashboard" className="btn-cyber-secondary group">
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-4 h-4" />
                View Dashboard
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-up delay-400">
            {[
              { value: '150K', label: 'Tonnes/Day', sublabel: 'Waste Generated' },
              { value: '30%', label: 'Processed', sublabel: 'Properly' },
              { value: '165%', label: 'Growth', sublabel: 'By 2030' },
              { value: '24/7', label: 'Monitoring', sublabel: 'Real-time' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 text-center group hover:border-primary/40 transition-all duration-300">
                <div className="font-orbitron text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:neon-text transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
