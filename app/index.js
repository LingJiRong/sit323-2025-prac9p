const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://mongouser:secret@mongo-service:27017/?authSource=admin';

app.use(express.json());

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then(client => {
    console.log('✅ Connected to MongoDB');
    const db = client.db('taskdb');
    const tasks = db.collection('tasks');

    app.get('/tasks', async (req, res) => {
      const allTasks = await tasks.find().toArray();
      res.json(allTasks);
    });

    app.post('/tasks', async (req, res) => {
      const result = await tasks.insertOne(req.body);
      res.json(result);
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
  });
