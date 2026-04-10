import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
}

export function Badge({ children, color }: BadgeProps) {
  return (
    <span className="badge" style={{ backgroundColor: color }}>
      {children}
    </span>
  );
}

export default Badge;
