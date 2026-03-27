const express = require("express")
const fs = require("fs")
const axios = require("axios")
const app = express()
app.use(express.json())

const path = "./disciplina.json"

function ler() {
    return JSON.parse(fs.readFileSync(path))
}

function salvar(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

app.get("/usuario", async (req, res) => {

    const response = await axios.get("http://localhost:3002/usuario")
    const usuarios = response.data

    res.json(response.data)

})

app.post("/disciplinas", (req, res) => {

    const { nome } = req.body

    const disciplinas = ler()

    const disciplina = {
        id: Date.now(),
        nome
    }

    disciplinas.push(disciplina)

    salvar(disciplina)

    res.json(disciplina)

})

app.get("/disciplinas", (req, res) => {

    const disciplinas = ler()
    res.json(disciplinas)

})

app.listen(3001, () => {
    console.log("Disciplina Service rodando 3001")
})