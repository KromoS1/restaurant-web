import { queryKeys } from '@/config/queryClient'
import { RESERVATIONS_ENDPOINTS } from '@/constants/endpoints'
import { IReservation } from '@/types/reservation.interface'
import { useQuery } from '@tanstack/react-query'
import { instance } from '../instance'

export const useReservationQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.reservation.byId(id),
    queryFn: async () => {
      const { data } = await instance.get<IReservation>(RESERVATIONS_ENDPOINTS.RESERVATIONS_ID(id))
      return data
    },
    enabled: !!id,
  })
}


