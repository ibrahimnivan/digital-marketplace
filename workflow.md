## WORKFLOW

## 1. GETTING STARTED EITH NEXJS

- `npx create-next-app@latest digitalhippo` (nextjs 14)

### Good to Know - configure shortcut 
File > Preferences > Keyboard Shortcut > Emmet Balance (outward) => CTRL + M

## 2. GETTING STARTED WITH SHADCN UI-LIBRARY

- it's __fully customizable with tailwindcss__
- `npx shadcn-ui@latest init` then choose : 
                      style: Default
                      color: Slate
                      configure global css file : src/global.css
                      use CSS Variable : yes
                      location of tailwind.config.js :
                      alias for component : Yes
                      alias for utils : Yes
                      React Server Component : Yes
                      Configuration to components.json : Yes

    result : 
        components.json file and 
        added more configuration to tailwind.config.ts
        new file global.css (remove global.css from tailwind)

## 3. cn() HELPER FUNCTION FOR ADD MULTIPLE className DINAMICALLY

-- ` className={cn("relative h-full font-sans antialiased", inter.className)}`

### Good to Know - Antialised
-- antialiased - Smooth the font on the level of the pixel, as opposed to the subpixel.

## 4. INSIDE layout.tsx

- ` <main className='relative flex flex-col min-h-screen'>` => to make sure we always takes the full page (never looks weird : <Footer /> always in the bottom)
- `<div className='flex-grow flex-1'>{children}</div>` => to make sure the children fill up as much content as they possibly can if we add Navbar and Footer

## 5. CREATE NEW COMPONENT MaxWidthWrapper.tsx (to make sure that the entire layout looks good)

- INSIDE THE FILE :
```tsx
    const MaxWidthWrapper = ({
      className,
      children,
    }: {
      className?: string;
      children: ReactNode;
    }) = {
      return (
        <div
          className={cn(
            "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
            className // for override the default 
          )}
        >
          {children}
        </div>
      );
    };
```
- `<MaxWidthWrapper className="w-4"></MaxWidthWrapper>` => we can use className to override default tailwindcss

## 6. WE CAN CHOOSE DEFAULT COLOR THEME OF BLUE, RED, SLATE ETC FROM SHADCN WEBSITE AND PASTED IN global.css

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```
## --------------------------------------LANDING PAGE----------------------------------------------------

## 7. app > page.tsx

-- p className='mt-6 text-lg max-w-prose `text-muted-foreground`'> => style from shadcn-ui

7. 2. COMPONENT AND ITS COLOR VARIANTS FROM SHADCN `npx shadcn-ui add button` 

-- RESULT :
        - Button.tsx in components > ui >

-- TO USE IT : with `Method` inside className using default color 
`<Link href='/products' className={buttonVariants() }>Browse Trending /Link>`

-- TO USE IT : use `component tag` with ghost color variants
` <Button variant='ghost'>Our quality primise &rarr;</Button>`

7. 3. USING ICON FROM LUCIDE ICON LIBRARY

- `npm i lucide-react`

7. 4. THE WAY WE USE ICON IN PERKS

```tsx
    const perks = [
      {
        name: "Instant Delivery",
        icon: ArrowDownToLine,
        description:
          "Get your assets delivered to your email in seconds and downdload them right away.",
      },
      {
        name: "Guaranteed Quality",
        icon: CheckCircle,
        description:
          "Every assets dilivered is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
      },
      {
        name: "For the Planet",
        icon: Leaf,
        description:
          "We've pledged 1% of sales to the preservation and restoration of the natural environment",
      },
    ]


  <MaxWidthWrapper>
    {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
              >
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.icon className='w-1/3 h-1/3' />}
                  </div>
                </div>
                <div className="">
                  <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
            ))}
  </MaxWidthWrapper>
```
--------------------------------------LANDING PAGE----------------------------------------------------
## --------------------------------------DYNAMIC NAVBAR--------------------------------------------------
## 1. CREATE components > Navbar.tsx

INSIDE Navbar.tsx :
  - rendering logo
  - rendering NavItems
  - SIGN IN LINK (if we dont have user)
  - rendering Shopping cart 

## 2. CREATE components > Icons.tsx : hippo logo

2. 1. INSIDE Icons.tsx IS AN OBJECT WITH METHOD logo()
```tsx
        import { LucideProps } from "lucide-react";

        export const Icons = {
          logo: (props: LucideProps) => (
            <svg {...props} viewBox='0 0 512 512'>
            
              {/* svg content */}

          </svg>
          )
        }
```

 2. 2. TO USE LOGO INSIDE Navbar.tsx
```tsx
          <Link href='/'>
              <Icons.logo className='h-10 w-10' />
          </Link>
```

3. IMPORT TO LAYOUT APP

4. CREATE componets > NavItems.tsx AS CLIENT COMPONENT
- we map product category (array of two object) to NavItem component

5. CREATE config > index.tsx FOR CATEGORIES CONSTANT
-- it has array two object

6. CREATE components > NavItem.tsx
- we map category.featured : image, linked featured.name

7. HOW NavItems and NavItem WORKS :
    1. activeIndex state is null
    2. change activeIndex into index with handleOpen()
    ```js
    const handleOpen = () => { 
        if(activeIndex === i) { 
          setActiveIndex(null)
        } else {
          setActiveIndex(i)
        }
      }
    ```
    3. const isOpen = i === activeIndex (true)
    4. if isOpen = true then Conditional render in NavItem is rendered

### Good to Know : CONDITIONALY ROTATED STATE
```tsx
  className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
```

### Good to Know : CONDITIONALY APPLIED STYLE
```tsx
   className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            { "animate-in fade-in slide-in-from-top-5": !isAnyOpen }
          )}
```

### Good to Know : REMOVE IRRELEVANT COMPONENT TO SCREEN READER (ACCESSIBILITY)
-- aria-hidden = true
```tsx
  <div className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden ='true'
          />
```

## 8. ADD INTERACTIVITY WITH CUSTOM HOOKS : CLICK OUTSIDE OF COMPONENT TO CLOSE NavItem 
-- How it works :
1. passing ref to custom hooks
2. listen to 'touchStart' and 'mouseDown'
3. if the event is happend outside target then handler is run
4. assign to NavItems component ref={navRef}>

 ```tsx
    // in NavItems.tsx
      const navRef = useRef<HTMLDivElement | null>(null)

      useOnClickOutside(navRef, () => setActiveIndex(null)) // null if we click outside navitems

      `return <div className="flex gap-4 h-full" ref={navRef}>`


      // in Custom Hooks
    import { RefObject, useEffect } from "react";

    type Event = MouseEvent | TouchEvent;

    export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
      ref: RefObject<T>, // 1. passing ref from NavItems
      handler: (event: Event) => void 
    ) => {
      useEffect(() => {
        // 3. if the element that we click isnt in the target then handler will be called in NavItems
        const listener = (event: Event) => {
          const el = ref?.current;
          if (!el || el.contains((event?.target as Node) || null)) { 
            return;
          }

          handler(event); // Call the handler only if the click is outside of the element passed.
        };

        document.addEventListener("mousedown", listener); // 2. listening to dekstop or
        document.addEventListener("touchstart", listener); // listenig to  mobile

        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }, [ref, handler]); // Reload only if ref or handler changes
    };
 ```

 ## 9. ADD INTERACTIVITY WITH useEffect : CLICK 'Esc' BUTTON TO CLOSE NavItems

 ```tsx
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          if (e.key === 'Escape') { //properti dari object event
            setActiveIndex(null) // change to null
          }
        }

        document.addEventListener('keydown', handler) // is there 'keydown' event handler is called 

        // preventing memory leak when we unmount components by cleaning up after useEffect
        return () => {
          document.removeEventListener('keydown', handler)
        }
      }, [])
 ```

--------------------------------------DYNAMIC NAVBAR--------------------------------------------------
## -----------------------------------SHOPPING CART COMPONENT--------------------------------------------

1. CREATE components > Cart.tsx AS CLIENT COMPONENT
- shopping cart icon
- trigger to sheet component
- sheet component

2. DOWNLOAD SHEET COMPONENT `npx shadcn-ui add sheet` => similat to modal but in side part

3. DOWNLOAD SEPARATOR COMPONENT `npx shadcn-ui add separator`

4. ADD formatPrice() IN src > lib > utils.ts

```ts
    export function formatPrice( 
      price: number | string,
      options: {
        currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
        notation?: Intl.NumberFormatOptions['notation']
      } = {}
    ) {
      const { currency = 'USD', notation = 'compact' } = options // default

      const numericPrice =
        typeof price === 'string' ? parseFloat(price) : price // change to number if it's not

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        notation,
        maximumFractionDigits: 2,
      }).format(numericPrice)
    }

    //// used in Cart.tsx
    <span>{formatPrice(1)}</span>
```

### Good to Know - asChild attribute to remove default behaviour : the child can be Link or other element (default is Button)

```tsx
      <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: 'w-full',
                    })}>
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
```




##  1:55:55 - Setting up our server------------------------------------------------------

## 1. CREATE src > server.ts FOR ENTRY POINT OF EXPRESS SERVER
  - `npm i express`
  - `npm i @types/express`

## 2. CREATE src > get-payload.ts TO PROVIDE `getPayloadClient()`

  - Payload CMS (this video sponsor) : we can use it for query data for changing data for finding data and deleting data for all the same we can use  a regular database

  - `npm i dotenv` 
  - `npm i payload`

  2. 1. import getPayloadClient everywhere we need database access

## 3. DEFINE NEXTJS UTILITIES IN next-utiils.ts

```js
    import next from "next"

    const PORT = Number(process.env.PORT) || 3000

    export const nextApp = next({  // for custom server
        dev: process.env.NODE_ENV !== "production",
        port: PORT
    })

    export const nextHandler = nextApp.getRequestHandler()  // untuk menangani request http
```
## 4. INSTALL cross-env 
- this package let us work with the same environment variables cross platform (between express and nextjs)





## SETTING UP OUR ADMIN DASHBOARD ---------------------------------------------------------------
  - @payloadcms/richtext-slate 
  - @payloadcms/bundler-webpack 
  - @payloadcms/db-mongodb

## 0. EDIT dev scripts IN package.json

 "dev": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts nodemon",

## 1. CREATE src > payload.config.ts 
```js
 
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [], 
  routes: {
    admin: '/sell',
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: "/favicon.ico",
      ogImage: '/thumbnail.jpg'
    }
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}), // from slatejs
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
})
```
## 2. CREATE NEW FILE FOR NODEMON CONFIGURATION (nodemon.json)
 - install nodemon

 ```json
  {
    "watch": [
      "server.ts",
      "src/collections/**/*.ts",
      "src/trpc/index.ts"
    ],
    "exec": "ts-node --project tsconfig.server.json src/server.ts -- -I", // execute when there's change
    "ext": "js ts", // extensions
    "stdin": false
  }
 ```

## 3. CREATE tsconfig.server.json FOR SLIGHT ADJUSTMENT FROM BASE tsconfig (JUST FOR BACKEND)

```json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "module": "CommonJS",
      "outDir": "dist",
      "noEmit": false,
      "jsx": "react"
    },
    "include": ["src/server.ts", "src/payload.config.ts"]
  }
```


## 4. CONNECT WITH MONGODB drivers COPY URL TO .env

MONGODB_URL=mongodb+srv://ibrahimnivan:IamGonnaBeAProgrammer@cluster0.mlehbop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



## 5. TAMPILAN ADMIN DAHSBOARD localhost:3000/sell

![localhost:3000/sell](./mdpic/slashsell.png)
![anotherview](./mdpic/admindashboard2.png)


## AUTH 2.35.06 ---------------------------------------------------------------------

- verification email : we don't want anyone to create account with an email that they don't own

## 1. AUTH OVERVIEW

![authoverview](./mdpic/authoverview.png)

## 2. CREATE sign-up COMPONENT (app > (auth) > sign-up > page.tsx )
 - npx shadcn-ui@latest add input
 - npx shadcn-ui@latest add label
 
 install :
 - react-hook-form ()
 - @hookform/resolvers (for form validation)
 - zod (schema validation library)
 - sonner (toast notification library)

 ## 3. CREATE lib > validator > account-credentials-validator.ts

 ```ts
  import { z } from "zod"

  export const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
  })

  export type TAuthCredentialsValidator = z.infer<
    typeof AuthCredentialsValidator
  >
 ```

## tRPC setup 3.03.40 ------------------------------------------------------------

## 1. tRPC FOR FULLSTACK TYPE SAFETY
 - it allow us to maintain type safety through frontend and backend
 - when we change some data on the backend we get typescript errors on the frontend 
 - caution : the setup is a bad thing!

 INSTALL : 
 - npm i @trpc/client
 - @trpc/next 
 - @trpc/react-query 
 - @trpc/server 
 - @tanstack/react-query


 ## 2. CREATE NEW COMPONENT Providers.tsx

 ```tsx
    `use client`
    import { PropsWithChildren, useState } from "react"
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    import { trpc } from "@/trpc/client"
    import { httpBatchLink } from "@trpc/client"



    const Providers = ({children}: PropsWithChildren) => {
      const [queryClient] = useState(() => new QueryClient())
      const [trpcClient] = useState(() =>
        trpc.createClient({
          links: [
            httpBatchLink({
              url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
              fetch(url, options) {
                return fetch(url, {
                  ...options,
                  credentials: 'include',
                })
              },
            }),
          ],
        }))


        return (
          <trpc.Provider
            client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </trpc.Provider>
        )
    }

    export default Providers
 ```


 ## 3. CREATE src > trpc > client.ts

 ```js
  import { createTRPCReact } from '@trpc/react-query'
  import type { AppRouter } from './' // --------- tRPC main feature

  export const trpc = createTRPCReact<AppRouter>({})
 ```

 ## 4. CREATE trpc > index.ts
  - it's esentially our backend

```ts
    import { publicProcedure, router } from "./trpc"

    export const appRouter = router({ // custom type safe api endpoints
      anyApiRoute: publicProcedure.query(() => {
        return 'hello'
      })
    }) 

    export type AppRouter = typeof appRouter // the main feature of tRPC
```

 ## 5. CREATE trpc > trpc.ts
  - will serve the purpose of giving us this router
  - let's define all api endpoint or entire backend

  ```ts
      import { initTRPC } from '@trpc/server'

      const t = initTRPC.context().create()


      export const router = t.router 
      export const publicProcedure = t.procedure // anyone could call this api endpoint
      export const privateProcedure = t.procedure.use(isAuth)
  ```


 ## 6. MAKE tRPC PROVIDER ACCESSIBLE FOR THE ENTIRE APP
  - import Providers.tsx component to main layout.tsx

  ```tsx
   <main className='relative flex flex-col min-h-screen'>
        <Providers>
            <Navbar />
            <div className='flex-grow flex-1'>{children}</div>
        </Providers>
    </main>
  ```


 ## 7. SETUP TRPC IN OUR SERVER (server.ts)

 ```ts
  // setup tRPC in our server
  // when we get request in our server, we can simply forward that to tRPC in nextjs to handle it

  // createContext : allow us to take something from express (like req, res ) and attach them to something called the conteext to be able use them in nextjs

  const createContext = ({ 
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
  })

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
 ```


 ## 8. CREATE NEXTJS DYNAMIC ROUTE TO HANDLE TRPC REQUEST

  app > api > trpc > [trpc] > route.ts


 ## 9. REMOVE anyApiRouter BCS WE DONT NEED IT


 ## Finishing auth flow ----------------------------------------------------------------------


 ## 1. CREATE trpc > auth-router.ts


 ## 2. ADD authRouter to appRouter

 ```ts
 
    export const appRouter = router({ // custom type safe api endpoints
    auth: authRouter
    }) 
 ```


 ## 3. CREATE collections > Users.ts FOR DATABASE SCHEMA


 ## 4. CURRENT RESULT

 email: gurugembul
 pw: waza

 ![role-in-admin-dashboard](./mdpic/role.png)

 ## 5. DELETE DATABASE CREATE NEW USER (http://localhost:3000/sell/create-first-user)

  email: ibrahimnivan
  pw: prabowo
  role: admin

 ![create-new-user](./mdpic/createNew.png)

## 6. CREATE NEW scripts in package.json : "generate:types"

 - bcs this CMS is typescripts first, we can add package.json scripts to make developmen easier

 `"generate:types": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts payload generate:types",`

 - what's going to do: it's generate all the typescript types based on our config (collections that we have)

 - output :
```ts
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
```
 ## 7. SAMPLE RESULT AFTER npm run generate:types IN payload-types.ts

 ```ts
    export interface Config {
      collections: {
        users: User;
        'payload-preferences': PayloadPreference;
        'payload-migrations': PayloadMigration;
      };
      globals: {};
    }
    export interface User {
      id: string;
      role: 'admin' | 'user';
      updatedAt: string;
      createdAt: string;
      email: string;
      resetPasswordToken?: string | null;
      resetPasswordExpiration?: string | null;
      salt?: string | null;
      hash?: string | null;
      loginAttempts?: number | null;
      lockUntil?: string | null;
      password: string | null;
    }
    export interface PayloadPreference {
      id: string;
      user: {
        relationTo: 'users';
        value: string | User;
      };
      key?: string | null;
      value?:
        | {
            [k: string]: unknown;
          }
        | unknown[]
        | string
        | number
        | boolean
        | null;
      updatedAt: string;
      createdAt: string;
    }
    export interface PayloadMigration {
      id: string;
      name?: string | null;
      batch?: number | null;
      updatedAt: string;
      createdAt: string;
    }
 ```


 ##  8. CREATE NEW USER + SENDTOEMAIL IN auth-router

 ```ts
    await payload.create({
          collection: 'users', // collection is database table
          data: {
            email,
            password,
            role: 'user',

          },
        })

        return { success: true, sentToEmail: email}
 ```


 ## 9 GO ON WITH onSubmit in sign-up > page.tsx

 ```ts
 // ---- useMutation to make data change (anything but read)
const { mutate } = trpc.auth.createPayloadUser.useMutation({ 

  })
  
  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    mutate({ email, password })
  }
 ```

 ## 10. GO TO localhost:3000/sign-up

 ![signup](./mdpic/sign-up.png)

 pw: akupulang


 ##  11. SIGN UP IS WORKING

 ![sendtoemail](./mdpic/sendToEmailIsWorking.png)


 ##  12. NEW USER IS RECEIVED IN DATABASE

 ![newUser](./mdpic/newUserisreceivedindb.png)


 ## SENDING VERIFICATION EMAIL -----------------------------------------------------------------------
 - to be able to send email that dont go to spam (land in actual inbox): resend.com

 ## 1. GET API KEY FROM RESEND.COM
 - Flow: 
    - sign up
    - create new API Key

 ## 2. COPY IT TO .env

  RESEND_API_KEY=re_LvRV9N5t_DWN3QTKHX6nbifEBzrxmQLmQ

 ## 3. INSTALL NODEMAILER


 ## 4. IMPORT NODEMAILER IN get-payload.ts

 ```ts
      // define our transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        secure: true,
        port: 465,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY
        }
      })


      if (!cached.promise) {
        cached.promise = payload.init({ // init for initialization
         // ---------------------------------start
          email: {
            transport: transporter,
            fromAddress: "onboarding@resend.dev", // we can use our email
            fromName: "DigitalHippo"
          },
          // ----------------------------------- end
          
          secret: process.env.PAYLOAD_SECRET,
          local: initOptions?.express ? false : true,
          ...(initOptions || {}),
        })
      }

 ```


 ## 5. MODIFICATION IN collections > Users.ts

 ```ts
  // -------------------from this
   auth: true

  // -------------------to this
   auth: {
    verify: {
      generateEmailHTML: ({token}) => {
        return `<p>hello pls verify<p/>`
      }
    }
  },
 ```


 ## 6. RESIGN UP nathanrosxhild TO TEST EMAILER


 ## NOTE: WE USE PURWADHIKA NODEMAILER SETUP


 ## 7. CHANGE IN collections > Users.ts FOR PROPER VERIFICATION EMAIL

  verify: {
      generateEmailHTML: ({token}) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify Account</a>`
      }
    }


 ## 8. CREATE NEXTJS DIRECTORY ROUTE FOR EMAIL VERIFYCATION : (auth) > verify-email > page.tsx


 ## 9. CREATE VerifyEmail COMPONENT
  - imported to (auth) > verify-email > page.tsx

  RESULT: 
  ![verificationPage](./mdpic/verificationemailPage.png)


 ## 10. CREATE API ENDPOINT TO HANDLE EMAIL VERIFYCATION IN auth-router.ts

 ```ts
      verifyEmail: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input }) => {
          const { token } = input

          const payload = await getPayloadClient()

          const isVerified = await payload.verifyEmail({
            collection: 'users',
            token,
          })

          if (!isVerified)
            throw new TRPCError({ code: 'UNAUTHORIZED' })

          return { success: true }
        }),
 ```

 ## 11. VERIFICATION EMAIL FLOW AND HOW IT'S WORK : 4:37:30


 ## 12. verified = true

 ![verified=true](./mdpic/verified=true.png)


 ## error handling(validator) & finishing auth -------------------------------------------------------


 ## 1. onError AND onSuccess trpc useMutation object in sign-up > page.tsx FOR ERROR HANDLING

 ```ts
       const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({ // useMutation
    // --------------------------------------------start
    onError: (err) => {

      // is email isn't unique
      if (err.data?.code === 'CONFLICT') {
        toast.error(
          'This email is already in use. Sign in instead?'
        )

        return
      }

      // if it's not pass AuthCredentialsValidator 
      if (err instanceof ZodError) {  
        toast.error(err.issues[0].message)

        return
      }

      // for unkwon error
      toast.error(
        'Something went wrong. Please try again.'
      ) 
    }

    onSuccess: ({ sentToEmail }) => { // -------------------- for success
      toast.success(
        `Verification email sent to ${sentToEmail}.`
      )
      router.push('/verify-email?to=' + sentToEmail) // redirect
    },
    // ---------------------------------------------------- end
  })
 ```


 ## 2. IMPORT TOASTER FROM SONNER IN LAYOUT.TS
  
   <Toaster  position="top-center" richColors />


 ## 3. ERROR HANDLING WHEN EMAIL ISN'T UNIQUE

 ![emailduplicate](./mdpic/emailerror.png)


 ## 4. sign-up > page.tsx
   - react-hook-form error message

   ```ts
   // for email
  {errors?.email && (
        <p className='text-sm text-red-500'>
        {errors.email.message}
        </p>
  )}

  // for  password
   {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
   )}
   ```

###  note : reach-hook-form work well with zod


## 5. CREATE sign-in ROUTE 
- sign-in > page.tsx is from sign-up > page.tsx ( need several change)

```ts
  // sign-in trpc method

    const { mutate, isLoading } = trpc.auth.signIn.useMutation({ // useMutation
        onSuccess: async () => {
          toast.success('Signed in successfully')

          router.refresh()

          if (origin) {
            router.push(`/${origin}`)
            return
          }

          if (isSeller) {
            router.push('/sell')
            return
          }

          router.push('/')
        },
        onError: (err) => {
          if (err.data?.code === 'UNAUTHORIZED') {
            toast.error('Invalid email or password.')
          }
        },
      })
```


## 6. CREATE trpc auth signIn method

```ts
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

```


## 7. ADD EXPRESS CONTEXT IN trpc

```ts
    // in server.ts
    const createContext = ({ // make express available in nextjs
      req,
      res,
    }: trpcExpress.CreateExpressContextOptions) => ({
      req,
      res,
    })

    export type ExpressContext = inferAsyncReturnType<
      typeof createContext
    >

    // in trpc.ts
    const t = initTRPC.context<ExpressContext>().create()
```

## 8. CREATE lib > payload-utils.ts FOR getServerSideUser FUNCTION


## 9. USE getServerSideUser() IN NAVBAR

```ts
      const nextCookies = cookies()
      const { user } = await getServerSideUser(nextCookies)

```

## 10. NAVBAR AFTER SIGN IN (no signin and create account button)

![navbar](./mdpic/navbarAfterSignin.png)


## making navbar truly dinamic ---------------------------------------------------------------------


## 1. CREATE UserAccountNav COMPONENT (my account dropdown menu)
 -  npx shadcn-ui@latest add dropdown-menu


## 2. CREATE REACT CUSTOM HOOK FOR LOG OUT, hook > use-auth.ts


```ts
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAuth = () => {
  const router = useRouter()

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, // built-in cms endpont mereun
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!res.ok) throw new Error()

      toast.success('Signed out successfully')

      router.push('/sign-in')
      router.refresh()
    } catch (err) {
      toast.error("Couldn't sign out, please try again.")
    }
  }

  return { signOut }
}
```


## 3. DROPDOWN  MENU RESULT

![dropdown](./mdpic/dropdownmenu.png)

![logoutSuccess](./mdpic/logout.png) token is removed

## 5:29:41 - How do we architect our data models? ---------------------------------------------


## Modelling our data & enabling uploads ----------------------------------------

## 1. CREATE NEW COLLECTIONS collections > Products > Products.ts

## 2. CREATE NEW COLLECTIONS collections > Media.ts

## 3.  CREATE NEW COLLECTIONS collections > ProductFiles.ts

## 4. npm run generate:types TO GET COLLECTION TYPES

##  5. CREATE NEW COLLECTIONS collections > Orders.ts


















8. 2:14:30 - Setting up our admin dashboard
9. 2:34:39 - How do we handle the auth flow?
10. 2:40:10 - Implementing our auth flow
11. 3:03:29 - tRPC setup (super handy backend tool)




