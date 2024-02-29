import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './'

export const trpc = createTRPCReact<AppRouter>({}) // AppRouter generic contain the entirety our backend