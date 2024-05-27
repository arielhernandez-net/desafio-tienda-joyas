const express = require('express');
const router = express.Router();
const joyas = require('../data/joyas').results;

const addHATEOASLinks = (jewel) => {
    return {
        ...jewel,
        links: [
            { rel: 'self', href: `/joyas/${jewel.id}` },
            { rel: 'category', href: `/joyas/categoria/${jewel.category}` }
        ]
    };
};

router.get('/', (req, res) => {
    let { category, min_value, max_value, page, order } = req.query;
    let resultado = joyas;

    if (category) {
        resultado = resultado.filter(joya => joya.category === category);
    }
    if (min_value) {
        resultado = resultado.filter(joya => joya.value >= parseInt(min_value));
    }
    if (max_value) {
        resultado = resultado.filter(joya => joya.value <= parseInt(max_value));
    }

    const limit = 2;
    page = page ? parseInt(page) : 1;
    const start = (page - 1) * limit;
    const end = page * limit;
    resultado = resultado.slice(start, end);

    if (order) {
        resultado = resultado.sort((a, b) => {
            if (order === 'asc') return a.value - b.value;
            if (order === 'desc') return b.value - a.value;
        });
    }

    res.json(resultado.map(addHATEOASLinks));
});

// Ruta GET /joyas/categoria/:categoria
router.get('/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const joyasCategoria = joyas.filter(joya => joya.category === categoria);
    res.json(joyasCategoria.map(addHATEOASLinks));
});

// Ruta GET /joyas/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const joya = joyas.find(j => j.id === id);
    if (!joya) {
        return res.status(404).json({ error: 'Joya no encontrada' });
    }
    res.json(addHATEOASLinks(joya));
});

module.exports = router;
