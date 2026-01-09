import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { 
  Recycle, 
  Camera, 
  Gauge, 
  MapPin, 
  Route, 
  Wifi,
  MessageSquare,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Recycle,
    title: 'Auto Waste Sorting',
    description: 'Sorts dry, wet, and metal automatically using sensors + motorized diverter.',
    benefit: 'Reduced manual segregation, higher recycling yield.',
    details: [
      'Multi-sensor detection system',
      'Motorized plate for waste routing',
      'Separate compartments per type',
      'Real-time sorting feedback'
    ],
  },
  {
    icon: Camera,
    title: 'AI Camera Classification',
    description: 'Visual classifier identifies ambiguous items and improves sorting decisions over time.',
    benefit: 'Reduces mis-sorting and improves training data.',
    details: [
      'TensorFlow/PyTorch ML models',
      'Edge or cloud inference',
      'Confidence scoring',
      'Continuous learning pipeline'
    ],
  },
  {
    icon: Gauge,
    title: 'Real-Time Fill Level Monitoring',
    description: 'Shows exact fill % per compartment; threshold alerts prevent overflow.',
    benefit: 'Timely collection, fewer complaints.',
    details: [
      'Ultrasonic sensor accuracy',
      'Configurable thresholds',
      'Instant overflow alerts',
      'Historical fill data'
    ],
  },
  {
    icon: MapPin,
    title: 'Smart GPS Tracking',
    description: 'Live location per bin, historical movement logs, geofence alerts.',
    benefit: 'Prevents theft and misplaced bins.',
    details: [
      'Real-time location updates',
      'Movement history logs',
      'Geofence boundary alerts',
      'Anti-theft protection'
    ],
  },
  {
    icon: Route,
    title: 'Route Optimization System',
    description: 'Selects full bins and computes shortest efficient path for collection teams.',
    benefit: 'Save fuel, time and manpower.',
    details: [
      'TSP/VRP algorithms',
      'Priority-based selection',
      'ETA calculations',
      'Multi-vehicle support'
    ],
  },
  {
    icon: Wifi,
    title: 'IoT Powered Bin Status',
    description: 'ESP32 + Cloud for telemetry; dashboard for live readings and historical graphs.',
    benefit: 'Infrastructure telemetry and remote alerts.',
    details: [
      'MQTT/HTTPS protocols',
      'Low-power operation',
      'WebSocket real-time sync',
      'Battery monitoring'
    ],
  },
  {
    icon: MessageSquare,
    title: 'Citizen Feedback Portal',
    description: 'Simple form / mobile web to report broken bins or overflow.',
    benefit: 'Community-driven maintenance.',
    details: [
      'Easy report submission',
      'Photo upload support',
      'Status tracking',
      'Admin moderation'
    ],
  },
];

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features - SmartBin Smart Waste Management</title>
        <meta 
          name="description" 
          content="Explore SmartBin's features: auto sorting, AI classification, fill monitoring, GPS tracking, and route optimization for smart waste management." 
        />
      </Helmet>
      <Layout>
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                  Capabilities
                </span>
              </div>
              <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Powerful <span className="text-gradient">Features</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our system provides automation, real-time monitoring, analytics, 
                and route optimization — everything you need for smart waste management.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-cyber group hover:border-primary/40 transition-all duration-500"
                >
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-orbitron text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Benefit */}
                    <div className="bg-success/10 border border-success/30 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-success text-sm">{feature.benefit}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison section */}
            <div className="mt-24">
              <h2 className="font-orbitron text-3xl font-bold text-center mb-12">
                Traditional vs <span className="text-primary">Smart Bins</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Traditional */}
                <div className="glass-panel p-8 border-destructive/30">
                  <h3 className="font-orbitron text-xl font-semibold text-destructive mb-6">Traditional Bins</h3>
                  <ul className="space-y-4">
                    {[
                      'Manual waste segregation',
                      'No fill level visibility',
                      'Fixed collection schedules',
                      'No location tracking',
                      'Reactive maintenance',
                      'Inefficient routes',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-destructive" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Smart */}
                <div className="glass-panel p-8 border-primary/30">
                  <h3 className="font-orbitron text-xl font-semibold text-primary mb-6">SmartBin System</h3>
                  <ul className="space-y-4">
                    {[
                      'Automatic waste sorting',
                      'Real-time fill monitoring',
                      'Dynamic collection triggers',
                      'GPS location tracking',
                      'Predictive maintenance',
                      'Optimized collection routes',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Features;
