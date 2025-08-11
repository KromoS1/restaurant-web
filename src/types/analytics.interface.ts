import { ITable } from './table.interface';

export interface IAnalytics {
  id: string;
  tableId?: string;
  date: Date;
  totalGuests: number;
  totalRevenue?: number;
  peakHourStart?: number;
  peakHourEnd?: number;
  avgDuration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnalyticsWithRelations extends IAnalytics {
  table?: ITable;
}