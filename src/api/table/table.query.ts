import { queryKeys } from '@/config/queryClient'
import { TABLES_ENDPOINTS } from '@/constants/endpoints'
import { ITableWithRelations } from '@/types/table.interface'
import { useQuery } from '@tanstack/react-query'
import { instance } from '../instance'

export const useTablesQuery = () => {
	return useQuery({
		queryKey: queryKeys.table.all,
		queryFn: async () => {
			const { data } = await instance.get<ITableWithRelations[]>(TABLES_ENDPOINTS.TABLES)
			return data
		},
	})
}

export const useTablesWithReservationsQuery = () => {
	return useQuery({
		queryKey: queryKeys.table.withReservations,
		queryFn: async () => {
			const { data } = await instance.get<ITableWithRelations[]>(TABLES_ENDPOINTS.TABLES_AVAILABLE)
			return data
		},
	})
}