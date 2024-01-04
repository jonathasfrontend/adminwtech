const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
var session = require('express-session');

const Emails = require('./models/email')

const app = express();
app.use(express.json());
app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  session({
    secret: 'Jonathass001',
    resave: true,
    saveUninitialized: true,
  })
);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/content/v1/emails', async (req, res) => {
  try {
    const [emails] = await Promise.all([
      Emails.find(),
    ]);
    const responseData = {
      emails
    };
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

app.post("/content/v1/post/emails", async (req, res)=>{
  const postemail = req.body
  const newEmail = await Emails.create(postemail);
  return res.status(201).json(newEmail);
})


var usuarios = [
  {
      nome: 'jonathass5678@gmail.com',
      senha: '2018229332520213028730'
  }
]

app.post('/', (req, res) => {
  usuarios.map(function (val) {
    if (val.nome == req.body.login && val.senha == req.body.senha) {
      req.session.login = 'Jonathas';
    }
  });
  res.redirect('/');
});

app.get('/', async (req,res) => {
  if(req.session.login == null) {
      res.render('home');
  } else {

    const emails = await axios.get('http://localhost:4000/content/v1/emails');
    const listemails = emails.data.emails.map(val => ({
        id: val._id,
        nome: val.nome,
        numero: val.numero,
        email: val.email,
        messagens: val.messagens,
        createdAt: val.createdAt,
    }));
    res.render('dashboard', {listemails})
  }
});

mongoose.connect('mongodb+srv://root:dFrPbwloK4qEAnKy@cluster0.xvdlp.mongodb.net/emails?retryWrites=true&w=majority')
.then(()=>{console.log("bd connected")})
.catch(()=>{console.log("Deu ruin")})

app.listen(4000)