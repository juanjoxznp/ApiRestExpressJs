const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require ('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const whitelist = ['http://localhost:8080'];
const options = {

  origin: (origin,callback) =>{

    if(whitelist.includes(origin) || !origin){
      callback(null,true)

    } else {

      callback(new Error('No permitido'))

    }

  }

}
app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('My port: ' + port);
});
