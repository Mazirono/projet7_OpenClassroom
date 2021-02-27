const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();

const ArticlesRoutes = require('./routes/articles.routes');
const UtilisateursRoutes = require('./routes/utilisateurs.routes');

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Le serveur est sur le port 3001." });
});

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
    
  next();
});

app.use('/api/articles',  ArticlesRoutes);
app.use('/api/utilisateurs',  UtilisateursRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});