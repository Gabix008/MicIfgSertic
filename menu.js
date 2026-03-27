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

        rl.question("Matricula do Professor: ", async (professorMatricula) => {

            await axios.post("http://localhost:3001/disciplinas", {
                nome,
                professorMatricula
            })

            console.log("Disciplina cadastrada com sucesso")

            menu()

        })

    })

}

async function listarUsuarios() {

    const response = await axios.get("http://localhost:3002/usuario")

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

menu()