import express from "express";
import routes from "./src/routes/route.js";
import dotenv from "dotenv";
import init_db from "./src/core/inti_db.js";
const app = express();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
init_db();

routes.forEach((route) => {
    app.use(route.path, route.file);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
