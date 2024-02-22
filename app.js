const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile("./Views/home.html", { root: __dirname })

})


mongoose.connect(`mongodb+srv://rkarym7:${process.env.password}@backend.hmf7ygu.mongodb.net/all-articles?retryWrites=true&w=majority`)
.then(() => { app.listen(port, () => {
 console.log(`http://localhost:${port}`)
    })
}).catch ((err) => { console.log(err); })



const Article = require("./models/articleSchema");
app.post("/all-articles", (req, res) => {
  const article = new Article(req.body);

  article
    .save()
    .then( result => {
      res.redirect("/");
    })
    .catch( err => {
      console.log(err);
    });
});