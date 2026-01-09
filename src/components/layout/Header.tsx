import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/features', label: 'Features' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/rewards', label: 'Rewards' },
  { path: '/about', label: 'About' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-primary/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-lg text-foreground tracking-wider">
                SMART<span className="text-primary">BIN</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                IoT + AI Waste System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-rajdhani font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/dashboard" className="btn-cyber text-sm">
              View Dashboard
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-primary/20 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <div className="container py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 font-rajdhani font-medium text-base uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/dashboard" className="btn-cyber text-sm text-center mt-4">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
