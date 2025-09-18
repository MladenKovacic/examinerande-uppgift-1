//npm i express dotenv mongoose
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./IMS/graphql/resolvers.js";
import { typeDefs } from "./IMS/graphql/typeDefs.js";
import route from "./Routes/routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/", route);
const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

app.use(
  "/graphql",
  expressMiddleware(apollo, {
    context: async () => ({}),
  })
);

const PORT = 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("GraphQL is running on port 3000");
    });
  })
  .catch(console.error);
