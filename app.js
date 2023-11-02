var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var db = require('./db.js');
var Messages = require('./models.js');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

async function test() {
  try {
    await db.authenticate();
    console.log('Connected');
  } catch(err) {
    console.log(err);
  }
}
test();

app.get('/messages', (req, res) => {
  // db.query('SELECT * FROM `messages`', (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(404);
  //   } else {
  //     results.reverse();
  //     console.log(results);
  //     res.status(200).json(results);
  //   }
  // });
  Messages.sync()
    .then(() => {
      return Messages.findAll();
    })
    .then((messages) => {
      messages.reverse();
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    })
});

app.post('/messages', (req, res) => {
  const { username, text, roomname } = req.body;
  // db.query('INSERT INTO `messages` VALUES (id, ?, ?, ?)', [username, text, roomname], (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(404);
  //   } else {
  //     console.log(results);
  //     res.status(201).json({ message: 'Successfully added!'});
  //   }
  // })
  Messages.sync()
    .then(() => {
      return Messages.create({ username, text, roomname });
    })
    .then((results) => {
      console.log(results);
      res.status(201).json({ message: 'Successfully added!'});
    })
    .catch((err) => {
      res.sendStatus(404);
    })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})