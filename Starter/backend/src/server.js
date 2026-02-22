import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/stack_eleven_graphql";

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB:", MONGODB_URI);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        let user = null;

        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          try {
            user = jwt.verify(token, process.env.JWT_SECRET);
          } catch (err) {
            console.warn("Invalid token");
          }
        }

        return {
          user,
        };
      },
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "graphql-backend",
      mongodb:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
  });

  app.listen(PORT, () => {
    console.log(`GraphQL Server running at http://localhost:${PORT}/graphql`);
  });
}

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});

startServer().catch(error => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
