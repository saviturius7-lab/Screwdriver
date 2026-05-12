import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  key?: React.Key;
}

export function Card({ title, subtitle, headerAction, children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-bg-card border border-border-subtle rounded-md overflow-hidden transition-all", className)} {...props}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center">
          <div>
            {title && <h3 className="font-bold text-sm uppercase tracking-widest text-white">{title}</h3>}
            {subtitle && <p className="text-[10px] font-mono text-text-dim uppercase mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export function StatCard({ label, value, trend, trendType = 'up' }: { label: string, value: string, trend?: string, trendType?: 'up' | 'down' }) {
  return (
    <Card className="p-0">
      <div className="p-5">
        <p className="mono-label mb-1">{label}</p>
        <h4 className="text-4xl font-black tracking-tighter italic">{value}</h4>
        {trend && (
          <p className={cn("text-[10px] mt-2 font-mono uppercase font-bold", trendType === 'up' ? "text-emerald-400" : "text-rose-400")}>
            {trend} <span className="text-text-dim font-normal italic">/ MOM</span>
          </p>
        )}
      </div>
    </Card>
  );
}

