# My Last Poop in a calendar


## Architecture
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- Dynamodb database (Terraform IaaC)
- Samesite Backend API 

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Environment Variables
```
NEXT_PUBLIC_AWS_LP_ACCESS_KEY_ID=
NEXT_PUBLIC_AWS_LP_SECRET_ACCESS_KEY=
NEXT_PUBLIC_AWS_DDB_TABLE_NAME=
```


## Deploy on Vercel

Push to master / staging / branch

