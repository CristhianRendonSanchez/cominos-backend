# COMINOS BACKEND

Aplicacion encargada de servir los microservicios al frontend para ecommerce y inventarios cominos

## Prisma

Comandos para trabajar con el motor del ORM Prisma

- Setup a new Prisma project
  - `npx prisma init`
- Generate artifacts (e.g. Prisma Client)
  - `npx prisma generate`
- Browse your data
  - `npx prisma studio`
- Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prima Client)
  - `npx prisma migrate dev`
- Pull the schema from an existing database, updating the Prisma schema
  - `npx prisma db pull`
- Push the Prisma schema state to the database
  - `npx prisma db push`

## NestJS

- Para generar un nuevo modulo dentro de la app correr el comando: `nest generate resource` y poner el nombre en plural del modulo, despues seleccionar REST API y despues Yes a la generacion del CRUD automaticamente

- Para correr el proyecto ejecutar el comando `npm run start:dev`
