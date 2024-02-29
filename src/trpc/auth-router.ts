import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";


export const authRouter = router({


  // publicProsedur: anyone can call this api (no need for login)
  createPayloadUser: publicProcedure.input(AuthCredentialsValidator).mutation( async ({input}) => {
    const { email, password } = input
    const payload = await getPayloadClient()

    // check if user already exist
    const {docs: users} = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email
        }
      }
    })

    if (users.length !== 0) // it shoundnt foundn a user bcs we're trying to sign up new user
    throw new TRPCError({ code: 'CONFLICT' })

    // to create a new user
    await payload.create({
      collection: 'users', // collection is database table
      data: {
        email,
        password,
        role: 'user',

      },
    })

    return { success: true, sentToEmail: email} // bikin user sekaligus kirim email
  }),

  

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()

      const isVerified = await payload.verifyEmail({ // veryfyEmail method from CMS
        collection: 'users',
        token,
      })

      if (!isVerified)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  
    signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx   // res from express context

      const payload = await getPayloadClient()

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})