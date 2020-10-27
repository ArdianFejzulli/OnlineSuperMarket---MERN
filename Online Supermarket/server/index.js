const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product')); 
app.use('/api/categories', require('./routes/categories'));
app.use('/api/subCategories', require('./routes/subCategories'));
app.use('/api/orders', require('./routes/orders'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {


  app.use(express.static("admin/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../admin", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});