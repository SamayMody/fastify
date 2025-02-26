const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();

// Import my routes
const userRoutes = require("./routes/user.routes");
// Connect to my database
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the database"))
    .catch((e: unknown) => console.log("Error connecting to database", e));

// start my server
fastify.register(userRoutes, { prefix: "/api/v1/users" });

const start = async () => {
    try {
        await fastify.listen({ port: 5000 });
        fastify.log.info(
            `Server is running on port ${fastify.server.address().port}`
        );
    } catch (error) {
        if (error instanceof Error) {
            fastify.log.error("Error starting server:", error.message);
            fastify.log.error(error.stack);
        } else {
            fastify.log.error("Unexpected error:", error);
        }
    }
};

start();