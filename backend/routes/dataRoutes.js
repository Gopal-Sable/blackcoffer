const express = require('express');
const router = express.Router();
const dataController = require('../controllers/DataController');

router.get('/', dataController.getAllData);
router.post('/', dataController.insertData);
router.get('/d3-chart-data', dataController.getD3ChartData); 

module.exports = router;
