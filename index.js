const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courses');
const fs = require('fs');
const Course = require('./models/Course');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', courseRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');

  // Populate the database with the courses from the JSON file
  fs.readFile('courses.json', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading courses.json:', err);
      return;
    }

    const courses = JSON.parse(data);
    for (const course of courses) {
      // Use upsert to insert new courses or update existing ones
      await Course.updateOne(
        { name: course.name },  // find criteria
        { $set: course },       // update data
        { upsert: true }        // options
      );
    }
    console.log('Courses data inserted or updated');
  });

}).catch(error => console.error('Error connecting to MongoDB:', error));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
