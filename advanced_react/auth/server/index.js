// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost/auth');

// App Setup
app.use(morgan('combined'));  // Logs the route request on terminal, for debugging purposes. (Middleware) 
app.use(cors());  // Allows the front and back ends to work on different domains. (Middleware)
app.use(bodyParser.json({ type: '*/*' }));  // Parse all in coming request into json, no matter the request. (Middleware)
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
