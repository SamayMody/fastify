import { error } from "console";
import { FastifyRequest, FastifyReply } from "fastify";
const jwt = require('jsonwebtoken');
require("dotenv").config();

export default function verifyToken(request: FastifyRequest, reply: FastifyReply, next: any) {

    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return reply.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err: any) => {
        if (err) return reply.status(401).send({ message: "Invalid or expired token" })
    });
    next();

}