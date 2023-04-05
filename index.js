const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(cors());

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No se ha cargado ningún archivo');
  }
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});
