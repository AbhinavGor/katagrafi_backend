require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose =  require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Cookies
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000}
}));

//Mongo Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("MongoDB Connected!");
}).catch((e) => {
    console.log("Cannot connect to mongo!", e);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})