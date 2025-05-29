require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB model
const Email = mongoose.model('Email', new mongoose.Schema({ email: String }));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (email) {
    await Email.create({ email });
    res.send('<p>Merci ! Votre e-mail a été enregistré.</p><a href="/">Retour</a>');
  } else {
    res.send('<p>Veuillez entrer un e-mail valide.</p><a href="/">Retour</a>');
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
