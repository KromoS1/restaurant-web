import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 10,
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 2,
			retryDelay: 1000
		}
	},
});

export const queryKeys = {
	table: {
		all: ['tables'] as const,
	},
	guest: {
		all: ['guests'] as const,
	},
	reservation: {
		all: ['reservations', 'tables'] as const,
		byId: (id: string) => ['reservations', id] as const,
	}
}