const express = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsControllers');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = express.Router();
router.use(validateJWT)

router.get('/', getEvents);
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validateFields
    ],
createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports= router;