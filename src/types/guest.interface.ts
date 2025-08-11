import { IReservation } from './reservation.interface';

export interface IGuest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateGuest {
  name: string
  phone: string
  email?: string
  notes?: string
}

export interface IGuestWithRelations extends IGuest {
  reservations?: IReservation[];
}