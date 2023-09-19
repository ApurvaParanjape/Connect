import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//FILE STORAGE

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, "public/assete");
    },
    filename: function(req, file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage})