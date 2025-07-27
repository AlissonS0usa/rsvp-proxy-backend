const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzq3ipW8yRwu5gWsWu4sYWI0YTY6h7inbTldVBWBGRAQkhuNTojxT2vGdOWh9DUFQa/exec';

app.post('/enviar', async (req, res) => {
  try {
    const params = new URLSearchParams(req.body).toString();
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    const json = await response.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: 'Erro no proxy', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
