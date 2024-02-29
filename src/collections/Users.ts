import { CollectionConfig } from "payload/types";


export const Users: CollectionConfig = {
  slug: "users", // collection name
  auth: {
    verify: {
      generateEmailHTML: ({token}) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify Account</a>`
      }
    }
  },
  access: {
    read: () => true,
    create: () => true,
    
  },
  fields: [      // table column
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      type: 'select',
      options: [
        {label: "Admin", value: "admin"},
        {label: 'User', value: "user"},
      ]
    }
  ]
}