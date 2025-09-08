npm init -y
npm install express dotenv
npm install prisma@latest --save-dev
npm install @prisma/client@latest


Verify installation
npx prisma -v

After successful install, you can run:
npx prisma init  //create prisma/schema.prisma



Run first migration (creates table)
npx prisma migrate dev --name init

//Generate Prisma Client
npx prisma generate



