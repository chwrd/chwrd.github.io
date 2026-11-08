import React from "react";

export interface HeaderStat {
  icon: string;
  value: string | number;
  label: string;
}

export interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  stats?: HeaderStat[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  stats,
  className = "",
  children,
}: PageHeaderProps) {
  return (
    <div className={`page-heading travel-heading ${className}`.trim()}>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description && (
        <p className="page-summary travel-summary">{description}</p>
      )}

      {stats && stats.length > 0 && (
        <div className="page-stats-bar travel-stats-bar">
          {stats.map((stat, idx) => (
            <div key={idx} className="page-stat-pill travel-stat-pill">
              <span className="page-stat-icon travel-stat-icon">{stat.icon}</span>
              <span className="page-stat-number travel-stat-number">{stat.value}</span>
              <span className="page-stat-label travel-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

export default PageHeader;

