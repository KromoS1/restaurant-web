import { IAnalytics } from './analytics.interface';
import { IReservation } from './reservation.interface';
import { IWalkInGuest } from './walkIn.interface';

export enum TableType {
  REGULAR = 'REGULAR',   
  VIP = 'VIP',           
  FAMILY = 'FAMILY',     
}

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',   
  OCCUPIED = 'OCCUPIED',     
  RESERVED = 'RESERVED',     
  MAINTENANCE = 'MAINTENANCE',
}

export interface ITable {
  id: string;
  number: number;
  minSeats: number;
  maxSeats: number;
  type: TableType;
  status: TableStatus;
  location?: string;
  description?: string;
  
  positionX?: number;
  positionY?: number;
  shape?: 'circle' | 'rect' | 'ellipse';
  width?: number;
  height?: number;
  radius?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTable extends Omit<ITable, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ITableWithRelations extends ITable {
  reservations?: IReservation[];
  analytics?: IAnalytics[];
  walkInGuests?: IWalkInGuest[]
}