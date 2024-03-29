import dotenv from 'dotenv'
import path from 'path'
import type { InitOptions } from 'payload/config'
import payload, { Payload } from 'payload'
import nodemailer from 'nodemailer'


dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

// define our transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: "nathanrosxhild@gmail.com",
    pass: "uzgo iqqm llgr zyzp"
  }
})

let cached = (global as any).payload

if(!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({initOptions}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECREAT is Missing')
  }

  if (cached.client) {
    return cached.client
  }
  
  if (!cached.promise) {
    cached.promise = payload.init({ // init for initialization
      email: {
        transport: transporter,
        fromAddress: "nathanrosxhild@gmail.com", // we can use our email
        fromName: "DigitalHippo"
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}



