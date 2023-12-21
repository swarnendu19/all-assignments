const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

function  adminAuthentication(req,res,next){
  // const username=req.headers.username
  // const password =req.headers.password
  const{username,password}=req.headers // The above two lines are same as this lines
  const admin=ADMINS.find(a => a.username===username && a.password===password)
  if(admin){
    next()
  }
  else{
    res.status(404)
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body
  const existingAdmin=ADMINS.find(a => a.username===admin.username)
  if(existingAdmin){
    res.status(403).json({message: 'Already Account created'})

  }
  else{
    ADMINS.push(admin)
    res.json({message: 'Logged in sucessfully'})
  }
});

app.post('/admin/login', adminAuthentication,(req, res) => {
  // logic to log in admin
    res.json({message: 'logged in sucessfully', courseId : COURSES.id})
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course

});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
