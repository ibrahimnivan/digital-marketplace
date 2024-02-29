import { z } from "zod"
import { authRouter } from "./auth-router"
import { publicProcedure, router } from "./trpc"
import { QueryValidator } from "../lib/validators/query-validator"
import { getPayloadClient } from "../get-payload"
import { paymentRouter } from "./payment-router"

export const appRouter = router({ // custom type safe api endpoints
 auth: authRouter,

 payment: paymentRouter,

   
getInfiniteProducts: publicProcedure // infinite bcs we're going to do an infinite query to get more and more producs
   .input(
     z.object({
       limit: z.number().min(1).max(100),
       cursor: z.number().nullish(),
       query: QueryValidator,  // custom validator from lib
     })
   )
   .query(async ({ input }) => {
     const { query, cursor } = input
     const { sort, limit, ...queryOpts } = query // ...queryOpts = all the properties except sort and limit, bcs the difference in source

     const payload = await getPayloadClient()

     const parsedQueryOpts: Record<   // for parse ...queryOpts
       string,
       { equals: string }
     > = {}

     Object.entries(queryOpts).forEach(([key, value]) => {
       parsedQueryOpts[key] = { // we taking raw input and turning it into something that cms understand
         equals: value, 
       }
     })

     const page = cursor || 1  // 1 = default

     const {   // getting products from db
       docs: items,
       hasNextPage,
       nextPage,
     } = await payload.find({
       collection: 'products',
       where: {
         approvedForSale: {
           equals: 'approved',
         },
         ...parsedQueryOpts,
       },
       sort, // from query destructure
       depth: 1, // from query destructure
       limit, // from query destructure
       page,
     })

     return {
       items,
       nextPage: hasNextPage ? nextPage : null,
     }
   }),
  
}) 

export type AppRouter = typeof appRouter // the main feature of tRPC