const DataModel = require('../models/DataModel');

exports.getAllData = async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.insertData = async (req, res) => {
  try {
    const newData = req.body;
    const insertedData = await DataModel.create(newData);
    res.json(insertedData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getD3ChartData = async (req, res) => {
    try {
      const chartData = await DataModel.aggregate([
        { $group: { _id: "$sector", intensitySum: { $sum: "$intensity" } } }
      ]);
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };