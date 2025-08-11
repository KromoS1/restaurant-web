import { ITable, TableType } from './table.interface';

export enum WalkInStatus {
  WAITING = 'WAITING',
  SEATED = 'SEATED',
  LEFT = 'LEFT',
}

export interface IWalkInGuest {
  id: string;
  guestCount: number;
  guestName?: string;
  phone?: string;
  tableId?: string;
  status: WalkInStatus;
  estimatedWait?: number;
  seatedAt?: Date;
  leftAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWalkInGuestWithRelations extends IWalkInGuest {
  table?: ITable;
  waitingQueue?: IWaitingQueue[];
}

export interface IWaitingQueue {
  id: string;
  walkInId: string;
  guestCount: number;
  preferredTableType?: TableType;
  estimatedWait?: number;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWaitingQueueWithRelations extends IWaitingQueue {
  walkInGuest?: IWalkInGuest;
}