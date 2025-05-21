import dotenv from 'dotenv';
import connectDB from './db/dbconnect.js'
import { app } from './app.js'

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() =>
        app.listen(process.env.PORT || 5000, () => {
            try {
                console.log(`Server running on ${process.env.PORT || 5000}`)
            } catch (error) {
                console.error(error)
            }
        })
    ).catch((err) => {
        console.log("MONGO DB CONNECTION ERROR", err);
    })
