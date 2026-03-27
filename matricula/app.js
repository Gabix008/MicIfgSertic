const express = require("express")
const axios = require("axios")

const app = express()
const fs = require("fs")
app.use(express.json())
const path = "./matricula.json"

function ler() {
    return JSON.parse(fs.readFileSync(path))
}

function salvar(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}


app.post("/matricula", (req, res) => {

    const { aluno,disciplina } = req.body

    const dataMatricula = ler()

    const matricula = {
        id: Date.now(),
        aluno,
        disciplina,
        
    }

    dataMatricula.push(matricula)

    salvar(dataMatricula)

    res.json(matricula)

})

app.get("/matricula", (req, res) => {

    const dataMatricula = ler()
    res.json(dataMatricula)

})

app.get("/alunos", async (req, res) => {

    const response = await axios.get("http://localhost:3002/usuario")

    const alunos = response.data.filter(u => u.funcao == 2)

    res.json(alunos)

})

app.get("/nomeAluno/:matricula", async (req, res) => {

    const {matricula} = req.params

    const response = await axios.get("http://localhost:3002/usuario")

    const aluno = response.data.find(
        u => u.matricula == matricula && u.funcao == 2
    )

    res.json(aluno.nome)

})

app.get("/nomeDisciplina/:matricula", async (req, res) => {

    const {matricula} = req.params

    const response = await axios.get("http://localhost:3001/disciplinas")

    const disciplina = response.data.find(
        u => u.matricula == matricula 
    )

    res.json(disciplina.nome)

})

app.listen(3003, () => {
    console.log("Matricula Service rodando 3003")
})

