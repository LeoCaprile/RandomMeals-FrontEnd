const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port);
console.log('listen on ' + port);
