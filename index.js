let express = require('express');
let app = express();
let db = require('./db');
app.use(express.json())
const porta = 3333;

app.listen(porta, ()=>  {
    console.log("Servidor rodando na porta " + porta)
})

app.get('/livros/:id', async function (req, res) {
    res.send('rota livros ID');
});

app.get('/livros', async function (req, res) {
    res.send('rota livros');
});

app.post('/livros', async function (req, res) {
    const { titulo, preco} = req.body;

    try {
        const[result] = await db.execute('INSERT INTO livros (titulo, preco) VALUES (?,?)', [titulo, preco])
        res.json({
            "sucesso": true,
            "mensagem":"Livro Inserido"})
    } catch (error) {
        res.json({error:"Erro interno do servidor"})
    }
});

app.put('/livros/:id', async function (req, res) {
    res.send('rota put ID');
});

app.delete('/livros/:id', async function (req, res) {
    res.send('rota delete ID');
});
