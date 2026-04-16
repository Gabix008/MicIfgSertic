const express = require("express")
const app = express()

app.use(express.static("."))

app.listen(8080, () => {
console.log("Interface rodando em http://localhost:8080")
})