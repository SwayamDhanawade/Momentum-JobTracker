import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface CardPartProps {
  children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardPartProps) {
  return <div className="card-header">{children}</div>;
}

export function CardBody({ children }: CardPartProps) {
  return <div className="card-body">{children}</div>;
}

export default Card;
