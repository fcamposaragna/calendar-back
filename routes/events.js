const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsControllers');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = express.Router();
router.use(validateJWT)

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports= router;