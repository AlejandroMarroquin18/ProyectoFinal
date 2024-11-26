const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = 3000;

// Cors
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});