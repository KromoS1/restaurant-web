import { PAGES } from '@/constants/pages';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="flex items-center fixed top-0 left-0 right-0 h-16 z-50 bg-amber-200 shadow-md navbar px-[100px]">
      <Link className="btn btn-ghost text-xl" href={PAGES.HOME}>Бронированиe</Link>
      <Link className="btn btn-ghost text-xl" href={PAGES.TABLES}>Столики</Link>
      <Link className="btn btn-ghost text-xl" href={PAGES.GUESTS}>Гости</Link>
    </div>
  );
};