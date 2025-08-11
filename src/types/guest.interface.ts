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

export interface ICreateGuest extends Omit<IGuest, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IGuestWithRelations extends IGuest {
  reservations?: IReservation[];
}