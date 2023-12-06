const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/blackcoffer', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/data', dataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
