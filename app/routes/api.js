const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const rp = require('request-promise');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded( {extended: false} ));

router.get('/farmacias', function(req, res) {
    let comuna = req.query.comuna;
    let nombreLocal = req.query.nombreLocal;
    const options = {
        method: 'GET',
        uri: 'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion',
        qs: {
            id_region: 7
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    rp(options)
        .then(function (data) {
            let farmacias = [];
            for (let idx in data) {
                let farmacia = data[idx];
                if (farmacia.comuna_nombre === comuna) {
                    if (nombreLocal !== null && nombreLocal !== undefined && nombreLocal !== '') {
                        if (farmacia.local_nombre === nombreLocal) {
                            farmacias.push(farmacia);
                        }
                    } else {
                        farmacias.push(farmacia);
                    }
                }
            }
            res.json(
                {farmacias: farmacias}
            );
        })
        .catch(function(error) {
            console.log(error);
        });
});

module.exports = router;