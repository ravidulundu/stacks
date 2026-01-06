
export enum TechCategory {
  RUNTIME = 'Runtime',
  FRAMEWORK = 'Framework',
  DATABASE = 'Database',
  API = 'API Layer',
  FRONTEND = 'Frontend'
}

export interface TechItem {
  name: string;
  category: TechCategory;
  description: string;
  benefits: string[];
  icon: string;
}

export interface MetricPoint {
  time: string;
  latency: number;
  throughput: number;
}
