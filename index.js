const express = require('express');
const path = require('path');
const app = express();

app.get('/',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "index.html"))});

app.get('/add', (req, res) => {
    const { nome, ip, porta } = req.query;
    if (!nome || !ip || !porta || isNaN(porta) || parseInt(porta) < 1 || parseInt(porta) > 65535 || /\s/.test(ip)) {
            return res.status(400).send('Parâmetros inválidos. Verifique o nome, IP e porta.');
    }
    const minecraftLink = `minecraft://?addExternalServer=${encodeURIComponent(nome)}|${encodeURIComponent(ip)}:${encodeURIComponent(porta)}`;
    res.redirect(minecraftLink);
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app