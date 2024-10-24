const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();  
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs'); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);  
app.use('/api/contacts', contactRoutes);  

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});