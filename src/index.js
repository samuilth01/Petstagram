const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/authMiddleware');

const routes = require('./routes');

const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`)
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(`DB Error, `, err.message));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');


app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(3000, console.log(`Server is listening on port 5000...`));