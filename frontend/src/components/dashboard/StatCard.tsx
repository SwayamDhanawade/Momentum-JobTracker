import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );
}

export default StatCard;
