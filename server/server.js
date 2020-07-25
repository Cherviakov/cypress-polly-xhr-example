const http = require('http');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const DBContext = require('./DbContext');
const cors = require('./cors');

DBContext.connect();
const Item = require('./Item');

const app = express();

app.use(helmet());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(logger('dev'));

cors(app);

app.get('/', async (req, res) => {
  const items = await Item.find();
  res.status(200).send(items);
});

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('server listening on port', 3000);
});
