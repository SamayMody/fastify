const userController = require("../controllers/user.controllers");

import { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance, options: any) {
    fastify.get("/", userController.getAllUsers);
    fastify.post("/", userController.createUser);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);
    fastify.post("/login", userController.login);
}

module.exports = routes;