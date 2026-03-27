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
    res.json(response.data)

})

app.post("/disciplinas", (req, res) => {

    const { nome ,professorMatricula} = req.body

    const dataDisciplinas = ler()

    const disciplina = {
        id: Date.now(),
        nome,
        professorMatricula
    }

    dataDisciplinas.push(disciplina)

    salvar(dataDisciplinas)

    res.json(disciplina)

})

app.get("/disciplinas", (req, res) => {

    const dataDisciplinas = ler()
    res.json(dataDisciplinas)

})

app.get("/professores", async (req, res) => {

    const response = await axios.get("http://localhost:3002/usuario")

    const professores = response.data.filter(u => u.funcao == 1)

    res.json(professores)

})

app.get("/nomeProfessor/:matricula", async (req, res) => {

    const {matricula} = req.params

    const response = await axios.get("http://localhost:3002/usuario")

    const professor = response.data.find(
        u => u.matricula == matricula && u.funcao == 1
    )

    res.json(professor.nome)

})

app.get("/alunos", async (req, res) => {

    const response = await axios.get("http://localhost:3002/usuario")

    const alunos = response.data.filter(u => u.funcao == 2)

    res.json(alunos)

})

app.listen(3001, () => {
    console.log("Disciplina Service rodando 3001")
})