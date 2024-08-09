const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const { sort, filter } = req.query;
    let sortCriteria = {};
    let filterCriteria = {};

    if (sort === 'alphabetical' || !sort) sortCriteria = { name: 1 };
    else if (sort === 'date') sortCriteria = { date: -1 };

    if (filter) filterCriteria = { domain: filter };

    const courses = await Course.find(filterCriteria).sort(sortCriteria);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ name: req.params.courseName });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChapter = async (req, res) => {
  try {
    const course = await Course.findOne({ name: req.params.courseName });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const chapter = course.chapters.find(ch => ch.name === req.params.chapterName);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

    res.json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rateChapter = async (req, res) => {
  try {
    const course = await Course.findOne({ name: req.params.courseName });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const chapter = course.chapters.find(ch => ch.name === req.params.chapterName);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    chapter.ratings.push(req.body.rating);
    await course.save();
    res.json({ message: 'Rating added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
