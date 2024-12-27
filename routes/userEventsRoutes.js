const express = require('express');
const router = express.Router();

const userEventsController = require('../controllers/userEventsController');


router.post('/', userEventsController.createUserEvent);

router.get('/', userEventsController.getAllUserEvents);

router.get('/:id', userEventsController.getUserEventById);

router.put('/:id', userEventsController.updateUserEvent);

router.delete('/:id', userEventsController.deleteUserEvent);

router.get('/user/:userId/event/:eventId', userEventsController.getUserEventByUserIdAndEventId);


module.exports = router;