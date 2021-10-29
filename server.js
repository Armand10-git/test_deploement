require("dotenv").config({ path: "./config.env" });
const path = require('path');
const express = require("express");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/posts", postRoutes);

if(process.env.NODE_ENV === "production"){
    app.unsubscribe(express.static(path.join(__dirname, '/client/build')));
    app.getMaxListeners('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('api running')
    })
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
