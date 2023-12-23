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
    res.json({message: 'logged in sucessfully'})
});

app.post('/admin/courses',adminAuthentication, (req, res) => {
  // logic to create a course
  const course = req.body
  course.id=Date.now()
  COURSES.push(course)
  res.json({message: 'Course Created sucessfully',courseId: course.id})

});

app.put('/admin/courses/:courseId', adminAuthentication,(req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id=== courseId)
  if(course){
    Object.assign(course,req.body)
    res.json({message: 'Course updated sucessfully'})
  }
  else{
    res.status(404).json({message: 'Course not found'})
  }
});

app.get('/admin/courses',adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({courses : COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const newUser= {...req.body,purchasedCourse: []}
   USERS.push(newUser)
   res.json({message: 'User created sucessfully'})
});

app.post('/users/login',userAuthentication, (req, res) => {
  // logic to log in user
  res.json({message: 'logged in Sucessfully'})
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  let filteredCourses=[];
  for(let i=0;i<COURSES.length;i++){
    if(COURSES[i].published){
    filteredCourses.push(COURSES[i])
  }
}
res.json({courses : filteredCourses})
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const courseId=Number(req.params.courseId)
  const course= COURSES.find(c => c.id === courseId && c.published)
  if(course){
    req.user.purchasedCourse.push(courseId)
    res.json({message: 'Course Purchased sucessfully'})
  }
  else{
    res.status(404).json({message: 'Course not found '})
  }
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
