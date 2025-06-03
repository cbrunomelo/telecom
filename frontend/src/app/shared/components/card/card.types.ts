export interface CardData {
  title: string;
  value: number;
  icon?: string;
  trend?: number;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
} 