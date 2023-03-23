require("dotenv").config();
import express from "express";
import logger from "./utils/logger";
import router from "./Routes/userRoutes";
import dbInit from "./database/dbInit";

/**
 * Connecting DB and sync table with DB
 */
(async () => {
    try {
        await dbInit();
    } catch (error) {
        throw error;
    }
})()

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(router);

app.use('/*', (req, res, next) => {
    return res.status(404).json("Not Found! Please insert correct URL");
})

app.use((err, req, res, next) => {
    return res.status(500).json("Internal Server error");
});


app.listen(PORT, () => {
    console.log(
        "\x1b[33m%s\x1b[0m", `Server :: Running @ 'http://localhost:${PORT}'`);
}).on("error", (_error) => {
    return console.log("Error: ", _error.message);
});
