import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksroute.js";
import cors from "cors";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow all Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],

//     }

// ));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL).
    then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        }); //This is a callback function, I want my express server to run only if my database connection is successful
    })
    .catch((error) => {
        console.log(error);
    });
