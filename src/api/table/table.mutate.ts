import { queryKeys } from '@/config/queryClient'
import { TABLES_ENDPOINTS } from '@/constants/endpoints'
import { IError } from '@/types/error.interface'
import { ICreateTable, ITable, TableStatus } from '@/types/table.interface'
import { toastError } from '@/utils/toast.error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { instance } from '../instance'

export const useCreateTableMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (table: ICreateTable) => {
			return await instance.post(TABLES_ENDPOINTS.TABLES, table)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.table.all })
		},
		onError: (error: AxiosError<IError>) => {
			toastError(error.response?.data)
		},
	})
}

export const useUpdateTableMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: Partial<ICreateTable> }) => {
			const { data: response } = await instance.patch<ITable>(TABLES_ENDPOINTS.TABLES_ID(id), data)
			return response
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.table.all })
		},
		onError: (error: AxiosError<IError>) => {
			toastError(error.response?.data)
		},
	})
}

export const useUpdateTablePositionMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, positionX, positionY }: { id: string; positionX: number; positionY: number }) => {
			const { data: response } = await instance.patch<ITable>(TABLES_ENDPOINTS.TABLES_ID(id), {
				positionX,
				positionY
			})
			return response
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.table.all })
		},
		onError: (error: AxiosError<IError>) => {
			console.error('Ошибка при обновлении позиции столика:', error)
		},
	})
}

export const useDeleteTableMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (tableId: string) => {
			return await instance.delete(TABLES_ENDPOINTS.TABLES_ID(tableId))
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.table.all })
		},
		onError: (error) => {
			console.error('Error deleting table:', error)
		},
	})
}

export const useMaintenanceTableMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({tableId, status}:{tableId: string, status: TableStatus.AVAILABLE | TableStatus.MAINTENANCE}) => {
			return await instance.patch(TABLES_ENDPOINTS.TABLES_MAINTENANCE(tableId), {status})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.table.all })
		},
		onError: (error) => {
			console.error('Error updating table maintenance status:', error)
		},
	})
}