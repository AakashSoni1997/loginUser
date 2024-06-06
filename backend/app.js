const express = require("express");
const dotenv = require("dotenv");
const UserDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
//important
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//env path
dotenv.config();
const port = process.env.PORT;

//DATABASE CONNECTION
UserDb();

//UsersRoutes
const user = require("./routes/userRoutes");
app.use("/api/v1", user);

app.listen(port, () => console.log(`Server running on port ${port}`));
