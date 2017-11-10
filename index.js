require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const controller = require('./products_controller')

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
    .then(dbInstance =>
        {
            app.set('db', dbInstance)
            console.log('I am set')
        }
    )

app.get('/api/products', controller.getAll)
app.get('/api/product/:id', controller.getOne)
app.put('/api/product/:id', controller.update)
app.post('/api/product', controller.create)
app.delete('/api/product/:id', controller.delete)

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on Port:${port}`);
})