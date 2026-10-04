const express = require('express');
const logger = require('./middleware/logger');
const {notFound, errorHandler} = require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const port = 3000;

// middleware to log failed requests (if any)
app.use(logger);
app.use(express.json());

// mounting router
app.use("/students", studentRoutes);

// fallbacks
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log("Server running on 3000");
})