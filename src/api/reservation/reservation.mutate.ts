import { queryKeys } from '@/config/queryClient'
import { RESERVATIONS_ENDPOINTS } from '@/constants/endpoints'
import { IError } from '@/types/error.interface'
import { ICreateReservation, IReservation } from '@/types/reservation.interface'
import { toastError } from '@/utils/toast.error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { instance } from '../instance'

export const useCreateReservationMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: ICreateReservation) => {
      const { data: response } = await instance.post<IReservation>(RESERVATIONS_ENDPOINTS.RESERVATIONS, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservation.all })
    },
    onError: (error: AxiosError<IError>) => {
      toastError(error.response?.data)
    },
  })
}
