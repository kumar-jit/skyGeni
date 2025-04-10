import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// crating server instance
export const App = express();

//configuring environment variables
dotenv.config();

// setup cors options
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
App.use(cors(corsOptions));

// setup express.json middleware to parse JSON requests
App.use(express.json());

// test route to check if the server is running
App.get("/", (req, res) => {
    res.send("Server is running");
});


