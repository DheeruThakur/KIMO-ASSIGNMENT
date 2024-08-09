const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/courses', courseController.getCourses);
router.get('/courses/:courseName', courseController.getCourse);
router.get('/courses/:courseName/chapters/:chapterName', courseController.getChapter);
router.post('/courses/:courseName/chapters/:chapterName/rate', courseController.rateChapter);

module.exports = router;
