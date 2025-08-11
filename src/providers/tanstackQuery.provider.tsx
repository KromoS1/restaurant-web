'use client'

import { queryClient } from "@/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

export const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
};