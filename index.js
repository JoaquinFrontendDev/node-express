const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://api.example.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acceso denegado'));
    }
  },
};

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT);
