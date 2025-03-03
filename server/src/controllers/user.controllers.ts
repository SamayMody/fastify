const User = require("../models/user");
import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt'

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
        user.password = await bcrypt.hash(user.password, 8);
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
        reply.status(204).send("");
    } catch (error) {
        reply.status(500).send(error);
    }
}

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email, password } = request.body as { email: string, password: string };
        const user = await User.findOne({ email });
        if (!user) { return reply.status(401).send({ message: "Invalid email or password." }); }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) { return reply.status(401).send({ message: "Invalid email or password." }); }

        return reply.status(200).send({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        return reply.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
};