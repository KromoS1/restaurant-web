import { IGuest } from './guest.interface';
import { ITable } from './table.interface';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SEATED = 'SEATED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export interface IReservation {
  id: string;
  guestId: string;
  tableId: string;
  guestCount: number;
  reservationDate: Date;
  duration: number;
  status: ReservationStatus;
  specialRequests?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReservationWithRelations extends IReservation {
  guest?: IGuest;
  table?: ITable;
}