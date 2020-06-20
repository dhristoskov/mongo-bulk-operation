const express = require('express');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');

const dbConnection = require('./db');

const studentsRoutes = require('./routes/students-routes')

const app = express();
dbConnection();

app.use(bodyParser.json());
app.use(upload());

app.use('/api/students', studentsRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));