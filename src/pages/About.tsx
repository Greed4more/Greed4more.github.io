import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { 
  Heart, 
  Globe, 
  Target, 
  Users,
  BookOpen,
  TrendingDown,
  Fuel,
  Clock,
  Award,
  Linkedin,
  Mail
} from 'lucide-react';

const impactMetrics = [
  { icon: TrendingDown, value: '30%', label: 'Reduction', sublabel: 'in overflow complaints' },
  { icon: Fuel, value: '15%', label: 'Fuel Savings', sublabel: 'via optimized routing' },
  { icon: Clock, value: '2x', label: 'Faster', sublabel: 'collection response' },
  { icon: Award, value: '95%', label: 'Accuracy', sublabel: 'in waste classification' },
];

const teamMembers = [
  { name: 'Aditya Singh', role: 'Project Lead', avatar: '👨‍💼' },
  { name: 'Mainak Roy', role: 'Hardware Engineer', avatar: '👨‍🔧' },
  { name: 'Aniket Dutta', role: 'ML Engineer', avatar: '👨‍💻' },
  { name: 'Shaunak Sah', role: 'Website Developer', avatar: '👨‍💻' },
  { name: 'Ranisha Sarkar', role: 'Research Lead', avatar: '👩‍🔬' },
];

const references = [
  { title: 'IoT in Smart Cities', source: 'IEEE Research Paper', year: '2023' },
  { title: 'TSP/VRP for Route Optimization', source: 'Operations Research Journal', year: '2022' },
  { title: 'ML for Waste Classification', source: 'Environmental AI Studies', year: '2024' },
  { title: 'Swachh Bharat Mission', source: 'Government of India', year: '2014-2025' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - SmartBin Team & Impact</title>
        <meta 
          name="description" 
          content="Learn about the SmartBin team, our mission to revolutionize waste management in India, and the impact of our IoT + AI solution." 
        />
      </Helmet>
      <Layout>
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  Our Mission
                </span>
              </div>
              <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Building a <span className="text-gradient">Cleaner Future</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're on a mission to revolutionize waste management in India through 
                cutting-edge IoT and AI technology, aligned with Swachh Bharat and 
                Smart City initiatives.
              </p>
            </div>

            {/* Why it matters */}
            <div className="grid lg:grid-cols-3 gap-6 mb-20">
              <div className="card-cyber">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mb-6">
                    <Heart className="w-7 h-7 text-destructive" />
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold mb-3">Health Impact</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Untreated waste spreads disease, attracts pests, and creates hazardous 
                    conditions for communities. Our system ensures timely collection.
                  </p>
                </div>
              </div>
              <div className="card-cyber">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-success/10 border border-success/30 flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-success" />
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold mb-3">Environmental</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Improper disposal harms ecosystems and pollutes water sources. Smart 
                    sorting increases recycling rates and reduces landfill waste.
                  </p>
                </div>
              </div>
              <div className="card-cyber">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-warning" />
                  </div>
                  <h3 className="font-orbitron text-xl font-semibold mb-3">Economic</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Inefficient collection increases municipal costs. Our route optimization 
                    saves fuel, time, and manpower while improving service.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact metrics */}
            <div className="glass-panel p-8 mb-20">
              <h2 className="font-orbitron text-2xl font-bold text-center mb-8">
                Projected <span className="text-primary">Impact</span>
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {impactMetrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                      <metric.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="font-orbitron text-3xl font-bold text-primary mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-foreground">{metric.label}</div>
                    <div className="text-xs text-muted-foreground">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment areas */}
            <div className="mb-20">
              <h2 className="font-orbitron text-2xl font-bold text-center mb-8">
                Deployment <span className="text-primary">Areas</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {['Markets', 'Campuses', 'Malls', 'Railway Stations', 'Municipal Wards', 'Hospitals', 'Parks'].map((area, i) => (
                  <div key={i} className="px-6 py-3 glass-panel hover:border-primary/40 transition-colors">
                    <span className="font-medium text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mb-20">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="font-orbitron text-2xl font-bold">Our Team</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {teamMembers.map((member, i) => (
                  <div key={i} className="glass-panel p-4 text-center group hover:border-primary/40 transition-all duration-300">
                    <div className="text-5xl mb-3">{member.avatar}</div>
                    <div className="font-semibold text-sm text-foreground">{member.name}</div>
                    <div className="text-xs text-muted-foreground mb-3">{member.role}</div>
                    <div className="flex justify-center gap-2">
                      <a href="#" className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Linkedin size={14} />
                      </a>
                      <a href="#" className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Mail size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research & Sources */}
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="font-orbitron text-2xl font-bold">Research & Sources</h2>
              </div>
              <div className="space-y-4">
                {references.map((ref, i) => (
                  <div key={i} className="glass-panel p-4 flex items-center justify-between hover:border-primary/40 transition-colors">
                    <div>
                      <div className="font-medium text-foreground">{ref.title}</div>
                      <div className="text-sm text-muted-foreground">{ref.source}</div>
                    </div>
                    <span className="text-xs text-primary font-mono">{ref.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
