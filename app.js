const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');

const config = require('./config');
const port   = process.env.PORT || 3000; // 노드 실행시 포트 인자 사용 없으면 3000

const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.set('jwt-secret', config.secret); // config.js 파일의 secret을 사용

app.get('/', (req, res) => {
	res.send('JWT index');
});

app.use('/web', require('./routes/web')); // web
app.use('/api', require('./routes/api')); // api

app.listen(port, () => {
	console.log(`Express running on ${port}`);
});


// mongodb
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
	console.log('mongoose is running');
});
