var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var db = require('./db.js');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) => {
  db.query('SELECT * FROM `messages`', (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      results.reverse();
      console.log(results);
      res.status(200).json(results);
    }
  })
});

app.post('/messages', (req, res) => {
  const { username, text, roomname } = req.body;
  db.query('INSERT INTO `messages` VALUES (id, ?, ?, ?)', [username, text, roomname], (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      console.log(results);
      res.status(201).json({ message: 'Successfully added!'});
    }
  } )
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})