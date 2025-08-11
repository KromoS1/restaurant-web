import { RestaurantLayout } from '@/components/containers/restaurantLayout/restaurantLayout';

export default function Home() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-800">Бронирование столиков</h1>
        <p className="text-gray-600 mt-2">Выберите столик для бронирования</p>
      </div>
      
      <div className="flex-1 min-h-0">
        <RestaurantLayout />
      </div>
    </div>
  );
}
