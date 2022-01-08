## fastify-mikro-orm-mercurius-graphql-example

A MikroORM boilerplate for GraphQL made with Fastify, Mercurius, Typescript using TypeGraphQL

## 📦 Packages

- [Fastify](https://www.fastify.io/)
- [MikroORM](https://mikro-orm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [GraphQL](https://graphql.org/)
- [Mercurius](https://mercurius.dev)
- [TypeGraphQL](https://typegraphql.com/)
- [Typescript](https://www.typescriptlang.org/)
___

## ✨ Installation

1. Install dependencies via `yarn`
2. create .env file based on .env.example

```
DATABASE_HOST=
DATABASE_USER=
DATABASE_NAME=
DATABASE_PASS=

JWT_SECRET=
JWT_REFRESH_SECRET=

COOKIE_SECRET=
```

4. Build /dist via `tsc` or `yarn watch`
5. Run via `yarn start` or `yarn dev`
6. GraphiQL playground is running on  [localhost:9000/graphiql](http://localhost:9000/graphiql)

___

## ⚡️ Usage

### Migrations

you can see mikro-orm cli document for migrations [Migrations | using via cli](https://mikro-orm.io/docs/migrations/#using-via-cli)

___

## 🐍 Author

Vigen
Github: [47vigen](http://github.com/47vigen)  
Twitter: [@47vigen](http://twitter.com/47vigen)  

___

## 📢 Shoutouts

Special thanks to [Martin Adámek](https://github.com/B4nan) for developing mikro-orm
and [Dries Croons](https://github.com/driescroons) for [mikro-orm-graphql-example](https://github.com/driescroons/mikro-orm-graphql-example) and readme file.  

___

## ⭐️ Support

Please star the repository if this helped you!

___

## ⛑️ Contribution

Want to help contribute to this repository?

- Something's not working? Got a question? Create an issue!
- Missing some functionality? Feel free to create a pull request!

___

## 🚧 Todo

- Complete auth
- Create test
- Eventually make it better :)
