const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const upload = multer({ dest: 'uploads/' });
const config = require('./config/config');
const Store = require('./schemas/store');

mongoose.Promise = global.Promise;

//Router Imports
const storeRegister = require('./routes/store/store-registration');
const storeAuth = require('./routes/store/store_auth');
const productRoutes = require('./routes/product/product-routes');
const categoryRoutes = require('./routes/category/category-routes');
const storeRoutes = require('./routes/store/store_routes');
const customerAuth = require('./routes/customers/customer-auth');
const customerRoutes = require('./routes/customers/customer-place-order');

mongoose.connect('mongodb://kephas:kephas@ds113935.mlab.com:13935/kephas-sample');

app.use(function(req,res,next){setTimeout(next,1000)});
// app.use(middleware);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('superSecret', config.secret);

app.use(storeRegister);
app.use(storeAuth);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(storeRoutes);
app.use(customerAuth);
app.use(customerRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// app.post('/register', upload.single('logo'), (req, res) => {
    
//    let data = req.body
//    let file = req.file;
//    let store = new Store();
//    console.log(data);
//    store.name = data.name;
//    store.logo.data = fs.readFileSync(file.path);
//    store.logo.contentType = 'png'
//    store.save((err, store) => {
//        if (err) res.send(err);
//        res.send(store)
//    })
// });

app.get('/store', (req, res) => {
    Store.find({}, (err, stores) => {
        let store = stores[0];
        //res.contentType(store.logo.contentType);
        let image = store.logo.data.toString('base64');
        res.send(`<img src="data:image/png;base64,${image}">`);
    });
});

const port = process.env.PORT || 1337

server.listen(port,()=>{
    console.log(`The server is up at the post ${port}`);
});
