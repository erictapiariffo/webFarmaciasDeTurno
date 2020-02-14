const express = require('express');
const rp = require('request-promise');
const router = express.Router();

router.get('/', function(req, res) {
    const options = {
        method: 'POST',
        uri: 'https://midastest.minsal.cl/farmacias/maps/index.php/utilidades/maps_obtener_comunas_por_regiones',
        formData: {
            reg_id: 7
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'content-type': 'multipart/form-data'
        }
    };
    rp(options)
        .then(function(data) {
            res.render('index', {
                pageTitle: 'Buscador de Tiendas',
                comunas: data,
                errorMessage: null
            })
        })
        .catch(function(error) {
            console.log(error);
            res.render('index', {
                pageTitle: 'Buscador de Tiendas',
                comunas: null,
                errorMessage: 'No se pudo cargar informacion de comunas'
            })
        });
});

module.exports = router;