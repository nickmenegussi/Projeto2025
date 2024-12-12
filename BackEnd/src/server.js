const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const port = 5130



const app = express()
app.use(cors()) // permitir que os navegadores acessem diferentes domíniose
app.use(express.json())
dotenv.config()
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Rodando na porta ${port}`));
