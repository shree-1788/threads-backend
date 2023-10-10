import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


async function startServer() {
    const app = express();
    app.use(express.json());

    const PORT = Number(process.env.PORT) || 8000;

    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
            hello: String
        }`,
        resolvers: {
            Query: {
                hello: () => `Hello shree whta up`,
            }
        }
    })

    await gqlServer.start();

    app.use("/graphql",expressMiddleware(gqlServer));

    app.listen(PORT, () => `server running at PORT: ${PORT}`);
    
}

startServer();


