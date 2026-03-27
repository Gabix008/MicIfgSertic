const readline = require("readline")
const axios = require("axios")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function menu() {

    console.log("\n===== SISTEMA =====")
    console.log("1 - Cadastrar Usuario")
    console.log("2 - Cadastrar Disciplina")
    console.log("3 - Listar Usuarios")
    console.log("4 - Listar Disciplinas")
    console.log("5 - Cadastrar Matricula")
    console.log("6 - Listar Matriculas")
    console.log("0 - Sair")

    rl.question("Escolha uma opção: ", async (opcao) => {

        switch (opcao) {

            case "1":
                cadastrarUsuario()
                break

            case "2":
                cadastrarDisciplina()
                break

            case "3":
                listarUsuarios()
                break

            case "4":
                listarDisciplinas()
                break

            case "5":
                cadastrarMatricula()
                break

            case "6":
                listarMatricula()
                break

            case "0":
                rl.close()
                break

            default:
                console.log("Opção inválida")
                menu()
        }

    })

}

async function cadastrarUsuario() {

    rl.question("Nome: ", (nome) => {

        rl.question("Matricula: ", (matricula) => {

            rl.question("Escolha uma Função: \n\n 1 - Professor\n 2 - Aluno\n\n", async (funcao) => {

                await axios.post("http://localhost:3002/usuario", {
                    nome,
                    matricula,
                    funcao
                })

                console.log("Usuario cadastrado com sucesso")

                menu()
            })

        })

    })

}

async function cadastrarDisciplina() {

    const professores = await axios.get("http://localhost:3001/professores")

    console.log("\nProfessores disponíveis:")

    professores.data.forEach(p => {
        console.log(`${p.matricula} - ${p.nome}`)
    })

    rl.question("Nome da disciplina: ", (nome) => {
        rl.question("Matricula: ", (matricula) => {

            rl.question("Matricula do Professor: ", async (professorMatricula) => {

                await axios.post("http://localhost:3001/disciplinas", {
                    nome,
                    matricula,
                    professorMatricula
                })

                console.log("Disciplina cadastrada com sucesso")

                menu()

            })

        })
    })

}

async function listarUsuarios() {

    const response = await axios.get("http://localhost:3002/usuario")
    const usuarios = response.data

    for (let usuario of usuarios) {

        if (usuario.funcao == 1) {
            funcao = "Professor"
        } else {
            funcao = "Aluno"
        }

        usuario.funcao = funcao



    }


    console.log("\nUsuarios:")
    console.table(response.data)

    menu()

}

async function listarDisciplinas() {

    const response = await axios.get("http://localhost:3001/disciplinas")

    const disciplinas = response.data

    for (let disciplina of disciplinas) {

        const professor = await axios.get(
            `http://localhost:3001/nomeProfessor/${disciplina.professorMatricula}`
        )

        disciplina.professorMatricula = professor.data



    }

    console.log("\nDisciplinas:")
    console.table(disciplinas)

    menu()

}

async function cadastrarMatricula() {

    const alunos = await axios.get("http://localhost:3003/alunos")

    console.log("\nAlunos disponíveis:")

    alunos.data.forEach(p => {
        console.log(`${p.matricula} - ${p.nome}`)
    })

    console.log("\nDisciplinas disponíveis:")
    const disciplinas = await axios.get("http://localhost:3001/disciplinas")



    disciplinas.data.forEach(p => {
        console.log(`${p.matricula} - ${p.nome}`)
    })

    rl.question("\nMatricula Disciplina: ", (disciplina) => {

        rl.question("Matricula do Aluno: ", async (aluno) => {

            await axios.post("http://localhost:3003/matricula", {
                aluno,
                disciplina
            })

            console.log("Matricula cadastrada com sucesso")

            menu()

        })

    })

}

async function listarMatricula() {

    const response = await axios.get("http://localhost:3003/matricula")

    const matriculas = response.data

    for (let matricula of matriculas) {

        const aluno = await axios.get(
            `http://localhost:3003/nomeAluno/${matricula.aluno}`
        )

        matricula.aluno = aluno.data


        const disciplina = await axios.get(
            `http://localhost:3003/nomeDisciplina/${matricula.disciplina}`
        )

        matricula.disciplina = disciplina.data
    }



    console.log("\nMatriculas:")
    console.table(matriculas)

    menu()

}

menu()