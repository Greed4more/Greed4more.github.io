import { ReactNode } from 'react';

interface HUDElementProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const HUDElement = ({ children, className = '', variant = 'primary' }: HUDElementProps) => {
  const variantStyles = {
    primary: 'border-primary/30 before:bg-primary/20 after:border-primary/40',
    secondary: 'border-secondary/30 before:bg-secondary/20 after:border-secondary/40',
    accent: 'border-accent/30 before:bg-accent/20 after:border-accent/40',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Corner decorations */}
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${variantStyles[variant].split(' ')[2]}`} />
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${variantStyles[variant].split(' ')[2]}`} />
      <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${variantStyles[variant].split(' ')[2]}`} />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${variantStyles[variant].split(' ')[2]}`} />
      
      {/* Content */}
      <div className={`glass-panel ${variantStyles[variant]}`}>
        {children}
      </div>
    </div>
  );
};

export default HUDElement;
