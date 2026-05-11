const API_USUARIO = "http://localhost:30082"
const API_DISCIPLINA = "http://localhost:30082"
const API_MATRICULA = "http://localhost:30082"


function mostrarCadastrarUsuario(){

document.getElementById("conteudo").innerHTML = `
<h2>Cadastrar Usuário</h2>

<input id="nome" placeholder="Nome">
<input id="matricula" placeholder="Matricula">

<select id="funcao">
<option value="1">Professor</option>
<option value="2">Aluno</option>
</select>

<button onclick="cadastrarUsuario()">Salvar</button>
`

}

async function cadastrarUsuario(){

const nome = document.getElementById("nome").value
const matricula = document.getElementById("matricula").value
const funcao = document.getElementById("funcao").value

await fetch(`${API_USUARIO}/usuario`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
nome,
matricula,
funcao
})
})

alert("Usuário cadastrado com sucesso")

}

async function listarUsuarios(){

const response = await fetch(`${API_USUARIO}/usuario`)
const usuarios = await response.json()

let html = `
<h2>Usuários</h2>

<table>
<tr>
<th>Nome</th>
<th>Matricula</th>
<th>Função</th>
</tr>
`

usuarios.forEach(u=>{

html += `
<tr>
<td>${u.nome}</td>
<td>${u.matricula}</td>
<td>${u.funcao == 1 ? "Professor" : "Aluno"}</td>
</tr>
`

})

html += "</table>"


document.getElementById("conteudo").innerHTML = html

}

async function mostrarCadastrarDisciplina(){

const professores = await fetch(`${API_DISCIPLINA}/professores`)
const data = await professores.json()

let options = ""

data.forEach(p=>{
options += `<option value="${p.matricula}">${p.nome}</option>`
})


document.getElementById("conteudo").innerHTML = `

<h2>Cadastrar Disciplina</h2>

<input id="nome" placeholder="Nome">
<input id="matricula" placeholder="Matricula">

<select id="professor">
${options}
</select>

<button onclick="cadastrarDisciplina()">Salvar</button>

`

}

async function cadastrarDisciplina(){

const nome = document.getElementById("nome").value
const matricula = document.getElementById("matricula").value
const professorMatricula = document.getElementById("professor").value

await fetch(`${API_DISCIPLINA}/disciplinas`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
nome,
matricula,
professorMatricula
})
})

alert("Disciplina cadastrada")

}

async function listarDisciplinas(){

const response = await fetch(`${API_DISCIPLINA}/disciplinas`)
const disciplinas = await response.json()

let html = `
<h2>Disciplinas</h2>

<table>
<tr>
<th>Nome</th>
<th>Matricula</th>
<th>Professor</th>
</tr>
`

for(let d of disciplinas){

const prof = await fetch(`${API_DISCIPLINA}/nomeProfessor/${d.professorMatricula}`)
const nomeProf = await prof.json()

html += `
<tr>
<td>${d.nome}</td>
<td>${d.matricula}</td>
<td>${nomeProf}</td>
</tr>
`

}

html += "</table>"


document.getElementById("conteudo").innerHTML = html

}

async function mostrarCadastrarMatricula(){

const alunos = await fetch(`${API_MATRICULA}/alunos`)
const alunosData = await alunos.json()

const disciplinas = await fetch(`${API_DISCIPLINA}/disciplinas`)
const disciplinasData = await disciplinas.json()

let alunosOptions = ""
let disciplinasOptions = ""

alunosData.forEach(a=>{
alunosOptions += `<option value="${a.matricula}">${a.nome}</option>`
})


disciplinasData.forEach(d=>{
disciplinasOptions += `<option value="${d.matricula}">${d.nome}</option>`
})


document.getElementById("conteudo").innerHTML = `

<h2>Cadastrar Matrícula</h2>

<label>Aluno</label>
<select id="aluno">
${alunosOptions}
</select>

<label>Disciplina</label>
<select id="disciplina">
${disciplinasOptions}
</select>

<button onclick="cadastrarMatricula()">Salvar</button>

`

}

async function cadastrarMatricula(){

const aluno = document.getElementById("aluno").value
const disciplina = document.getElementById("disciplina").value

await fetch(`${API_MATRICULA}/matricula`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
aluno,
disciplina
})
})

alert("Matrícula cadastrada")

}

async function listarMatriculas(){

const response = await fetch(`${API_MATRICULA}/matricula`)
const matriculas = await response.json()

let html = `
<h2>Matrículas</h2>

<table>
<tr>
<th>Aluno</th>
<th>Disciplina</th>
</tr>
`

for(let m of matriculas){

const aluno = await fetch(`${API_MATRICULA}/nomeAluno/${m.aluno}`)
const nomeAluno = await aluno.json()

const disciplina = await fetch(`${API_MATRICULA}/nomeDisciplina/${m.disciplina}`)
const nomeDisciplina = await disciplina.json()

html += `
<tr>
<td>${nomeAluno}</td>
<td>${nomeDisciplina}</td>
</tr>
`

}

html += "</table>"


document.getElementById("conteudo").innerHTML = html

}
