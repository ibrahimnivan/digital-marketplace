import { User } from '../payload-types'
import { Access, CollectionConfig } from 'payload/types'

const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    return {
      user: { // image user fields
        equals: req.user.id, // equals to currently login
      },
    }
  }

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {              // 
    beforeChange: [
      ({ req, data }) => {  // each product image should associate with user, we don't want anyone to be able to access all the media files for other people
        return { ...data, user: req.user.id }
      },
    ],
  },
  access: {  
    read: async ({ req }) => {  // only owner and customer (termasuk yg belum login) can see product 
      const referer = req.headers.referer // referer = berisi URL halaman web sebelumnya

      if (!req.user || !referer?.includes('sell')) {
        return true
      }

      return await isAdminOrHasAccessToImages()({ req })
    },
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],  //  only for image file extensions jpg, png, svg etc
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
}