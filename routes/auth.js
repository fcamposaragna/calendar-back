const express = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/authControllers')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt')

const router = express.Router();


router.post('/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email debe tener un arroba').isEmail(),
        check('password', 'El password debe tener por lo menos 6 dígitos').isLength({ min: 6}),
        validateFields
    ],
    loginUser);

router.post('/new',
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email debe ser un email').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
        validateFields
    ],
    createUser );

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;