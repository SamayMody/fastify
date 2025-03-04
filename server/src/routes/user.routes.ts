const userController = require("../controllers/user.controllers");

import { FastifyInstance } from 'fastify';
import verifyToken from '../middlewares/jwt.verify';

async function routes(fastify: FastifyInstance, options: any) {
    fastify.get("/", { preHandler: verifyToken }, userController.getAllUsers);
    fastify.post("/", userController.createUser);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);
    fastify.post("/login", userController.login);
}

module.exports = routes;