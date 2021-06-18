import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
    res.json({title: "Cloud Build Chat Notifications", message: "Hello there!"});
});

export default app;
