const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/repositorios', async (req, res) => {
    try {
        const resposta = await fetch('https://api.github.com/users/matheustitton/repos');
        const repositorios = await resposta.json();
        res.json(repositorios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar os repositórios' });
    }
});

app.get('/api/usuario', async (req, res) => {
    try {
        const resposta = await fetch('https://api.github.com/users/matheustitton');
        const usuario = await resposta.json();
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as informações do usuário' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
