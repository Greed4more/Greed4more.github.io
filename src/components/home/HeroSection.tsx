import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Cpu, MapPin, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollReveal from "@/hooks/useScrollReveal";

function HeroSection() {
  // initialize scroll reveal globally for elements marked with data-reveal
  useScrollReveal();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Parallax / decorative blobs */}
      <div className="absolute inset-0 gradient-subtle" />
      <div className="parallax-layer hero-blob float-slow absolute top-12 right-6 w-[520px] h-[520px] rounded-full bg-primary/10 -z-10" />
      <div className="parallax-layer hero-blob float-slow absolute bottom-6 left-8 w-[360px] h-[360px] rounded-full bg-success/8 -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div data-reveal className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Cpu className="w-4 h-4" />
              AI + IoT Powered Solution
            </div>

            <h1 data-reveal className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Smart Waste
              <span className="block text-gradient">Management System</span>
            </h1>

            <p data-reveal className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Revolutionizing waste collection with intelligent bins that sort automatically, monitor fill levels, and optimize collection routes — for cleaner cities and a greener future.
            </p>

            <div data-reveal className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>

            {/* Quick Stats (reveal individually) */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[{ value: "30%", label: "Cost Reduction" }, { value: "24/7", label: "Monitoring" }, { value: "95%", label: "Sort Accuracy" }].map((stat, i) => (
                <div key={stat.label} data-reveal className="text-center md:text-left">
                  <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border" data-reveal>
              {/* Smart Bin Visualization */}
              <div className="aspect-square relative">
                {/* Central Bin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-64 bg-gradient-to-b from-primary/20 to-primary/5 rounded-2xl border-2 border-primary/30 relative overflow-hidden">
                    {/* Fill Level Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 bg-success/30 h-[45%] transition-all duration-1000" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Recycle className="w-16 h-16 text-primary animate-pulse-slow" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 left-4 bg-card rounded-xl p-3 shadow-lg border border-border float-slow" data-reveal>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium">45% Full</span>
                  </div>
                </div>

                <div className="absolute top-8 right-4 bg-card rounded-xl p-3 shadow-lg border border-border float-slow" style={{ animationDelay: "1s" }} data-reveal>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">GPS Active</span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-card rounded-xl p-3 shadow-lg border border-border float-slow" style={{ animationDelay: "2s" }} data-reveal>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">AI Sorting</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-8 bg-card rounded-xl p-3 shadow-lg border border-border float-slow" style={{ animationDelay: "3s" }} data-reveal>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Live Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
