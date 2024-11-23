dotenv.config();
import dotenv from "dotenv";
import express from "express";
import routes from "./src/routes/route.js";
import init_db from "./src/core/inti_db.js";
import configureCloudinary from "./src/core/cloudinaryConfig.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
init_db();
configureCloudinary();

routes.forEach((route) => {
  app.use(route.path, route.file);
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
