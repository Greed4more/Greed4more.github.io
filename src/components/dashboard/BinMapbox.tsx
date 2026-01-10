import React, { useState } from 'react';
import { Navigation } from 'lucide-react';

interface Bin {
  id: string;
  type: string;
  fill: number;
  location: string;
  lastUpdate: string;
  lat: number;
  lng: number;
}

interface BinMapboxProps {
  bins: Bin[];
  selectedBin: string | null;
  onSelectBin: (binId: string) => void;
  isOptimizing: boolean;
}

const BinMapbox: React.FC<BinMapboxProps> = ({ bins, selectedBin, onSelectBin, isOptimizing }) => {
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const getStatusColor = (fill: number) => {
    if (fill >= 85) return 'bg-destructive';
    if (fill >= 50) return 'bg-warning';
    return 'bg-success';
  };

  // Calculate marker positions relative to the map view
  // Map bounds approximately: lat 19.065-19.095, lng 72.865-72.895
  const getMarkerPosition = (lat: number, lng: number) => {
    const minLat = 19.065, maxLat = 19.095;
    const minLng = 72.865, maxLng = 72.905;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    
    return { 
      left: `${Math.max(5, Math.min(95, x))}%`, 
      top: `${Math.max(5, Math.min(95, y))}%` 
    };
  };

  // OpenStreetMap embed URL centered on Mumbai
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=72.865%2C19.065%2C72.905%2C19.095&layer=mapnik&marker=19.076%2C72.8777`;

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden border border-border">
      {/* OpenStreetMap iframe */}
      <iframe
        title="Bin Locations Map"
        src={mapUrl}
        className="absolute inset-0 w-full h-full"
        style={{ border: 0, filter: 'hue-rotate(180deg) invert(90%) contrast(90%)' }}
      />
      
      {/* Dark overlay for better marker visibility */}
      <div className="absolute inset-0 bg-background/30 pointer-events-none" />

      {/* Bin markers overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {bins.map((bin) => {
          const pos = getMarkerPosition(bin.lat, bin.lng);
          const isSelected = selectedBin === bin.id;
          const isHovered = hoveredBin === bin.id;
          
          return (
            <div
              key={bin.id}
              className="absolute pointer-events-auto"
              style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
            >
              <div 
                className="relative cursor-pointer"
                onClick={() => onSelectBin(bin.id)}
                onMouseEnter={() => setHoveredBin(bin.id)}
                onMouseLeave={() => setHoveredBin(null)}
              >
                {/* Marker */}
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${getStatusColor(bin.fill)} 
                    border-2 border-white shadow-lg
                    transition-transform duration-200
                    ${isSelected || isHovered ? 'scale-125 z-20' : 'z-10'}
                  `}
                >
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                
                {/* Pulse animation for critical bins */}
                {bin.fill >= 85 && (
                  <div className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-40" />
                )}
                
                {/* Tooltip */}
                {(isHovered || isSelected) && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30">
                    <div className="glass-panel px-3 py-2 text-xs whitespace-nowrap">
                      <div className="font-mono font-bold text-foreground">{bin.id}</div>
                      <div className="text-muted-foreground">{bin.location}</div>
                      <div className={`font-semibold mt-1 ${
                        bin.fill >= 85 ? 'text-destructive' : 
                        bin.fill >= 50 ? 'text-warning' : 'text-success'
                      }`}>
                        {bin.fill}% Full
                      </div>
                      <div className="text-muted-foreground text-[10px] mt-1">{bin.lastUpdate}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Route line connecting high-fill bins */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          {bins
            .filter(b => b.fill >= 50)
            .sort((a, b) => b.fill - a.fill)
            .map((bin, i, arr) => {
              if (i === arr.length - 1) return null;
              const from = getMarkerPosition(bin.lat, bin.lng);
              const to = getMarkerPosition(arr[i + 1].lat, arr[i + 1].lng);
              return (
                <line
                  key={`route-${bin.id}`}
                  x1={from.left}
                  y1={from.top}
                  x2={to.left}
                  y2={to.top}
                  stroke="url(#routeGradient)"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              );
            })}
        </svg>
      </div>

      {/* Optimizing overlay */}
      {isOptimizing && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 z-40">
          <div className="text-primary font-orbitron text-lg animate-pulse">
            Calculating optimal route...
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-30 glass-panel px-3 py-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-destructive"></span> Full
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-warning"></span> Half
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-success"></span> Empty
          </span>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 right-4 z-30 text-[10px] text-muted-foreground bg-background/50 px-2 py-1 rounded">
        © OpenStreetMap
      </div>
    </div>
  );
};

export default BinMapbox;
