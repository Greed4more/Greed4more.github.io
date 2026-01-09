import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { 
  Droplets, 
  Magnet, 
  Eye, 
  Camera, 
  Cpu, 
  Radio, 
  MapPin,
  ArrowDown,
  Gauge,
  RotateCcw
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Waste Sorting System',
    subtitle: 'Multi-sensor automated classification',
    description: 'Our intelligent sorting mechanism uses multiple sensors working in harmony to classify waste accurately.',
    icon: RotateCcw,
    color: 'primary',
    features: [
      { icon: Droplets, label: 'Moisture Sensor', desc: 'Detects wet waste' },
      { icon: Magnet, label: 'Metal Sensor', desc: 'Identifies metallic objects' },
      { icon: Eye, label: 'Proximity Sensor', desc: 'Detects object presence' },
      { icon: Camera, label: 'AI Camera', desc: 'Complex item identification' },
    ],
    flow: 'Sensor Input → Classification → Motor Action → Compartment',
  },
  {
    id: 2,
    title: 'Fill-Level Monitoring',
    subtitle: 'Real-time capacity tracking',
    description: 'Ultrasonic sensors continuously measure fill percentage, triggering alerts before overflow occurs.',
    icon: Gauge,
    color: 'accent',
    features: [
      { icon: Radio, label: 'Ultrasonic Sensor', desc: 'Measures fill %' },
      { icon: Cpu, label: 'ESP32 Module', desc: 'Sends telemetry to cloud' },
    ],
    flow: 'Sensor Reading → ESP32 → Cloud → Dashboard Alert',
    thresholds: [
      { level: '< 50%', status: 'Empty', color: 'success' },
      { level: '50-85%', status: 'Half', color: 'warning' },
      { level: '> 85%', status: 'Full', color: 'destructive' },
    ],
  },
  {
    id: 3,
    title: 'GPS Bin Tracking',
    subtitle: 'Live location monitoring',
    description: 'Compact GPS trackers send periodic location updates, preventing theft and tracking displacement.',
    icon: MapPin,
    color: 'secondary',
    features: [
      { icon: MapPin, label: 'GPS Module', desc: 'Sends location periodically' },
      { icon: Radio, label: 'Cloud Sync', desc: 'Real-time map updates' },
    ],
    flow: 'GPS Signal → Cloud → Map Visualization → Movement Alerts',
  },
  {
    id: 4,
    title: 'AI-Powered Detection',
    subtitle: 'Visual waste classification',
    description: 'Camera captures images sent to ML model for classification, detecting anomalies like liquid in bottles.',
    icon: Camera,
    color: 'neon-green',
    features: [
      { icon: Camera, label: 'Camera Capture', desc: 'Image acquisition' },
      { icon: Cpu, label: 'ML Model', desc: 'Edge or cloud inference' },
    ],
    flow: 'Image Capture → ML Classification → Label with Confidence → Action',
    classifications: ['Plastic', 'Metal', 'Wet', 'Organic', 'Mixed'],
  },
];

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How It Works - SmartBin IoT Waste System</title>
        <meta 
          name="description" 
          content="Learn how SmartBin's IoT sensors, AI classification, and cloud connectivity work together for intelligent waste management." 
        />
      </Helmet>
      <Layout>
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium uppercase tracking-wider">
                  System Architecture
                </span>
              </div>
              <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                How Our <span className="text-gradient">System Works</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our system blends sensors, microcontrollers, cameras, cloud intelligence, 
                and logistics optimization into one seamless solution.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-24">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full h-24 flex flex-col items-center">
                      <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
                      <ArrowDown className="w-6 h-6 text-primary/50" />
                    </div>
                  )}

                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                            Step {step.id}
                          </div>
                          <h2 className="font-orbitron text-2xl font-bold text-foreground">
                            {step.title}
                          </h2>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Features grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {step.features.map((feature, i) => (
                          <div key={i} className="glass-panel p-4 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-foreground">{feature.label}</div>
                              <div className="text-xs text-muted-foreground">{feature.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Flow indicator */}
                      <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Data Flow</div>
                        <div className="font-mono text-sm text-primary">{step.flow}</div>
                      </div>
                    </div>

                    {/* Visual */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="glass-panel p-8 relative overflow-hidden">
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                        
                        {/* HUD decoration */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-xs text-primary font-mono">ACTIVE</span>
                        </div>

                        {/* Center icon */}
                        <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
                          <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-6 animate-pulse-glow">
                            <step.icon className="w-16 h-16 text-primary" />
                          </div>
                          <h3 className="font-orbitron text-xl font-bold text-center text-foreground">
                            {step.subtitle}
                          </h3>
                          
                          {/* Thresholds for fill level */}
                          {step.thresholds && (
                            <div className="mt-6 flex gap-4">
                              {step.thresholds.map((t, i) => (
                                <div key={i} className={`px-3 py-1 rounded-full text-xs font-medium border status-${t.color === 'success' ? 'empty' : t.color === 'warning' ? 'half' : 'full'}`}>
                                  {t.level} - {t.status}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Classifications */}
                          {step.classifications && (
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                              {step.classifications.map((c, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary">
                                  {c}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HowItWorks;
