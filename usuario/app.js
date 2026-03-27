const express = require("express")
const axios = require("axios")

const app = express()
const fs = require("fs")
app.use(express.json())
const path = "./usuario.json"

function ler() {
    return JSON.parse(fs.readFileSync(path))
}

function salvar(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

app.get("/disciplinas", async (req, res) => {

    const response = await axios.get("http://localhost:3001/disciplinas")

    res.json(response.data)

})

app.post("/usuario", (req, res) => {

    const { nome, funcao } = req.body

    const dataUsuarios = ler()

    const usuario = {
        id: Date.now(),
        nome,
        funcao
    }

    dataUsuarios.push(usuario)

    salvar(usuario)

    res.json(usuario)

})

app.get("/usuario", (req, res) => {

    const dataUsuarios = ler()
    res.json(dataUsuarios)

})

app.listen(3002, () => {
    console.log("Aluno Service rodando 3002")
})

