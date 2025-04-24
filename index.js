let express = require('express');
let app = express();
const db = require('./db');
app.use(express.json());
const PORT = 3333;

app.get('/livros/:id', async function(req, res){
    const { id } = req.params;
    console.log(id)
    try{
        const [rows] = await db.execute('SELECT * FROM livros WHERE ID_livro = ?', [id]);
        if (rows.length > 0) {
            res.status(202).json(rows[0])
        } else {
            res.status(404).json({message: 'Livro não encontrado'})
        }
    } catch (error){
        res.status(500).json({error: 'Erro interno do servidor'})
    }
})

app.get('/livros', async function(req, res){
    try{
        const [rows] = await db.execute('SELECT ID_livro, titulo, preco FROM livros');
        res.status(202).json(rows);
    } catch (error){
        console.log('Erro ao listar livros: ' , error)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
})

app.post('/livros',async function(req,res){
    const { titulo, preco } = req.body
    console.log(titulo, preco);
    try{
        const [result] = await db.execute('INSERT INTO livros (titulo, preco) VALUES (?, ?)',[titulo, preco]);
        console.log(result.insertId)
        res.status(202).json({
            "sucesso" : true,
            "mensagem" : "livro inserido com sucesso",
            "id_inserido" : result.insertId
        })
    }catch(error){
        console.log("erro ao criar livro", error);
        res.status(345).json({error: 'Error internor dos servirdor'})
    }
});

app.put('/livros',function(req, res){
    res.send('ROTA GET LIVROS PUT')
});

app.delete('/livros',function(req, res){
    res.send('ROTA GET LIVROS DELETE')
});

app.listen(PORT, ()=> {
    console.log('Projeto iniciado na porta 3000')
});