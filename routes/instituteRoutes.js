const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');

router.post('/add', instituteController.addInstitute);

router.get('/', instituteController.getAllInstitutes);

router.get('/:id', instituteController.getInstituteById);

router.put('/:id', instituteController.updateInstitute);

router.delete('/:id', instituteController.deleteInstitute);

module.exports = router;