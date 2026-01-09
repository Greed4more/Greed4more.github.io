import { AlertTriangle, Globe, TrendingUp, Bug } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Overflow Crisis',
    description: 'Overflowing bins create foul odors and mosquito breeding grounds, leading to serious public health hazards.',
  },
  {
    icon: Globe,
    title: 'Global Standing',
    description: 'India is among the world\'s top waste producers with rapid urbanization accelerating the problem.',
  },
  {
    icon: TrendingUp,
    title: '165% Projected Growth',
    description: 'Without intervention, municipal solid waste in India may increase by 165% by 2030.',
  },
  {
    icon: Bug,
    title: 'Inefficient Collection',
    description: 'Routes are not optimized, bins are emptied too late or too frequently, wasting time and fuel.',
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-destructive text-sm font-medium uppercase tracking-wider">
              The Challenge
            </span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            India's Growing
            <span className="text-destructive"> Waste Challenge</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            India generates roughly <span className="text-foreground font-semibold">1.5 lakh (150,000) tonnes</span> of 
            waste every day. Only about <span className="text-foreground font-semibold">30%</span> is processed properly.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="card-cyber group hover:border-destructive/40 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mb-6 group-hover:bg-destructive/20 group-hover:scale-110 transition-all duration-300">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-orbitron text-lg font-semibold mb-3 text-foreground">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Infographic bar */}
        <div className="mt-16 glass-panel p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-orbitron text-xl font-semibold mb-2">Daily Waste Generation</h3>
              <p className="text-muted-foreground">Visualizing India's waste processing efficiency</p>
            </div>
            <div className="flex-1 max-w-2xl w-full">
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-destructive to-warning rounded-full transition-all duration-1000"
                  style={{ width: '70%' }}
                />
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-success to-primary rounded-full transition-all duration-1000"
                  style={{ width: '30%' }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-medium">
                  <span className="text-foreground">30% Processed</span>
                  <span className="text-foreground/70">70% Unprocessed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
