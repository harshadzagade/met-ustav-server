const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/add', noticeController.addNotice);

router.get('/', noticeController.getAllNotices);

router.get('/:id', noticeController.getNoticeById);

router.put('/:id', noticeController.updateNotice);

router.delete('/:id', noticeController.deleteNotice);

module.exports = router;