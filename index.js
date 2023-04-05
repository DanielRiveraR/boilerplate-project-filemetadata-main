const express = require('express');
const multer = require('multer');
const cors = require('cors')

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
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
