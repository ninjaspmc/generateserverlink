const express = require('express');
const path = require('path');
const app = express();
// const port = 4100;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/add', (req, res) => {
    const { nome, ip, porta } = req.query;
    if (!nome || !ip || !porta || isNaN(porta) || parseInt(porta) < 1 || parseInt(porta) > 65535 || /\s/.test(ip)) {
        return res.status(400).send('Parâmetros inválidos. Verifique o nome, IP e porta.');
    }
    const minecraftLink = `minecraft://?addExternalServer=${encodeURIComponent(nome)}|${encodeURIComponent(ip)}:${encodeURIComponent(porta)}`;
    res.redirect(minecraftLink);
});