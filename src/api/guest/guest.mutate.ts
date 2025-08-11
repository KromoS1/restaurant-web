import { queryKeys } from '@/config/queryClient'
import { GUESTS_ENDPOINTS } from '@/constants/endpoints'
import { ICreateGuest, IGuest } from '@/types/guest.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  })
}

export const useDeleteGuestMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (guestId: string) => {
      await instance.delete(GUESTS_ENDPOINTS.GUESTS_ID(guestId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.guest.all })
    },
  })
}
