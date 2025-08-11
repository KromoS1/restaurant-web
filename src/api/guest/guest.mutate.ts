import { queryKeys } from '@/config/queryClient'
import { GUESTS_ENDPOINTS } from '@/constants/endpoints'
import { IError } from '@/types/error.interface'
import { ICreateGuest, IGuest } from '@/types/guest.interface'
import { toastError } from '@/utils/toast.error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { instance } from '../instance'

export const useCreateGuestMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: ICreateGuest) => {
      const { data: response } = await instance.post<IGuest>(GUESTS_ENDPOINTS.GUESTS, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.guest.all })
    },
    onError: (error: AxiosError<IError>) => {
      toastError(error.response?.data)
    },
  })
}

export const useUpdateGuestMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ICreateGuest> }) => {
      const { data: response } = await instance.patch<IGuest>(GUESTS_ENDPOINTS.GUESTS_ID(id), data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.guest.all })
    },
    onError: (error: AxiosError<IError>) => {
      toastError(error.response?.data)
    },
  })
}
