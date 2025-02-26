const User = require("../models/user");
import { FastifyRequest, FastifyReply } from "fastify";

export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await User.find();
        reply.send(users);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = new User(request.body);
        const result = await user.save();
        reply.send(result);
    } catch (error) {
        reply.status(500).send(error);
    }
}
export const updateUser = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        });
        reply.send(user);
    } catch (error) {
        reply.status(500).send(error);
    }
}
export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await User.findByIdAndDelete((request.params as { id: string }).id);
        reply.status(203).send("");
    } catch (error) {
        reply.status(500).send(error);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};