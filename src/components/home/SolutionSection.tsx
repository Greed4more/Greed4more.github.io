import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Recycle, 
  Gauge, 
  MapPin, 
  Brain, 
  Route,
  ArrowRight
} from 'lucide-react';

const solutions = [
  {
    icon: Recycle,
    title: 'Auto Sorting',
    description: 'Automatically sorts dry, wet, and metal waste',
    color: 'primary',
  },
  {
    icon: Gauge,
    title: 'Fill Monitoring',
    description: 'Real-time fill level tracking with alerts',
    color: 'accent',
  },
  {
    icon: MapPin,
    title: 'GPS Tracking',
    description: 'Live location monitoring and theft prevention',
    color: 'secondary',
  },
  {
    icon: Brain,
    title: 'AI Classification',
    description: 'Visual AI for complex item identification',
    color: 'neon-green',
  },
  {
    icon: Route,
    title: 'Route Optimization',
    description: 'Efficient collection route planning',
    color: 'warning',
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Vision
            </span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            The <span className="text-gradient">Smart Solution</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            A smart bin system that sorts waste automatically, monitors fill levels, 
            tracks bin location, and alerts authorities in real-time.
          </p>
          
          {/* Main value proposition */}
          <div className="glass-panel p-6 inline-flex items-center gap-4 hover-glow">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-orbitron text-lg font-semibold text-foreground">IoT + AI Automation</div>
              <div className="text-muted-foreground text-sm">Making cities cleaner, safer, and smarter</div>
            </div>
          </div>
        </div>

        {/* Solution features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="glass-panel p-6 text-center group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <solution.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-orbitron text-sm font-semibold mb-2 text-foreground">
                {solution.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Reduce Overflow', value: 'Complaints' },
            { label: 'Cut Collection', value: 'Costs' },
            { label: 'Faster Response', value: 'Times' },
            { label: 'Data-Driven', value: 'Planning' },
          ].map((benefit, i) => (
            <div key={i} className="bg-muted/30 border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
              <div className="text-primary font-orbitron font-semibold">{benefit.label}</div>
              <div className="text-muted-foreground text-sm">{benefit.value}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/how-it-works" className="btn-cyber inline-flex items-center gap-2 group">
            See How It Works
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
