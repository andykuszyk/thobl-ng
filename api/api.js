const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('dist/thoughtspace'));
app.listen(80, () => console.log('Thobl running on port 80'));
