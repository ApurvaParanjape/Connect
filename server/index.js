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
import {register} from "./controllers/auth.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"

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

//Routes with image files
app.post("/auth/register", upload.single("picture"), register)

//Routes
app.use("/auth",authRoutes);
app.use("/users",userRoutes)

// Mongoose setup
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port : ${PORT}`));
})
.catch((error)=> console.log(`ERROR: ${error}`))