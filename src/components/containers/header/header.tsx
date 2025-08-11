import { Routes } from '@/constants/routes';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="flex items-center fixed top-0 left-0 right-0 h-16 z-50 bg-amber-200 shadow-md navbar px-[100px]">
      <Link className="btn btn-ghost text-xl" href={Routes.RESERVATIONS}>Бронированиe</Link>
      <Link className="btn btn-ghost text-xl" href={Routes.TABLES}>Столики</Link>
      <Link className="btn btn-ghost text-xl" href={Routes.GUESTS}>Гости</Link>
    </div>
  );
};