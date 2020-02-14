const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.port || 3000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.locals.siteTitle = 'Test';

app.use(express.static('app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./routes/index'));
app.use(require('./routes/api'));

const server = app.listen(app.get('port'), function() {
    console.log('Servidor escuchando en puerto %d', app.get('port'));
});