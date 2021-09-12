const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./db');
const router = require('./routes/index');
const models = require('./models/models');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);


const start = async() =>{
    try {
       await sequelize.authenticate();
       await sequelize.sync();
        app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}`));
    }   catch (e){
        console.log('Server Error', e.message);
        process.exit(1);
    }
}



start();
