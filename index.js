const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Emails = require('./models/email')

const app = express();
app.use(express.json());
app.use(cors());

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

mongoose.connect('mongodb+srv://root:dFrPbwloK4qEAnKy@cluster0.xvdlp.mongodb.net/emails?retryWrites=true&w=majority')
.then(()=>{console.log("bd connected")})
.catch(()=>{console.log("Deu ruin")})

app.listen(4000)