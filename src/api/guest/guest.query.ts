import { queryKeys } from '@/config/queryClient'
import { GUESTS_ENDPOINTS } from '@/constants/endpoints'
import { IGuest } from '@/types/guest.interface'
import { useQuery } from '@tanstack/react-query'
import { instance } from '../instance'

export const useGuestsQuery = () => {
	return useQuery({
		queryKey: queryKeys.guest.all,
		queryFn: async () => {
			const { data } = await instance.get<IGuest[]>(GUESTS_ENDPOINTS.GUESTS)
			return data
		},
	})
}